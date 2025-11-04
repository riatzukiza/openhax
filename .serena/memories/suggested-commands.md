# Suggested Commands for OpenHax Development

## Development Workflow
```bash
# Initial setup
pnpm install:all

# Start development (both frontend and backend)
pnpm dev

# Frontend only (runs on :8700)
cd packages/opencode-reactant && pnpm dev

# Backend only (runs on :8787)  
cd services/agentd && pnpm dev

# Build for production
pnpm build

# Start production backend
pnpm start

# Clean build artifacts
pnpm clean
```

## Frontend Specific
```bash
# Compile ClojureScript
npx shadow-cljs compile app

# Watch mode (development)
npx shadow-cljs watch app

# Release build
npx shadow-cljs release app

# Clean frontend
npx shadow-cljs clean
```

## Backend Specific
```bash
# Build TypeScript
cd services/agentd && pnpm build

# Development with hot reload
cd services/agentd && pnpm dev

# Production start
cd services/agentd && pnpm start
```

## Git Operations
```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "message"

# Push changes
git push
```

## Environment
```bash
# Copy environment file
cp services/agentd/.env.example services/agentd/.env

# Edit environment
nano services/agentd/.env
```