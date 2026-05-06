# MongoDB Atlas Database API

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env` if you want to point at a real Atlas cluster.
3. Start the API with `npm run dev`.

## Behavior

- If `MONGODB_URI` is available and valid, the API uses MongoDB Atlas through Mongoose.
- If no database is available, the API falls back to an in-memory demo store so the app still runs.

## Endpoints

- `GET /health`
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`