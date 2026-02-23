# Job Trackr — Backend (IN PROGRESS)

The backend for Job Trackr, built with Node.js, Express and TypeScript.

## Tech Stack

- Node.js + Express + TypeScript
- Passport.js (Google OAuth 2.0)
- JSON Web Tokens (JWT)
- PostgreSQL via Neon
- Resend (email delivery)

## Architecture Overview

The backend follows a modular structure:
src/

├── routes/ → Express route definitions

├── controllers/ → Request handlers

├── services/ → Business logic layer

├── middleware/ → Authentication & validation middleware

├── config/ → Passport, database, and environment setup

└── utils/ → Helper utilities

---

## Authentication System

The backend supports two authentication strategies:

### 1. Google OAuth 2.0

Implemented using Passport.js.  
Users authenticate via Google and a secure session is established using HTTP only cookies.

### 2. Email One-Time Password (OTP)

Users receive a time-limited verification code via email.  
Upon successful verification, a session is created without requiring a password.

### No passwords are stored in the database.

---

## Session & Security Design

- Session-based authentication using HTTP-only cookies
- JWTs used internally for secure verification flows
- Secure environment variables based configuration
- OAuth callback validation
- Expiring email verification codes

Sensitive data is never exposed to the frontend.

---

## Database

The application uses PostgreSQL hosted on Neon.

### Core Tables

- `users`
- `verification_codes`

---

## Email Delivery

Transactional emails (OTP verification codes) are delivered using **Resend**.

Verification codes:

- Are time limited
- Are stored securely in the database
- Expire automatically

---

## API Design

The backend exposes a REST-based API consumed by the frontend.

Key responsibilities include:

- `/api/auth/*` → Authentication flows
- Session validation
- User retrieval
- OTP generation and verification

All routes are structured to maintain clear separation between routing logic and business logic.

---

## Deployment

The backend is deployed as a standalone Vercel project, some changes HAVE BEEN made to be able to be hosted on @Vercel which internally uses serverless functions.

Environment variables are configured per environment (development / production), ensuring secure secret handling and proper OAuth configuration.

## Author/Maintainer/Owner

@Platias Konstantinos
