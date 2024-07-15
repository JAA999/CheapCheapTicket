import json
from flask import Flask, jsonify
import requests

app = Flask(__name__)

gitlab_project_id = '59330677'
gitlab_access_token = 'glpat-1xy11CZ5q9ps6cjSeruK'

def fetch_all_pages(url, headers, params):
    items = []
    while True:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            break
        data = response.json()
        items.extend(data)
        if 'next' in response.links:
            url = response.links['next']['url']
        else:
            break
    return items

def get_commits():
    url = f'https://gitlab.com/api/v4/projects/{gitlab_project_id}/repository/commits'
    headers = {'PRIVATE-TOKEN': gitlab_access_token}
    params = {'per_page': 100, 'page': 1}
    commits = fetch_all_pages(url, headers, params)

    commits_per_author = {}
    for commit in commits:
        new_name = commit['author_name'].split(' ')
        if len(new_name) > 1:
            new_name = new_name[0] + new_name[-1]
        else:
            new_name = new_name[0]

        if new_name not in commits_per_author:
            commits_per_author[new_name] = 1
        else:
            commits_per_author[new_name] += 1
    
    return commits_per_author

def get_issues():
    url = f'https://gitlab.com/api/v4/projects/{gitlab_project_id}/issues'
    headers = {'PRIVATE-TOKEN': gitlab_access_token}
    params = {'state': 'closed', 'per_page': 100, 'page': 1}
    issues = fetch_all_pages(url, headers, params)

    issues_closed_by_member = {}
    for issue in issues:
        if 'closed_by' in issue and issue['closed_by']:
            new_name = issue['closed_by']['name'].split(' ')
            if len(new_name) > 1:
                new_name = new_name[0] + new_name[-1]
            else:
                new_name = new_name[0]

            if new_name not in issues_closed_by_member:
                issues_closed_by_member[new_name] = 1
            else:
                issues_closed_by_member[new_name] += 1

    return issues_closed_by_member

@app.route('/gitlab_stats', methods=['GET'])
def get_gitlab_stats():
    stats = {}
    commits_per_member = get_commits()
    issues_per_member = get_issues()

    for member in commits_per_member:
        stats_for_member = [commits_per_member[member]]
        if member in issues_per_member:
            stats_for_member.append(issues_per_member[member])
        stats[member] = stats_for_member
    
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True)
