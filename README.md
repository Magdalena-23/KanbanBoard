# KanbanBoard

## Setup instructions (for both SQLite and optionally MySQL) 
This project includes a Node.js + Express backend and a React frontend, with support for SQLite (default) and optional MySQL.

Follow the steps below to get everything running.
# Clone the repository
git clone https://github.com/yourusername/KanbanBoard.git
cd KanbanBoard/server
# Install dependencies
npm install
# Create .env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=kanban
# Run database schema
# Start the backend
npm run dev
# Frontend
cd client
npm install
npm run dev

## Design decisions and tradeoffs 

# Use native HTML5 drag-and-drop instead of a library.
Tradeoffs:
✔ No extra dependencies
✔ Fine-grained control
✖ Less smooth UI/UX than libraries
✖ More code to manage manually
✖ More work required to prevent edge cases

# The frontend manages API requests using axios instead of React Query.
Tradeoffs:
✔ Less complexity — no learning curve or extra library needed
✔ Lightweight bundle size
✔ Clear control over when data refetches
✖ No built-in caching, meaning data is not shared across components
✖ Manual state management is required for loading/error states
✖ No automatic refetching
✖ Can lead to duplicated logic in multiple components

# Using a single position integer for ordering
Tradeoffs:
✔ Reordering is simple (UPDATE ... SET position = X)
✔ Works perfectly for small boards
✖ Moving items often causes cascade writes (updating many rows)
✖ Items can get “position gaps” if not normalized

## What you’d improve with more time 

1. Add authentication + multi-user support
Each user could have separate boards.

2. Add complete API validation
Using Zod or Joi to validate request payloads would prevent invalid data from reaching the database.

3. Add a multi-board system
Currently the app has one board.
Future improvements could include:
Create/delete/update boards
Favorite boards

4. Full dark mode + theme customization

5.Full integration of React Query for server-state management
Replacing axios + React state with React Query would provide caching, background updates, mutation handling and reduce a lot of repetitive code.
