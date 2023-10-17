# This script fills the jinja variables in the inventory
# Templates are located in templates/
# Rendered files will be written to the current directory

from re import template
import json
from jinja2 import Environment, FileSystemLoader, PackageLoader, select_autoescape

state = json.load(open("terraform.tfstate", "r"))

name = ""
user = "admin"
ip = ""

for resource in state["resources"]:
    if resource["type"] == "google_compute_instance" and resource["name"] == "project_webserver":
        ip = resource["instances"][0]["attributes"]["network_interface"][0]["access_config"][0]["nat_ip"]
        name = resource["instances"][0]["attributes"]["name"][:-len("-webserver")]

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape()
)

inventory = env.get_template("inventory-template.yml")

inventory_output = (inventory.render(
    project_name=name,
    webserver_user=user,
    webserver_ip=ip
))
var = env.get_template("vars-template.yml")
var_output = var.render(
    project_name=name,
    webserver_user=user,
    webserver_ip=ip,
    project_language="python"
)

with open ("inventory.yml", "w+") as inv_file:
    inv_file.write(inventory_output)

print(inventory_output)
with open ("vars.yml", "w+") as var_file:
    var_file.write(var_output)
print(var_output)
