# Task Management API

A comprehensive REST API built with modern technologies for managing tasks with user authentication and authorization.

## 🛠 Technologies Used

### **Core Framework & Language**

- **NestJS** `^11.0.1` - Progressive Node.js framework for building scalable server-side applications
- **TypeScript** `^5.7.3` - Strongly typed programming language that builds on JavaScript
- **Node.js** - JavaScript runtime environment

### **Database & ORM**

- **PostgreSQL** `^8.16.3` - Powerful, open-source relational database
- **TypeORM** `^0.3.26` - Object-Relational Mapping (ORM) framework for TypeScript
- **@nestjs/typeorm** `^11.0.0` - NestJS integration with TypeORM

### **Authentication & Security**

- **JWT (JSON Web Tokens)** `^11.0.0` - Secure token-based authentication
- **Passport.js** `^0.7.0` - Authentication middleware for Node.js
- **passport-jwt** `^4.0.1` - JWT authentication strategy for Passport
- **bcryptjs** `^3.0.2` - Password hashing library with salt support

### **Validation & Configuration**

- **class-validator** `^0.14.2` - Decorator-based property validation
- **class-transformer** `^0.5.1` - Transform objects to classes and vice versa
- **@hapi/joi** `^17.1.1` - Object schema validation library
- **@nestjs/config** `^4.0.2` - Configuration module for NestJS

### **Development & Testing Tools**

- **Jest** `^30.0.0` - JavaScript testing framework
- **Supertest** `^7.0.0` - HTTP assertion library for testing APIs
- **ESLint** `^9.18.0` - JavaScript/TypeScript linting utility
- **Prettier** `^3.4.2` - Code formatting tool
- **ts-jest** `^29.2.5` - TypeScript preprocessor for Jest

### **Additional Utilities**

- **UUID** `^11.1.0` - Universally unique identifier generation
- **RxJS** `^7.8.1` - Reactive extensions for JavaScript
- **Reflect Metadata** `^0.2.2` - Polyfill for metadata reflection API

## 🏗 Project Architecture

```
src/
├── auth/                           # Authentication Module
│   ├── dto/                       # Data Transfer Objects
│   │   └── auth-credentials.dto.ts
│   ├── auth.controller.ts         # Auth endpoints (signup/signin)
│   ├── auth.service.ts           # Auth business logic
│   ├── auth.module.ts            # Auth module configuration
│   ├── user.entity.ts            # User database entity
│   ├── users.repository.ts       # User database operations
│   ├── jwt.strategy.ts           # JWT Passport strategy
│   ├── jwt-payload.interface.ts  # JWT payload type
│   ├── auth-response.interface.ts# Auth response type
│   └── get-user.decorator.ts     # Custom user decorator
├── tasks/                         # Tasks Module
│   ├── dto/                      # Data Transfer Objects
│   │   ├── create-task.dto.ts
│   │   ├── get-tasks-filter.dto.ts
│   │   └── update-task-status.dto.ts
│   ├── tasks.controller.ts       # Task CRUD endpoints
│   ├── tasks.service.ts          # Task business logic
│   ├── tasks.module.ts           # Tasks module configuration
│   ├── task.entity.ts            # Task database entity
│   ├── tasks.repository.ts       # Task database operations
│   └── task-status.enum.ts       # Task status enumeration
├── config.schema.ts               # Environment validation schema
├── transform.interceptor.ts       # Response transformation
├── app.module.ts                  # Root application module
└── main.ts                        # Application entry point
```

## ✨ Key Features

- **JWT Authentication** - Secure login/signup with token-based auth
- **Password Security** - Bcrypt hashing with salt
- **Database Relations** - User-Task one-to-many relationship
- **Input Validation** - DTO validation with class-validator
- **Environment Config** - Joi schema validation for env variables
- **Response Transformation** - Consistent API responses
- **Error Handling** - Global exception filters
- **Logging** - Built-in NestJS logger
- **Testing** - Unit and E2E test configuration

## 🚀 How to Run the Project

### **Prerequisites**

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### **1. Clone the Repository**

```bash
git clone <your-repo-url>
cd task-management
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Database Setup**

Create a PostgreSQL database:

```bash
# Using psql command line
createdb taskmanagement

# Or using PostgreSQL GUI tools like pgAdmin
```

### **4. Environment Configuration**

Create environment files for different stages:

**`.env.stage.dev`** (Development)

```env
STAGE=dev
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=taskmanagement
JWT_SECRET=your-super-secret-jwt-key-here
```

**`.env.stage.prod`** (Production)

```env
STAGE=prod
DB_HOST=your_production_host
DB_PORT=5432
DB_USERNAME=your_prod_username
DB_PASSWORD=your_prod_password
DB_DATABASE=taskmanagement_prod
JWT_SECRET=your-production-jwt-secret
```

### **5. Run the Application**

**Development Mode** (with hot reload):

```bash
npm run start:dev
```

**Debug Mode**:

```bash
npm run start:debug
```

**Production Mode**:

```bash
npm run build
npm run start:prod
```

The API will be available at: `http://localhost:3000`

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Generate test coverage report
npm run test:cov

# Debug tests
npm run test:debug
```

## 🔧 Development Scripts

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Build the application
npm run build

# Start development server
npm run start:dev
```

## 📡 API Endpoints

### **Authentication**

- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

### **Tasks** (Protected - Requires JWT Token)

- `GET /tasks` - Get user's tasks (with filtering)
- `GET /tasks/:id` - Get specific task
- `POST /tasks` - Create new task
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete task

### **Usage Example**

```bash
# Register user
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "TestPass123"}'

# Login and get token
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "TestPass123"}'

# Create task (use token from login response)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Learn NestJS", "description": "Complete the tutorial"}'
```

## 🔒 Security Features

- **JWT Authentication** - Stateless token-based authentication
- **Password Hashing** - Bcrypt with salt for secure password storage
- **Input Validation** - DTO validation prevents malicious input
- **SQL Injection Protection** - TypeORM parameterized queries
- **User Authorization** - Users can only access their own tasks
- **Environment Variables** - Sensitive data stored in env files

## 🌐 Environment Variables

The application uses Joi validation to ensure all required environment variables are present:

| Variable      | Description                       | Required | Default |
| ------------- | --------------------------------- | -------- | ------- |
| `STAGE`       | Application stage (dev/prod/test) | Yes      | -       |
| `DB_HOST`     | PostgreSQL host                   | Yes      | -       |
| `DB_PORT`     | PostgreSQL port                   | Yes      | 5432    |
| `DB_USERNAME` | Database username                 | Yes      | -       |
| `DB_PASSWORD` | Database password                 | Yes      | -       |
| `DB_DATABASE` | Database name                     | Yes      | -       |
| `JWT_SECRET`  | JWT signing secret                | Yes      | -       |

## 📦 Production Deployment

The application is production-ready and can be deployed to:

- **Heroku** (with PostgreSQL addon)
- **AWS** (EC2 + RDS)
- **DigitalOcean** (App Platform + Managed Database)
- **Docker** containers
- **Any Node.js hosting platform**

## 📄 License

This project is licensed under UNLICENSED.
