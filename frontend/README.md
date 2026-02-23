# Job Trackr Project — Frontend (IN PROGRESS)

The frontend for Job Trackr, built with React and TypeScript.

## Tech Stack

- React + TypeScript
- Vite
- Material UI (MUI)
- Redux Toolkit
- React Router
- Axios

## Architecture High Level Overview

The application follows a modular structure:

src/

├── pages/ → Route level views

├── components/ → Reusable UI components

├── hooks/ → Custom React hooks

├── services/ → API communication layer

├── components/redux/common → Global state management

---

## State Management

Global state is handled with **Redux Toolkit**.

Redux is responsible for:

- Authentication state
- User session data

Local component state is used only where global persistence is not required.

---

## Authentication Flow

Authentication is handled via session based access.

On application load:

- The frontend calls `/api/auth/me`
- If a valid HTTP-only cookie exists, the user is authenticated
- Otherwise, the user is redirected to the home page

Supported authentication methods:

- Google OAuth
- Email-based One-Time Password (OTP)

The frontend never stores sensitive tokens in localStorage.

---

## API Communication

All API calls are abstracted into a dedicated `services` layer using Axios.

This provides:

- Centralized error handling
- Clean separation between UI and networking logic
- Easier future refactoring

---

## UI & Styling

- Built with Material UI
- Styles are centralized in `.styles.ts` files
- Inline styling is avoided where possible
- Layout is responsive and mobile friendly

---

## Deployment

The frontend is deployed as a standalone Vercel project and communicates with the backend via environment-configured API URLs.

## Author/Maintainer/Owner

@Platias Konstantinos
