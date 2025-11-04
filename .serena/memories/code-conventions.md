# Code Conventions for OpenHax

## ClojureScript (Frontend)
- Use Reagent components with `defn` syntax
- Component naming: kebab-case for functions
- State management via atoms in `opencode.ui.state`
- Event handling with `on-click` and other event handlers
- Use Tailwind CSS classes for styling (border, p-2, rounded, etc.)
- Component structure: `[component-name props]` syntax

## TypeScript (Backend)
- Use ES modules (`"type": "module"`)
- Function naming: camelCase
- Use Zod for schema validation
- Fastify for HTTP server with WebSocket support
- Async/await patterns for API calls
- Environment variables via dotenv

## General Patterns
- Event-driven architecture with normalized events
- WebSocket communication between frontend and backend
- GitHub API integration via Octokit
- Git operations via simple-git library
- Error handling with proper logging

## File Organization
- Frontend: `src/opencode/ui/` for UI components
- Backend: `src/` for TypeScript services
- Shared: `shared/js/opencode-events/` for event definitions
- Configuration: `shadow-cljs.edn` for frontend, `tsconfig.json` for backend

## Styling Conventions
- Tailwind CSS utility classes
- Responsive design with grid layouts
- Consistent spacing (p-2, p-4, etc.)
- Border styling for cards and containers
- Text sizing hierarchy (text-sm, font-bold, etc.)