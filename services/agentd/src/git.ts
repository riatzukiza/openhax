import simpleGit from "simple-git";
import { bus } from "./events.js";
import { spawn } from "node:child_process";

const REPO_PATH = process.env.REPO_PATH!;

export async function createWorktree(issue: number) {
  const branch = `issue/${issue}`;
  const path = `${REPO_PATH}/.worktrees/${branch}`;
  const git = simpleGit(REPO_PATH);
  await git.fetch();
  await git.raw(["worktree", "add", "-b", branch, path, "origin/dev"]);
  bus.emit({ type: ":git/worktree-created", data: { branch, path, issue }});
  return { branch, path };
}

export async function runTaskInWorktree(path: string, task: string) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn("bash", ["-lc", task], { cwd: path, stdio: "inherit" });
    proc.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`Task failed ${code}`)));
  });
}

export async function pushBranch(branch: string) {
  const git = simpleGit(REPO_PATH);
  await git.raw(["push", "-u", "origin", branch]);
  bus.emit({ type: ":git/pushed", data: { branch }});
}