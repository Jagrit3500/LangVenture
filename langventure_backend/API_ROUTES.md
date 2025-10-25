# 📡 LangVenture API Routes Reference

Quick reference guide for all API endpoints.

---

## 🏥 Health & Info

### GET `/api/health`
Check if the API is running.

**Response**:
```json
{
  "status": "ok",
  "message": "LangVenture API is running",
  "timestamp": "2025-10-25T13:00:00.000Z"
}
```

### GET `/`
Get API information and available endpoints.

---

## 🔐 Authentication (Public)

### POST `/api/auth/register`
Register a new user account.

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/api/auth/login`
Login existing user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**: Same as register

---

## 🎯 Passion Paths (Public)

### GET `/api/paths`
Get all passion paths with their lessons.

**Response**:
```json
[
  {
    "_id": "...",
    "name": "Food & Travel",
    "slug": "food-travel",
    "description": "Learn languages through culinary adventures...",
    "icon": "🍜",
    "color": "#F59E0B",
    "lessons": [
      {
        "_id": "...",
        "title": "Ordering at Restaurants",
        "description": "...",
        "vocabulary": [...],
        "phrases": [...]
      }
    ]
  }
]
```

### GET `/api/paths/:slug`
Get a single path by slug (e.g., `food-travel`, `music-art`, `movies-media`).

**Example**: `GET /api/paths/food-travel`

**Response**: Single path object with lessons

---

## 👤 User Profile (Protected - Requires Auth Token)

All user routes require `Authorization: Bearer <token>` header.

### GET `/api/user/me`
Get authenticated user's profile.

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response**:
```json
{
  "_id": "...",
  "username": "johndoe",
  "email": "john@example.com",
  "selectedPath": {
    "_id": "...",
    "name": "Food & Travel",
    "slug": "food-travel"
  },
  "createdAt": "2025-10-25T13:00:00.000Z"
}
```

### POST `/api/user/set-path`
Set the user's selected learning path.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "pathId": "507f1f77bcf86cd799439011"
}
```

**Response**: Updated user object

### POST `/api/user/challenge`
Store a text-based language challenge.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "challengeText": "Translate: I would like to order paella",
  "pathId": "507f1f77bcf86cd799439011",
  "lessonId": "507f1f77bcf86cd799439012",
  "userResponse": "Me gustaría pedir paella"
}
```

**Response**:
```json
{
  "_id": "...",
  "user": "...",
  "path": {...},
  "lesson": {...},
  "challengeText": "Translate: I would like to order paella",
  "userResponse": "Me gustaría pedir paella",
  "completed": true,
  "createdAt": "2025-10-25T13:00:00.000Z"
}
```

### GET `/api/user/challenges`
Get all challenges for the authenticated user.

**Headers**: `Authorization: Bearer <token>`

**Response**: Array of challenge objects

---

## 🌐 Translation (Public)

### POST `/api/translate`
Translate text using LibreTranslate API.

**Request Body**:
```json
{
  "q": "Hello, how are you?",
  "source": "en",
  "target": "es"
}
```

**Response**:
```json
{
  "translatedText": "Hola, ¿cómo estás?",
  "source": "en",
  "target": "es"
}
```

**Language Codes**: `en` (English), `es` (Spanish), `fr` (French), `de` (German), etc.

---

## 📝 Notes

- **Base URL**: `http://localhost:5000` (development)
- **Protected Routes**: Require `Authorization: Bearer <token>` header
- **Token**: Obtained from register/login endpoints, valid for 30 days
- **Content-Type**: All POST requests use `application/json`

---

## 🧪 Testing with cURL

**Register**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass123"}'
```

**Get Paths**:
```bash
curl http://localhost:5000/api/paths
```

**Get User Profile** (replace TOKEN):
```bash
curl http://localhost:5000/api/user/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
