# 🔐 Role-Based Authentication API

A robust Node.js Express backend solution for secure user authentication and granular role-based access control using industry-standard technologies.

## 🚀 Features

- **Secure Authentication**
  - User registration with password hashing (bcrypt)
  - JWT token generation and validation
  - Protected API endpoints

- **Role-Based Access Control**
  - Three-tier role system (admin, manager, user)
  - Flexible middleware for route protection
  - Hierarchical permission structure

- **Database Integration**
  - MongoDB with Mongoose ODM
  - Optimized connection handling
  - Schema validation

- **Developer Experience**
  - Environment configuration (.env)
  - Clean project structure
  - Comprehensive error handling

## 📦 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Atlas or local)
- **Security**: JWT, bcrypt
- **ODM**: Mongoose

## 🛠 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/role-based-auth.git
   cd role-based-auth
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   ```sh
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   JWT_SECRET=your_strong_secret_here
   CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

4. **Start the server**
   ```sh
   npm start
   # or for development with nodemon
   npm run dev
   ```

## 🌐 API Documentation

### Authentication Endpoints

| Method | Endpoint          | Description                     | Request Body                              |
|--------|-------------------|---------------------------------|------------------------------------------|
| POST   | `/api/auth/register` | Register new user               | `{ username, password, role }`           |
| POST   | `/api/auth/login`    | Authenticate and receive token  | `{ username, password }`                 |

**Sample Registration Request:**
```json
{
  "username": "adminUser",
  "password": "securePassword123",
  "role": "admin"
}
```

**Sample Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "adminUser",
    "role": "admin"
  }
}
```

### Protected Endpoints

| Method | Endpoint              | Access Level | Description              |
|--------|-----------------------|--------------|--------------------------|
| GET    | `/api/users/admin`    | Admin only   | Admin dashboard          |
| GET    | `/api/users/manager`  | Manager+     | Manager resources        |
| GET    | `/api/users/user`     | All users    | General user content     |

**Required Header for Protected Routes:**
```
Authorization: Bearer your.jwt.token.here
```

## 🏗 Project Structure

```
src/
├── config/
│   └── dbConnect.js         # Database connection manager
├── controllers/
│   └── authController.js    # Business logic for auth flows
├── middlewares/
│   ├── authMiddleware.js    # JWT verification
│   └── roleMiddleware.js    # Role-based access control
├── models/
│   └── userModel.js         # User schema definition
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   └── userRoutes.js        # Protected user endpoints
└── server.js                # Application entry point
```

## 🔒 Security Implementation

1. **Password Storage**
   - Uses bcrypt with salt rounds (12) for hashing
   - Never stores plaintext passwords

2. **Token Security**
   - JWT tokens with expiration (default 1h)
   - Signed with strong secret key
   - HTTP-only cookies option available

3. **Role Validation**
   - Middleware checks user role before route access
   - Admin > Manager > User hierarchy

## 💡 Usage Examples

### 1. Protecting Routes

```javascript
// Require authentication for route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Require specific role
router.get('/admin-only', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  (req, res) => {
    res.json({ message: 'Admin dashboard' });
  }
);
```

### 2. Customizing Roles

Edit `src/models/userModel.js` to modify role options:
```javascript
const userSchema = new mongoose.Schema({
  // ...other fields
  role: {
    type: String,
    enum: ['admin', 'manager', 'user', 'customRole'], // Add your roles
    default: 'user'
  }
});
```

## 🚨 Error Handling

The API returns standardized error responses:

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

Sample error response:
```json
{
  "success": false,
  "message": "Authentication failed",
  "error": "Invalid credentials"
}
```

## 📈 Performance Considerations

- Database connection pooling
- JWT verification optimized
- Minimal middleware stack
- Environment-specific configurations

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/your-repo/role-based-auth](https://github.com/your-repo/role-based-auth)
