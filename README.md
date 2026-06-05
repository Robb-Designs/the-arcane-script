# The Arcane Script

A full-stack typing battle game where players authenticate, enter battles against themed enemies, and record match outcomes.

The project is split into:
- Client: React + Vite + TypeScript + Tailwind/8bit UI
- Server: Node.js + Express + TypeScript + MongoDB

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Repository Structure](#repository-structure)
4. [Prerequisites](#prerequisites)
5. [Environment Variables](#environment-variables)
6. [Local Development](#local-development)
7. [Build and Production Run](#build-and-production-run)
8. [API Surface Summary](#api-surface-summary)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)

## Project Overview

The Arcane Script combines a game-focused frontend with a REST API backend.

Core capabilities:
- User registration and login with JWT authentication
- Protected game endpoints
- Battle startup flow by difficulty
- Enemy and prompt retrieval
- Match result persistence and profile/history retrieval
- Themed 8bit-style UI components

## Tech Stack

### Frontend (client)
- React 19
- Vite 8
- TypeScript 6
- React Router 7
- Tailwind CSS 4
- Radix UI Progress

### Backend (server)
- Node.js
- Express 5
- TypeScript
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt

## Repository Structure

```text
the-arcane-script/
	client/                 # React application
	server/                 # Express API
	README.md
```

## Prerequisites

- Node.js 20+ recommended
- npm 10+
- MongoDB connection string (Atlas or local)

## Environment Variables

Create the following files before running:

### client/.env

```env
VITE_API_URL=http://localhost:5000
```

### server/.env

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Local Development

Install dependencies:

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

Run development servers (in separate terminals):

```bash
# Terminal 1 - backend
cd server
npm run dev
```

```bash
# Terminal 2 - frontend
cd client
npm run dev
```

Default local URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Build and Production Run

### Frontend

```bash
cd client
npm run build
npm run preview
```

### Backend

```bash
cd server
npm run build
npm start
```

## API Surface Summary

Base URL prefix examples below assume backend URL + route path.

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Game
- POST /api/game/battle/start

### Results
- POST /api/results/match
- GET /api/results/history

### Enemies
- GET /api/enemies
- GET /api/enemies/difficulty/:difficulty

### Users
- GET /api/users/profile

## Deployment Guide

Recommended split deployment:
- Deploy backend first (Render, Railway, Fly.io, etc.)
- Deploy frontend second (Vercel, Netlify, etc.)

### 1) Deploy backend

Project root for service:
- server

Build command:
```bash
npm install && npm run build
```

Start command:
```bash
npm start
```

Required environment variables:
- MONGO_URI
- JWT_SECRET
- PORT (if your host requires explicit port handling)

### 2) Deploy frontend

Project root for service:
- client

Build command:
```bash
npm install && npm run build
```

Publish directory:
- dist

Required environment variables:
- VITE_API_URL=https://your-backend-domain

### 3) Post-deploy verification

- Backend root returns API message at /
- Frontend loads without console API URL errors
- Register and login work
- Start battle and save match result work

## Troubleshooting

- Build fails in client with TypeScript errors:
	- Run `npm run build` in client and resolve all TS errors first.
- API calls fail from frontend:
	- Verify `VITE_API_URL` points to the deployed backend.
- Backend fails on startup:
	- Check `MONGO_URI` and `JWT_SECRET` are set.
- CORS issues in production:
	- Restrict and configure CORS origins in the server for your frontend domain.

