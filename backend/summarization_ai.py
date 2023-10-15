import cohere
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from flask_github import GitHub
import requests

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

co = cohere.Client(COHERE_API_KEY)


def co_response(commit_history):
    return co.summarize(
        text=commit_history,
        length="auto",
        format="bullets",
        model="command",
        additional_command="",
        temperature=2,
    )


app = Flask(__name__)
app.config["GITHUB_CLIENT_ID"] = os.getenv("GITHUB_CLIENT_ID")
app.config["GITHUB_CLIENT_SECRET"] = os.getenv("GITHUB_CLIENT_SECRET")
github = GitHub(app)
# ["DEBUG"] = True


@app.route("/login")
def login():
    return github.authorize(scope="repo")


@app.route("/github-callback")
@github.authorized_handler
def authorized(access_token):
    return redirect(f"http://localhost:5173/?loggedIn=True&token={access_token}")


@app.route("/receive_repo", methods=["GET"])
def receive_repo():
    repo_url = request.args.get("url")
    POI = request.args.get("poi")
    token = request.args.get("token")
    commit_list = []

    if not repo_url:
        return jsonify({"error": "GitHub repository URL parameter is missing"}), 400

    parts = repo_url.rstrip("/").split("/")

    if len(parts) < 2:
        return jsonify({"ERROR": "Invalid GitHub repository URL"}), 400
    owner, repo_name = parts[-2], parts[-1]

    try:
        api_url = f"https://api.github.com/repos/{owner}/{repo_name}/commits"
        if token:
            headers = {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": f"token {token}",
            }
        else:
            headers = {"Accept": "application/vnd.github.v3+json"}
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
            commits = response.json()
        else:
            return ({"error": "GitHub API request failed"}), response.status_code

        for commit in commits:
            try:
                if commit["author"]["login"] != POI:
                    commit_list.append(commit)
                else:
                    commit_list.append(commit)
                    break
            except:
                continue

        print(len(commit_list))

        if commit_list[-1]["author"]["login"] != POI:
            return ({"error": "User has not contributed to this repository"}), 400

        base = commit_list[-1]["sha"]
        head = commit_list[0]["sha"]

        api_url = (
            f"https://api.github.com/repos/{owner}/{repo_name}/compare/{base}...{head}"
        )
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
            latest_commits = response.json()
            prompt = ""

            for commit in latest_commits["commits"]:
                message = commit["commit"]["message"]

                if (len(prompt) + len(message)) > 50000:
                    break

                prompt += message + "\n"

            if prompt == "":
                return {
                    "since_last_commit": 0,
                    "summary": "You were the author of the last commit!",
                }

            if len(prompt) > 250:
                summary = co_response(prompt)
            else:
                summary = ["", prompt]

            return {
                "since_last_commit": latest_commits["ahead_by"] - 1,
                "summary": summary[1],
            }
        else:
            return ({"error": "GitHub API request failed"}), response.status_code

    except requests.exceptions.RequestException as e:
        return (
            jsonify(
                {"error": f"Failed to fetch GitHub repository information: {str(e)}"}
            ),
            500,
        )


CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
