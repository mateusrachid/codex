Gitlab CLI tool for AI Agents

[ ] Task 1 - Plan the tool

We want to implement a CLI tool just like we did for the search tool (codebase of the search tool lives in `../search`).

This gitlab tool must allow the user (an AI agent) perform two tasks:

1. Fetch info for a merge request.

Given a merge request number, the tool outputs an JSON with basic information about the MR. The return JSON must contain:

- Number of the MR
- Title and description of the MR
- Source and target branches
- List of comments on the MR with:
  - Author
  - Body
  - File name and line number range if attached to the code

2. Post a comment to a merge request.

Must accept a JSON as first parameter containing:

- Number of the MR.
- Body of the comment
- File name and line number range to attach the comment to.

Plan the implementation and split it in tasks. Update this file with the tasks well described. Then start working on them.

[ ] Task 2 ...

[ ] Task 3 ...

[ ] ...
