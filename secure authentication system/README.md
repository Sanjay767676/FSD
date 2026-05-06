# Secure Authentication System

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env` and set `JWT_SECRET`.
3. Start the server with `npm run dev`.

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/private` (protected)

## Demo login

Use these credentials with the React frontend or a direct `POST /api/auth/login` request:

```json
{
  "email": "amina@example.com",
  "password": "Password123!"
}
```

## Sample body

```json
{
  "name": "Amina Khan",
  "email": "amina@example.com",
  "password": "StrongPass123!"
}
```