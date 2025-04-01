# MUI Project Backend

This is the backend API for the MUI Project. It provides the necessary endpoints to support the frontend application.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- CORS for cross-origin resource sharing
- Helmet for security
- dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example` and set your environment variables
5. Run the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Run the production server
- `npm run dev` - Run the development server with hot reloading
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Health Check
- `GET /health` - Check if the server is running

## Project Structure

```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── server.ts      # Entry point
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```
