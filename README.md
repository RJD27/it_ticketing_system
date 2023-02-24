# IT Ticketing System

A site that hosts an IT ticketing system, allowing users to prioritize, organize, and monitor their projects. Data will be stored locally.

[![GitHub Super-Linter](https://github.com/RJD27/it_ticketing_system/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

## Issues

Issues should be created to indicate that a feature needs to be added or a bug needs to be fixed.
Think of these like tickets. When you create an issue you can enter a title for your issue and a description,
you can then assign people to the issue, label the issue into a category, add the issue into a project, and/or
add the issue to a milestone.

## Branches

Branches should be created when something needs to be changed. This prevents any accidental changes to the main branch.
Branches should be named as so **'issueNumber_this_is_a_branch'**, if by chance there is no issue tied to the branch it may be ommitted,
but an issue should be made prior to making the branch.

## Pull Requests

### Opening a PR

For a branch to be merged with the main branch, a pull request aka PR is needed.
To open a PR, navigate to your branch and click **'contribute'** then **'Open Pull Request'**, this will take you to a new page
with a template PR. If your PR is still in progress, it can be marked as a draft.

### Writing a PR

Enter a suitable title, description, and proposed changes in your PR.
At this point you can also assign a reviewer who will have the duty of reviewing and approving your code.

### Linking Issues

To link issues to be closed once the PR has been approved, under the **'Issues'** heading use **'closes #issueNumber'** for each issue,
this will automatically link the issues and close them once the PR is approved.

### Reviewing a PR

Before a PR is approved it must and should be reviewed by other people. This reduces bugs and improves code.
For info on the process of reviewing a PR: *[How to Review a PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)*

### Merge Conflicts

Merge conflicts occur in cases where two or more branches are working on the same files and change/remove the same lines and they try to merge but Git does not know which of the changes you would like to keep or remove. In this scenario it will generally be up to the Pull Request owner to decide which changes should be kept, if in doubt then ask for help.

For simple merge conflicts, these can be resolved by pressing the 'Resolve conflicts' button on the Pull Request to open the conflict editor.
For complex merge conflicts the 'Resolve conflicts' button will be deactivated. To resolve these you can do so using the Git command line.
VS Code has a merge editor which will help resolve the conflicts.

Resources:
- [Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)
- [Resolving a merge conflict using the command-line](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)
- [VS Code Merge Editor - YouTube Guide](https://www.youtube.com/watch?v=HosPml1qkrg)

## Development Environment

IDE: VS Code

Stack: Express.js, Node.js, MySQL

### Setup

1. Install IDE, Download [VS Code](https://code.visualstudio.com/Download).

2. Install Node.js, Download [Node.js](https://nodejs.org/en/download/).

3. Download [MySQL](https://dev.mysql.com/downloads/mysql/). 

4. [Install and Setup MySQL server and Workbench](https://www.youtube.com/watch?v=u96rVINbAUI).

5. Open Project in VS Code.

6. Install MySQL Extensions below, [How to use SQL in VS Code](https://www.youtube.com/watch?v=C0y35FpiLRA).
- SQLTools
- SQLTools MySQL/MariaDB

7. Install Gulp using command-line.

```commandLine
npm install gulp
```

8. Install packages using command-line.

```commandLine
npm ci
```

9. If this is your first start you will need to create a .env file, inside this file create a new key called "SESSION_SECRET" and set this to any string you desire. This string is your secret for express-sessions.

```env
SESSION_SECRET = "secret"
```

10. Set your SQL connection in .vscode/settings.json.

11. Begin working on [issues](https://github.com/RJD27/it_ticketing_system/issues).
