import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const issueMessage: string = core.getInput('issue-message');
    if (!issueMessage) {
      throw new Error(
        'Action must have at least one of issue-message'
      );
    }
    // Get client and context
    const client: github.GitHub = new github.GitHub(
      core.getInput('repo-token', {required: true})
    );
    const context = github.context;

    if (context.payload.action !== 'opened') {
      console.log('No issue was opened, skipping');
      return;
    }

    // Do nothing if its not a pr or issue
    const isIssue: boolean = !!context.payload.issue;
    if (!isIssue && !context.payload.pull_request) {
      console.log(
        'The event that triggered this action was an issue'
      );
      return;
    }


    // Do nothing if no message set for this type of contribution
    const message: issueMessage;
    if (!message) {
      message = "Default comment message"
      return;
    }

    // Add a comment to the appropriate place
    console.log(`Adding message: ${message} to ${issueType} ${issue.number}`);
      await client.issues.createComment({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        body: message
      });    
  } catch (error) {
    core.setFailed(error.message);
    return;
  }
}

run();
