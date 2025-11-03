import { Octokit } from "@octokit/rest";
import { bus } from "./events.js";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function listIssues(repo: string) {
  const [owner, repoName] = repo.split("/");
  const { data } = await octokit.issues.listForRepo({
    owner, repo: repoName, state: "open", per_page: 50
  });
  return data.map(i => ({
    id: i.id, number: i.number, title: i.title, state: i.state
  }));
}

export async function listPRs(repo: string) {
  const [owner, repoName] = repo.split("/");
  const { data } = await octokit.pulls.list({
    owner, repo: repoName, state: "open", per_page: 50
  });
  return data.map(p => ({
    id: p.id, number: p.number, title: p.title, state: p.state
  }));
}

export async function openPR(repo: string, issueNumber: number, branch: string) {
  const [owner, repoName] = repo.split("/");
  const title = `Fix #${issueNumber}`;
  const head = branch;
  const base = "dev";
  const { data } = await octokit.pulls.create({ owner, repo: repoName, title, head, base });
  bus.emit({ type: ":pr/opened", data: { number: data.number, url: data.html_url }});
  return data;
}

export async function commentPR(repo: string, pr: number, body: string) {
  const [owner, repoName] = repo.split("/");
  const { data } = await octokit.issues.createComment({
    owner, repo: repoName, issue_number: pr, body
  });
  bus.emit({ type: ":pr/commented", data: { pr, id: data.id }});
  return data;
}