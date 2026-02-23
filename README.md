# Job Trackr Project (IN PROGRESS)

Job Trackr is a personal project and a free fullstack web application hosted with @Vercel, designed to help you track and manage your job applications, interviews, and offers all in one place.

Live at: https://www.jobtrackrproject.work

## Overview

When you're job hunting it's easy to lose track of where you've applied, what stage you're at, and what's coming up. Job Trackr solves that by giving you a clean dashboard to log and monitor all your applications in one place. It provides you with:

- Where you've applied
- The current stage of each application
- Upcoming interviews
- Offers and follow ups
- Notes for each company
- CVs sent

---

## Authentication

Users can securely sign in using:

- Google OAuth
- Email based One-Time Password (OTP) verification (passwordless login)

No passwords are stored. Authentication is handled securely using session-based access.

---

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Axios
- Redux Toolkit
- Material UI

### Backend

- Node.js + Express + TypeScript
- Passport.js (Google OAuth 2.0)
- JSON Web Tokens (JWT)
- PostgreSQL via Neon
- Resend (email delivery)

### Deployment

- Hosted on Vercel

---

For more detailed documentation:

- See the [Frontend README](./frontend/README.md)
- See the [Backend README](./backend/README.md)

---

## Purpose

This project was built to:

- Practice fullstack architecture
- Implement secure authentication (OAuth + OTP)
- Work with PostgreSQL in a production like environment
- Build and deploy a scalable web application live with vercel servers

---

## Author/Maintainer/Owner

@Platias Konstantinos
