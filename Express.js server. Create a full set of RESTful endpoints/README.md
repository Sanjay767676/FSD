# Express.js REST API

## Setup

1. Run `npm install`.
2. Start the server with `npm run dev`.
3. Import the Postman collection from `postman/books-api.postman_collection.json`.

## Endpoints

- `GET /health`
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

## Sample body

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "year": 2018,
  "genre": "Self-Help"
}
```