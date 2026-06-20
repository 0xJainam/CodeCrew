# CodeCrew

Real-time collaborative code editor supporting multi-user editing, room-based collaboration, active user presence, and persistent multi-file workspaces.

## Live Demo

🌐 https://code-crew-black.vercel.app/

## Features

- **Real-Time Collaboration** — Multiple users edit code simultaneously with sub-second synchronization via Socket.IO
- **Multi-File Support** — Create, rename, and delete files within a room. Each file tracks its own language and content
- **Active Users** — Live presence panel showing who's in the room, with Owner badge and (you) indicator
- **Room System** — Create or join rooms with unique IDs. Share the room ID to collaborate instantly
- **Auto-Save** — Debounced auto-save (1.5s) with Ctrl+S override. Leave button saves before navigating
- **Language Detection** — Auto-detects language from file extension. Changing language renames the file extension
- **Monaco Editor** — VS Code-powered editor with syntax highlighting, IntelliSense, and dark theme

## Screenshots

### Landing Page

![Landing](landing_page.png)

### Collaborative Editor

![Editor](editor.png)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| Backend | Express, Node.js |
| Database | MongoDB Atlas (Mongoose) |
| Real-Time | Socket.IO |
| Auth | JWT, bcrypt |
| Security | Helmet, express-rate-limit, input validation |

## Project Structure

```
├── backend/
│   ├── server.js                 # HTTP + Socket.IO server
│   ├── src/
│   │   ├── app.js                # Express app (middleware, routes)
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js # Register, login, profile
│   │   │   └── roomController.js # Create, join, get, update rooms
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # JWT verification
│   │   ├── models/
│   │   │   ├── User.js           # username, email, password
│   │   │   └── Room.js           # roomId, owner, members, files
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── roomRoutes.js
│   │   └── socket/
│   │       └── socketHandler.js  # Room presence, code sync
│   └── .env.example
│
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── dashboard/page.tsx    # Create / join rooms
│   │   └── editor/page.tsx       # Main editor (state, sockets, save)
│   ├── components/
│   │   ├── editor/
│   │   │   ├── EditorTopbar.tsx  # Room ID, language, leave
│   │   │   ├── sidebar.tsx       # File explorer
│   │   │   ├── Tabs.tsx          # Open file tabs
│   │   │   ├── codeEditor.tsx    # Monaco wrapper
│   │   │   └── usersPanel.tsx    # Active users list
│   │   └── shared/
│   │       └── logo.tsx
│   └── lib/
│       ├── api.ts                # Axios instance with JWT interceptor
│       └── socket.ts             # Socket.IO client (autoConnect: false)
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone

```bash
git clone https://github.com/your-username/collaborative-code-editor.git
cd collaborative-code-editor
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=your-app
JWT_SECRET=your-secret-key-here
```

> Generate a strong JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ..
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Auth

| Method | Endpoint | Body | Auth |
|--------|----------|------|:----:|
| POST | `/api/auth/register` | `{ username, email, password }` | ✗ |
| POST | `/api/auth/login` | `{ email, password }` | ✗ |
| GET | `/api/auth/profile` | — | ✓ |

### Rooms

| Method | Endpoint | Body | Auth |
|--------|----------|------|:----:|
| POST | `/api/rooms/create` | — | ✓ |
| POST | `/api/rooms/join` | `{ roomId }` | ✓ |
| GET | `/api/rooms/:roomId` | — | ✓ |
| PUT | `/api/rooms/:roomId/code` | `{ files }` | ✓ |

### Rate Limits

| Scope | Limit |
|-------|:-----:|
| `/api/auth/*`, `/api/rooms/*` | 100 req / 15 min |
| `/api/auth/login`, `/api/auth/register` | 10 req / 15 min |

## Socket.IO Events

| Event | Direction | Payload | Description |
|-------|:---------:|---------|-------------|
| `join-room` | Client → Server | `roomId` | Join a room, returns `{ userId }` |
| `code-change` | Client → Server | `{ roomId, files }` | Broadcast file changes |
| `receive-code-change` | Server → Client | `files` | Receive remote file changes |
| `room-users` | Server → Client | `[{ userId, username, isOwner }]` | Active users list update |

## Architecture

```
User types code
     ↓
Monaco onChange → setFiles()
     ↓
useEffect detects change
     ├─→ socket.emit("code-change")  →  Other clients receive instantly
     └─→ setTimeout(1500ms)          →  PUT /api/rooms/:id/code  →  MongoDB
```

- **Socket.IO** handles transient, real-time updates (code changes, presence)
- **REST API** is the single source of truth for persistent state
Room data is persisted in MongoDB, while Socket.IO is used only for low-latency synchronization.
- **Autosave** debounces at 1500ms. Ctrl+S and Leave button save immediately
- **Presence** is in-memory only (server-side Map). Cleared on server restart

## Supported Editor Languages

TypeScript, JavaScript, Python, C++, Java, CSS, JSON, Markdown, HTML
