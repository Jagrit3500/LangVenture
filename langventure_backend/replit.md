# LangVenture Backend - Project Documentation

## Overview
LangVenture is a MERN stack backend API for a passion-based language learning application. The API supports user authentication, passion path management, lesson tracking, challenges, and translation services.

## Recent Changes
- **2025-10-25**: Initial project setup
  - Created Express.js backend with MongoDB/Mongoose
  - Implemented JWT authentication (register/login)
  - Created 4 Mongoose models: User, Path, Lesson, Challenge
  - Built 4 route modules: auth, paths, user, translate
  - Added LibreTranslate API proxy for translations
  - Created seed script with 3 passion paths (food-travel, music-art, movies-media)
  - Configured package.json with start, dev, and seed scripts
  - Comprehensive README with API documentation and examples

## Project Architecture

### Tech Stack
- **Runtime**: Node.js 20
- **Framework**: Express.js 5
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT with bcryptjs
- **Translation**: LibreTranslate API proxy via Axios
- **Development**: Nodemon for auto-reload

### Directory Structure
```
├── config/          # Database configuration
├── middleware/      # Authentication middleware
├── models/          # Mongoose schemas (User, Path, Lesson, Challenge)
├── routes/          # API routes (auth, paths, user, translate)
├── utils/           # Helper functions (JWT generation)
├── server.js        # Main Express application
├── seed.js          # Database seeding script
└── README.md        # API documentation
```

### API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Paths**: `/api/paths`, `/api/paths/:slug`
- **User**: `/api/user/me`, `/api/user/set-path`, `/api/user/challenge`, `/api/user/challenges`
- **Translate**: `/api/translate`
- **Health**: `/api/health`

### Environment Variables Required
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `TRANSLATE_API`: (Optional) LibreTranslate API key
- `PORT`: Server port (default: 5000)

## User Preferences
- Simple, well-commented code
- Focus on core features without camera/audio
- Comprehensive README with setup instructions and API examples
- Runnable project with basic route testing

## Current State
- All core backend features implemented
- Database models created with proper relationships
- Authentication middleware protecting user routes
- Seed script ready with 3 passion paths and 5 total lessons
- Server configured to run on port 5000
- Ready for MongoDB connection and testing

## Next Steps
1. Connect MongoDB instance (local or Atlas)
2. Run seed script to populate database
3. Test all API endpoints
4. Add input validation
5. Implement rate limiting
6. Add user progress tracking
