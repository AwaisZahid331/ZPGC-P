# Zamindar College Backend API

A professional Node.js backend API for the Zamindar College Management System.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with role-based access control
- **Input Validation** with express-validator
- **Error Handling** with custom middleware
- **Security** with helmet, CORS, and rate limiting
- **Professional Structure** with organized folders and files

## 📁 Project Structure

```
Backend/
├── src/
│   ├── Controllers/
│   │   ├── Admin/
│   │   │   ├── adminController.js
│   │   │   ├── userController.js
│   │   │   └── contentController.js
│   │   └── User/
│   │       ├── userController.js
│   │       └── contentController.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── Validation/
│   │   ├── Admin/
│   │   │   ├── userValidation.js
│   │   │   └── contentValidation.js
│   │   └── User/
│   │       └── userValidation.js
│   ├── Config/
│   │   └── db.js
│   └── Utils/
│       └── Constants.js
├── app.js
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zamindar_college
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 📚 API Endpoints

### Admin Routes (`/api/admin`)

- `GET /dashboard` - Get dashboard statistics
- `GET /system-status` - Get system status
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /content` - Get all content
- `GET /content/:id` - Get content by ID
- `POST /content` - Create new content
- `PUT /content/:id` - Update content
- `DELETE /content/:id` - Delete content

### User Routes (`/api/user`)

- `GET /events` - Get public events
- `GET /events/:id` - Get event by ID
- `GET /notices` - Get public notices
- `GET /notices/:id` - Get notice by ID
- `GET /profile` - Get user profile (Auth required)
- `PUT /profile` - Update user profile (Auth required)
- `PUT /change-password` - Change password (Auth required)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login** to get access token
2. **Include token** in Authorization header: `Bearer <token>`
3. **Role-based access** for admin and user routes

## 🛡️ Security Features

- **Helmet** for security headers
- **CORS** configuration
- **Rate limiting** to prevent abuse
- **Input validation** for all endpoints
- **JWT authentication** with role-based access
- **Error handling** without sensitive information exposure

## 📝 Validation

All endpoints include comprehensive validation:

- **User data** validation for registration and updates
- **Content data** validation for events and notices
- **Query parameters** validation for pagination and filtering
- **File upload** validation for images and documents

## 🚦 Error Handling

The API includes professional error handling:

- **Custom error middleware** for consistent error responses
- **HTTP status codes** following REST conventions
- **Validation errors** with detailed messages
- **Database errors** with appropriate responses

## 🔄 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Dependencies

### Production
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### Development
- **nodemon** - Development server
- **jest** - Testing framework
- **supertest** - HTTP testing

## 🚀 Deployment

1. **Set environment variables** for production
2. **Install dependencies**: `npm install --production`
3. **Start the server**: `npm start`
4. **Use PM2** for process management in production

## 📞 Support

For support and questions, contact the development team.

---

**Zamindar College Management System** - Professional Backend API
