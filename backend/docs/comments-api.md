# Comments API

Base path: `/api/comments`

## Models

### Comment document

`Comment` documents are stored in MongoDB with these fields:

- `_id` (ObjectId)
- `body` (string)
- `seller` (ObjectId, ref `User`)
- `item` (ObjectId, ref `Item`)
- `createdAt` (ISO 8601 string)
- `updatedAt` (ISO 8601 string)
- `__v` (number, Mongoose version key)

## Endpoints

### List comments

`GET /api/comments`

Returns all comments in the database.

**Response**

- `200 OK` with a JSON array of comment documents
- `500 Internal Server Error` with `{ "error": "<message>" }`

**Example response**

```json
[
  {
    "_id": "65a3c9f0a9b9c86a9a4f1c2d",
    "body": "Great item!",
    "seller": "65a3c9c4a9b9c86a9a4f1c18",
    "item": "65a3c9e1a9b9c86a9a4f1c21",
    "createdAt": "2026-02-16T10:12:34.567Z",
    "updatedAt": "2026-02-16T10:12:34.567Z",
    "__v": 0
  }
]
```

### Delete a comment

`DELETE /api/comments/:id`

Deletes the comment with the given id.

**Path parameters**

- `id` (string, required): Comment ObjectId

**Response**

- `200 OK` with `{ "message": "Comment deleted successfully" }`
- `404 Not Found` with `{ "error": "Comment not found" }`
- `500 Internal Server Error` with `{ "error": "<message>" }`

**Example response**

```json
{ "message": "Comment deleted successfully" }
```
