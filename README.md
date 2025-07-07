# AI Project

This repository contains a full-stack AI-powered application with a React (Vite) frontend and a Node.js/Express backend.

## Project Structure

```
AI-project/
  client/    # Frontend (React + Vite)
  server/    # Backend (Node.js + Express)
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup

#### 1. Clone the repository
```sh
git clone <your-repo-url>
cd AI-project
```

#### 2. Install dependencies

- For the frontend:
  ```sh
  cd client
  npm install
  # or
  yarn
  ```
- For the backend:
  ```sh
  cd ../server
  npm install
  # or
  yarn
  ```

#### 3. Environment Variables
- Create `.env` files in both `client/` and `server/` as needed for your configuration (API URLs, secrets, etc).

#### 4. Running the App

- Start the backend:
  ```sh
  cd server
  npm start
  ```
- Start the frontend:
  ```sh
  cd client
  npm run dev
  ```

## Features
- User authentication (register, login, password reset)
- File upload and analysis
- Dashboard and reports

## Folder Details
- `client/src/components/` - React components
- `client/src/views/` - Page views
- `server/controller/` - Express route controllers
- `server/models/` - Database models

## License
MIT 