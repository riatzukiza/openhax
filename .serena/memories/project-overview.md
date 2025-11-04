# OpenHax - Opencode Reactant Project Overview

## Purpose
Event-driven GitHub + Worktrees + PR Agents system for managing GitHub repositories with automated workflows.

## Tech Stack
- **Frontend**: Reagent (ClojureScript + shadow-cljs) with React 18
- **Backend**: Node.js/TypeScript daemon with Fastify server
- **Communication**: WebSocket events + REST API
- **Automation**: Git worktrees + agent system
- **Package Manager**: pnpm with workspaces
- **Build Tools**: shadow-cljs (frontend), TypeScript compiler (backend)

## Project Structure
```
packages/opencode-reactant/  # CLJS UI (shadow-cljs)
services/agentd/            # Node/TS daemon  
shared/js/opencode-events/  # Event types
```

## Development Commands
- `pnpm install:all` - Install all dependencies
- `pnpm dev` - Start both frontend (:8700) and backend (:8787) in development
- `pnpm build` - Build both frontend and backend for production
- `pnpm start` - Start production backend
- `pnpm clean` - Clean all build artifacts

## Environment Setup
1. Copy `services/agentd/.env.example` to `services/agentd/.env`
2. Configure GitHub token and repo details
3. Ensure target repo is accessible locally

## Key Features
- Real-time WebSocket event streaming
- GitHub Issues and PRs management
- Automated worktree creation
- Event-driven agent system
- Live UI updates via Reagent