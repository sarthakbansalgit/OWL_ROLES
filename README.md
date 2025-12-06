# 🦉 OWL ROLES - Job Portal Platform

A modern, full-stack job portal platform built with **React**, **Node.js**, **Express**, and **MongoDB**. OWL ROLES connects job seekers with companies, providing a seamless experience for job searching, applications, and recruitment.

## 🌟 Features

### For Job Seekers
- ✅ Browse and search jobs with advanced filters
- ✅ Apply to jobs with one click
- ✅ Manage profile and skills
- ✅ Track applied jobs
- ✅ View detailed job descriptions
- ✅ Read company information
- ✅ Learning resources and career guidance

### For Recruiters
- ✅ Post and manage job listings
- ✅ View and manage applicants
- ✅ Company profile management
- ✅ Track application status
- ✅ Analytics and reporting

### For Super Admin
- ✅ Manage all users (job seekers, recruiters, companies)
- ✅ Monitor platform activity
- ✅ Analytics dashboard with charts
- ✅ System management and oversight

### General Features
- 🎨 Modern light gradient UI (Blue → Purple → Pink)
- 📱 Fully responsive design (Mobile, Tablet, Desktop)
- 🔐 JWT Authentication with secure login/signup
- 🎯 Advanced filtering and search capabilities
- 📊 Data visualization with charts
- ⚡ Optimized performance with caching
- 🔔 Real-time notifications
- 📝 Blog and learning platform

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.2
- **Build Tool:** Vite 5.2
- **Styling:** Tailwind CSS 3.4 + Custom CSS
- **State Management:** Redux + Redux Persist
- **HTTP Client:** Axios
- **UI Components:** Radix UI, Lucide Icons, Shadcn/ui
- **Forms:** React Quill (Rich Text Editor)
- **Testing:** Vitest, React Testing Library
- **Animations:** Framer Motion, Custom CSS animations

### Backend
- **Runtime:** Node.js
- **Framework:** Express 4.19
- **Database:** MongoDB 8.4 (Mongoose)
- **Authentication:** JWT (jsonwebtoken)
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer
- **Caching:** Redis
- **API Documentation:** Swagger/OpenAPI
- **Testing:** Jest, Supertest
- **Security:** Helmet, Express Rate Limit, CORS

### DevOps
- **Containerization:** Docker + Docker Compose
- **Version Control:** Git
- **CI/CD:** GitHub Actions

## 📋 Project Structure

```
OWL_ROLES/
├── frontend/                      # React application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── redux/               # State management
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   ├── assets/              # Images and static files
│   │   └── App.jsx              # Main app component
│   ├── package.json
│   └── vite.config.js
│
├── backend/                       # Node.js/Express server
│   ├── controllers/              # Business logic
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # API endpoints
│   ├── middlewares/              # Custom middlewares
│   ├── utils/                    # Helper functions
│   ├── docs/                     # Swagger documentation
│   ├── __tests__/               # Test files
│   ├── package.json
│   └── index.js                  # Entry point
│
├── docker-compose.yaml           # Docker configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sarthakbansalgit/OWL_ROLES.git
cd OWL_ROLES
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

### Environment Setup

#### Backend (.env)
Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Redis
REDIS_URL=redis://localhost:6379

# Frontend URL
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env.local)
Create a `.env.local` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Running the Application

#### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:3000`

**Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```
App runs on: `http://localhost:5173`

#### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

### Docker Setup

Run the entire application with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`

## 🔑 Key API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/profile` - Get user profile
- `POST /api/v1/user/logout` - Logout user

### Jobs
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/:id` - Get job by ID
- `POST /api/v1/job/post` - Create new job (Recruiter)
- `PUT /api/v1/job/:id` - Update job (Recruiter)
- `DELETE /api/v1/job/:id` - Delete job (Recruiter)

### Applications
- `POST /api/v1/application/apply` - Apply to job
- `GET /api/v1/application/get` - Get applications
- `GET /api/v1/application/:id/applicants` - Get job applicants (Recruiter)

### Companies
- `GET /api/v1/company/get` - Get all companies
- `GET /api/v1/company/:id` - Get company by ID
- `POST /api/v1/company/register` - Register company (Recruiter)
- `PUT /api/v1/company/:id` - Update company (Recruiter)

### Blog
- `GET /api/v1/blog/posts` - Get all blog posts
- `POST /api/v1/blog/posts` - Create blog post (Authenticated)
- `GET /api/v1/blog/posts/:id` - Get blog post by ID
- `POST /api/v1/blog/posts/:id/comments` - Add comment (Authenticated)

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

### Run Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## 📊 Available Routes

### User Routes (`/api/v1/user`)
- Register, Login, Logout
- Get Profile, Update Profile
- Get Suggested Jobs

### Job Routes (`/api/v1/job`)
- Get All Jobs, Get Job by ID
- Post Job, Update Job, Delete Job
- Admin job management

### Company Routes (`/api/v1/company`)
- Get All Companies, Get by ID
- Register Company, Update Company
- Get Company Jobs

### Application Routes (`/api/v1/application`)
- Apply to Job, Get Applications
- Get Applicants (for jobs)
- Update Application Status

### Blog Routes (`/api/v1/blog`)
- Get Posts, Create Post
- Get Post by ID, Delete Post
- Comments on Posts

### Admin Routes (`/api/v1/admin`)
- User Management
- Analytics and Dashboard
- System Statistics

## 🎨 UI/UX Features

- **Modern Design:** Light gradient theme with purple-pink accent
- **Responsive Layout:** Mobile-first approach with Tailwind CSS breakpoints
- **Interactive Animations:** Smooth transitions and micro-interactions
- **Loading States:** Skeleton screens and loading indicators
- **Error Handling:** User-friendly error messages with toasts
- **Accessibility:** ARIA labels and semantic HTML

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- CORS protection
- Helmet.js for HTTP headers
- Input validation and sanitization
- Secure file uploads with Cloudinary
- Environment variable protection

## 📈 Performance

- **Frontend:** Optimized builds with Vite
- **Caching:** Redis for database query caching
- **Lazy Loading:** Code splitting and dynamic imports
- **Image Optimization:** Cloudinary integration
- **Tree Shaking:** Unused code elimination
- **Minification:** Production-ready builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

**

*Last Updated: December 2025*
