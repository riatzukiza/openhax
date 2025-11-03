# OpenHax - Opencode Reactant

Event-driven GitHub + Worktrees + PR Agents system.

## Architecture

- **Frontend**: Reagent (ClojureScript + shadow-cljs)
- **Backend**: Node/TypeScript daemon with GitHub API
- **Communication**: WebSocket events + REST API
- **Automation**: Git worktrees + agent system

## Development

```bash
pnpm install:all
pnpm dev
```

## Structure

```
packages/opencode-reactant/  # CLJS UI
services/agentd/            # Node/TS daemon  
shared/js/opencode-events/  # Event types
```