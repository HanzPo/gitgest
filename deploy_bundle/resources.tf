terraform {
    required_providers {
        google = {
            source = "hashicorp/google"
            version = "4.51.0"
        }
    }
}

provider "google" {
    credentials = file("gcp_creds.json")
    project = "gitgest"
    region = "northamerica-northeast2"
    zone = ""
}

resource "google_compute_network" "project_vpc" {
    name = "gitgest-vpc"
    auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "project_subnet" {
    network = google_compute_network.project_vpc.name
    name = "gitgest-pub-subnet"
    ip_cidr_range = "10.0.1.0/24"
    region = "northamerica-northeast2"
}


resource "google_compute_network_firewall_policy" "project_vpc_fw" {
    name = "gitgest-vpc-fw"
}

resource "google_compute_network_firewall_policy_association" "project_vpc_fw_association" {
    name = "association"
    attachment_target = google_compute_network.project_vpc.id
    firewall_policy = google_compute_network_firewall_policy.project_vpc_fw.name
}

resource "google_compute_network_firewall_policy_rule" "ssh-http" {
    rule_name = "ssh-http"
    action = "allow"
    direction = "INGRESS"
    disabled = false
    firewall_policy = google_compute_network_firewall_policy.project_vpc_fw.name
    priority = 65534
    match {
      src_ip_ranges = ["0.0.0.0/0"]
      layer4_configs {
        ip_protocol = "tcp"
        ports = [22, 80, 443]
      }
    }
}

resource "google_compute_instance" "project_webserver" {
    name = "gitgest-webserver"
    machine_type = "e2-micro"
    boot_disk {
      initialize_params {
        image = "projects/debian-cloud/global/images/debian-12-bookworm-v20231010"
      }
    }
    network_interface {
      network = google_compute_network.project_vpc.name
      subnetwork = google_compute_subnetwork.project_subnet.name
      access_config {}
    }
    metadata = {
        ssh-keys = "admin:${file("pub_key")}"
    }
}

