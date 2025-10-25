# LangVenture Backend

A MERN stack backend API for LangVenture - a passion-based language learning application. This API provides authentication, passion path management, challenge tracking, and translation services.

## Features

- **JWT Authentication**: Secure user registration and login with bcrypt password hashing
- **Passion Paths**: Three seeded learning paths (Food & Travel, Music & Art, Movies & Media)
- **Lessons**: Structured vocabulary and phrases for each path
- **Challenges**: Store and track text-based language learning challenges
- **Translation Proxy**: Integrate with LibreTranslate API for real-time translations

## Tech Stack

- **Express.js**: Web framework
- **MongoDB**: Database (via Mongoose ODM)
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Axios**: HTTP client for translation proxy
- **CORS**: Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository** (or download files)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   MONGO_URI=mongodb://localhost:27017/langventure
   JWT_SECRET=your_super_secret_jwt_key_change_this
   TRANSLATE_API=
   PORT=5000
   ```

   **Environment Variables Explained**:
   - `MONGO_URI`: Your MongoDB connection string (local or Atlas)
   - `JWT_SECRET`: Secret key for signing JWT tokens (use a strong random string)
   - `TRANSLATE_API`: Optional API key for LibreTranslate (works without it on free tier)
   - `PORT`: Server port (default: 5000)

   **For Replit Users**: Use Replit Secrets instead of `.env` file. Add the secrets in the Secrets tab.

   **MongoDB Atlas IP Whitelisting**:
   If using MongoDB Atlas on Replit, you need to whitelist Replit's IP addresses:
   1. Go to MongoDB Atlas → **Security** → **Network Access**
   2. Click **Add IP Address**
   3. Enter: `0.0.0.0/0` (allows all IPs - Replit uses dynamic IPs)
   4. Add a comment like "Replit - dynamic IPs"
   5. Click **Confirm**
   
   Note: Even with `0.0.0.0/0`, your database is still protected by username/password authentication in your connection string.

4. **Seed the database**:
   ```bash
   npm run seed
   ```
   This creates three passion paths with lessons.

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login user

### Paths
- **GET** `/api/paths` - Get all passion paths with lessons
- **GET** `/api/paths/:slug` - Get single path by slug

### User (Protected - Requires Authentication)
- **GET** `/api/user/me` - Get authenticated user profile
- **POST** `/api/user/set-path` - Set user's learning path
- **POST** `/api/user/challenge` - Store a text challenge
- **GET** `/api/user/challenges` - Get all user challenges

### Translation
- **POST** `/api/translate` - Translate text (proxies to LibreTranslate)

## Example API Requests

### 1. Register a New User
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**Response**:
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1a",
  "username": "johndoe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login User
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### 3. Get All Paths
```javascript
fetch('http://localhost:5000/api/paths')
  .then(res => res.json())
  .then(data => console.log(data));
```

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
        "description": "Learn essential phrases for dining out...",
        "vocabulary": [...],
        "phrases": [...]
      }
    ]
  }
]
```

### 4. Get Single Path by Slug
```javascript
fetch('http://localhost:5000/api/paths/food-travel')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 5. Get User Profile (Protected)
```javascript
const token = 'your_jwt_token_here';

fetch('http://localhost:5000/api/user/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### 6. Set User's Learning Path (Protected)
```javascript
const token = 'your_jwt_token_here';

fetch('http://localhost:5000/api/user/set-path', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    pathId: '60d5ec49f1b2c72b8c8e4f1a'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### 7. Store a Challenge (Protected)
```javascript
const token = 'your_jwt_token_here';

fetch('http://localhost:5000/api/user/challenge', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    challengeText: 'Translate: I would like to order paella',
    pathId: '60d5ec49f1b2c72b8c8e4f1a',
    lessonId: '60d5ec49f1b2c72b8c8e4f1b',
    userResponse: 'Me gustaría pedir paella'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### 8. Translate Text
```javascript
fetch('http://localhost:5000/api/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    q: 'Hello, how are you?',
    source: 'en',
    target: 'es'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**Response**:
```json
{
  "translatedText": "Hola, ¿cómo estás?",
  "source": "en",
  "target": "es"
}
```

## Database Models

### User
- `username`: String (unique, required)
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `selectedPath`: ObjectId (reference to Path)

### Path
- `name`: String (required)
- `slug`: String (unique, required)
- `description`: String (required)
- `icon`: String (emoji)
- `color`: String (hex color)

### Lesson
- `title`: String (required)
- `description`: String (required)
- `path`: ObjectId (reference to Path)
- `order`: Number
- `vocabulary`: Array of { word, translation, example }
- `phrases`: Array of { phrase, translation, context }

### Challenge
- `user`: ObjectId (reference to User)
- `path`: ObjectId (reference to Path)
- `lesson`: ObjectId (reference to Lesson)
- `challengeText`: String (required)
- `userResponse`: String
- `completed`: Boolean

## Seeded Data

The seed script creates three passion paths:

1. **Food & Travel** (slug: `food-travel`)
   - Ordering at Restaurants
   - Navigating Markets & Street Food

2. **Music & Art** (slug: `music-art`)
   - Understanding Song Lyrics

3. **Movies & Media** (slug: `movies-media`)
   - Movie Vocabulary & Reviews
   - Social Media & Digital Communication

## Testing Routes

You can use tools like:
- **Postman**: Import endpoints and test manually
- **cURL**: Command-line HTTP requests
- **Thunder Client**: VS Code extension
- Browser fetch (for GET requests)

## Project Structure

```
langventure-backend/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User model
│   ├── Path.js            # Path model
│   ├── Lesson.js          # Lesson model
│   └── Challenge.js       # Challenge model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── paths.js           # Path routes
│   ├── user.js            # User routes
│   └── translate.js       # Translation proxy route
├── utils/
│   └── generateToken.js   # JWT token generator
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── seed.js               # Database seed script
├── server.js             # Main application file
└── README.md             # This file
```

## Future Enhancements

- Input validation with express-validator
- Rate limiting for translation API
- User progress tracking
- Pagination for large datasets
- Challenge review and feedback system
- Audio/camera features integration
- Email verification
- Password reset functionality

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
