# Task Completion Checklist for OpenHax

## Before Completing Any Task

### Frontend (ClojureScript)
- [ ] Code compiles with `npx shadow-cljs compile app`
- [ ] No console errors in browser dev tools
- [ ] UI components render correctly
- [ ] WebSocket connection works
- [ ] Event handling functions properly

### Backend (TypeScript)
- [ ] TypeScript compiles without errors (`pnpm build`)
- [ ] Server starts successfully
- [ ] API endpoints respond correctly
- [ ] WebSocket connections work
- [ ] Environment variables are properly configured

### Integration
- [ ] Frontend and backend communicate via WebSocket
- [ ] GitHub API integration works
- [ ] Git operations complete successfully
- [ ] Event streaming functions properly

### Code Quality
- [ ] Follow naming conventions (kebab-case for CLJS, camelCase for TS)
- [ ] Proper error handling implemented
- [ ] No hardcoded values (use environment variables)
- [ ] Components are reusable and composable

### Testing
- [ ] Manual testing in browser
- [ ] Check browser dev tools for errors
- [ ] Verify WebSocket events in network tab
- [ ] Test all user interactions

## Commands to Run
```bash
# Build and test everything
pnpm build

# Start development to test
pnpm dev

# Check frontend compilation
cd packages/opencode-reactant && npx shadow-cljs compile app

# Check backend compilation  
cd services/agentd && pnpm build
```