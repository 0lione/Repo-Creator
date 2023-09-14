from flask import Flask, render_template, request, send_from_directory, jsonify
from github import Github, GithubException
from github import Auth
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)
repo = [None]


@app.route('/api/create-repo', methods=['POST'])
def create_repo():
    if request.method == 'POST':
        # Script code from GitHub import to the end
        from github import Github, GithubException
        from github import Auth

        def check_bool(checker):
            if checker in ("Y", ""):
                return True
            elif checker in "n":
                return False
            else:
                raise Exception("Invalid input")

        auth = Auth.Token("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")

        g = Github(auth=auth)

        try:
            form_values = request.json
            repo_name = form_values['repo_name']
            repo_description = form_values['repo_description']
            repo_private = form_values['repo_private']
            if repo_private == "":
                repo_private = False 
            # CREATE REPO HERE
            repo[0] = g.get_user().create_repo(repo_name, description=repo_description, private=repo_private)
            return jsonify({'status': 'success'})
        except GithubException as e:
            if e.status == 422:
                return jsonify({'status': 'error'})


@app.route('/api/create-files', methods=['POST'])
def create_files():
    if request.method == 'POST':
        extensions = {"python": "py", "java": "java", "c": "c", "cpp": "cpp", "javascript": "js"}
        form_values = request.json
        language = form_values['language']
        readme = form_values['readme']
        try:
            if bool(readme):
                readme_content = form_values['readme_content']
                repo[0].create_file("README.md", "Repo Creation", readme_content, branch="main")
            repo[0].create_file(f"main.{(lambda x: x if extensions.get(x) is None else extensions.get(x))(language)}",
                             "Repo Creation", "", branch="main")
        except Exception as e:
            raise Exception(e)
        return jsonify({'status': 'success'})


@app.route('/api/contributors', methods=['POST'])
def contributors():
    if request.method == 'POST':
        form_values = request.json
        contributors = form_values['contributors_name']
        contributors = contributors.split(",")
        app.logger.warning(contributors)
        try:
            for contributor in contributors:
                repo[0].add_to_collaborators(contributor, "push")
        except Exception as e:
            raise Exception(e)
        return jsonify({'status': 'success'})

    return render_template('index.html')


if __name__ == '__main__':
    app.run()
