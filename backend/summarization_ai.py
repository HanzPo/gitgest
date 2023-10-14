import cohere 
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

co = cohere.Client(COHERE_API_KEY)
def co_response (commit_history): 
  return co.summarize( 
  text=commit_history,
  length='long',
  format='bullets',
  model='command',
  additional_command='',
  temperature=2,
)

app = Flask(__name__)   
#["DEBUG"] = True
    
@app.route('/receive_repo', methods=['GET'])
def receive_repo():
    repo_url = request.args.get('url')
    POI = request.args.get('poi')
    commit_list = []

    if not repo_url:
        return jsonify({'ERROR': 'GitHub repository URL parameter is missing'}), 400

    parts = repo_url.rstrip('/').split('/')

    if len(parts) < 2:
        return jsonify({'ERROR': 'Invalid GitHub repository URL'}), 400
    owner, repo_name = parts[-2], parts[-1]

    try:
        api_url = f'https://api.github.com/repos/{owner}/{repo_name}/commits'
        print(api_url)
        headers = {'Accept': 'application/vnd.github.v3+json', "Authorization" : f"Bearer {GITHUB_TOKEN}"}
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
          commits = response.json()
        else:
          return({'error': 'GitHub API request failed'}), response.status_code

        for commit in commits:
            try:
              if commit['author']['login'] != POI:
                  commit_list.append(commit)
              else:
                commit_list.append(commit)
                break
            except:
               continue
        

        base = commit_list[-1]['sha']
        head = commit_list[0]['sha']

        api_url = f'https://api.github.com/repos/{owner}/{repo_name}/compare/{base}...{head}'
        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
          latest_commits = response.json()
          prompt = ""

          for commit in latest_commits["commits"]:
            message = commit["commit"]["message"]

            if (len(prompt) + len(message)) > 50000:
               break
            
            prompt += message + "\n"

          summary = co_response(prompt)

          return ({"since_last_commit": latest_commits["ahead_by"] - 1, "summary" : summary[1]})
        else:
          return({'error': 'GitHub API request failed'}), response.status_code
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch GitHub repository information: {str(e)}'}), 500

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)