import "dotenv/config";
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { WebSocket } from "ws";
import { bus } from "./events.js";
import { listIssues, listPRs, openPR, commentPR } from "./github.js";
import { createWorktree, runTaskInWorktree, pushBranch } from "./git.js";

const PORT = Number(process.env.WEB_PORT ?? 8787);
const REPO = process.env.REPO_SLUG!;

const app = Fastify();
await app.register(websocket);

app.get("/events", { websocket: true }, (conn) => {
  const ws = conn.socket as WebSocket;
  bus.attach(ws);
  ws.on("close", () => bus.detach(ws));
});

app.get("/api/issues", async (req, rep) => {
  const repo = (req.query as any).repo ?? REPO;
  return listIssues(repo);
});

app.get("/api/prs", async (req, rep) => {
  const repo = (req.query as any).repo ?? REPO;
  return listPRs(repo);
});

app.post("/api/worktrees", async (req, rep) => {
  const { repo = REPO, issue } = (req.body as any);
  const { branch, path } = await createWorktree(issue);
  await runTaskInWorktree(path, `pnpm opencode run "Issue #${issue}" || true`);
  return { branch, path, issue };
});

app.post("/api/pulls", async (req, rep) => {
  const { repo = REPO, issue } = (req.body as any);
  const branch = `issue/${issue}`;
  const pr = await openPR(repo, issue, branch);
  await pushBranch(branch);
  return pr;
});

app.post("/api/pr-comment", async (req, rep) => {
  const { repo = REPO, pr, body } = (req.body as any);
  return commentPR(repo, Number(pr), body);
});

setInterval(async () => {
  try {
    bus.emit({ type: ":refresh/gh" });
  } catch (e) {
    bus.emit({ type: ":error/poll", data: String(e) });
  }
}, 20_000);

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`agentd on :${PORT}`);
});