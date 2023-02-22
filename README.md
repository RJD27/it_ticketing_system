# IT Ticketing System

A ticketing system site that stores data locally.

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
VSCode has a merge editor which will help resolve the conflicts.

Resources: 
- [Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)
- [Resolving a merge conflict using the command line](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)
- [VSCode Merge Editor - YouTube Guide](https://www.youtube.com/watch?v=HosPml1qkrg)


