
## Commands
- `pnpm dev` - Start both frontend (8700) and backend (8787) in dev mode
- `pnpm build` - Build both frontend and backend for production  
- `pnpm start` - Start production backend server
- `pnpm clean` - Clean all build artifacts
- `cd packages/opencode-reactant && pnpm dev` - Frontend only
- `cd services/agentd && pnpm dev` - Backend only
- `npx shadow-cljs compile app` - Compile ClojureScript
- `npx shadow-cljs release app` - Production frontend build

## Code Style
- **TypeScript**: ES modules, camelCase functions, async/await, Zod validation, Fastify server
- **ClojureScript**: Reagent components, kebab-case functions, atoms for state, Tailwind CSS
- **Imports**: Use ES6 imports, no default exports, explicit file extensions (.js)
- **Types**: Strict TypeScript enabled, avoid `any`, use Zod schemas
- **Naming**: camelCase for TS, kebab-case for CLJS, descriptive variable names
- **Error handling**: Try/catch only when necessary, proper error logging via bus events
- **Formatting**: Consistent indentation, no unnecessary destructuring, single-responsibility functions

## Architecture
- Event-driven with WebSocket communication between frontend/backend
- GitHub API via Octokit, Git operations via simple-git
- Frontend: Reagent + Shadow-CLJS, Backend: Fastify + TypeScript
- State management: atoms in ClojureScript, event bus in TypeScript

### 🔗 Cross-Repository Integration
- **[CROSS_REFERENCES.md](./CROSS_REFERENCES.md)** - Complete cross-references to all related repositories
- **[Workspace AGENTS.md](../../AGENTS.md)** - Main workspace documentation
- **[Repository Index](../../REPOSITORY_INDEX.md)** - Complete repository overview

### Related Repositories
- **[promethean](../../promethean/)**: Agent orchestration and AI enhancement
- **[agent-shell](../../agent-shell/)**: Development workflow and agent integration
- **[open-hax/codex](../../open-hax/codex/)**: Authentication patterns
- **[moofone/codex-ts-sdk](../../moofone/codex-ts-sdk/)**: TypeScript SDK integration
- **[stt](../../stt/)**: Web development patterns and components
- **[opencode-hub](../../opencode-hub/)**: Package management and distribution
- **[clojure-mcp](../../clojure-mcp/)**: ClojureScript development patterns
- **[dotfiles](../../dotfiles/)**: Development environment setup

