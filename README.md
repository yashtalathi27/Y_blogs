# Y_blogs

Y_blogs is a full-stack blogging platform that allows users to create, edit, and share blogs, comment on posts, and authenticate using Google. The project is built with a React + Vite frontend and a Node.js/Express backend, with cloud storage and email verification features.

## Description
Y_blogs provides a modern blogging experience with a clean UI, secure authentication, and real-time interactions. Users can register, log in with Google, write blogs, edit or delete their posts, comment on others' blogs, and manage their profiles. The backend supports image uploads, email verification, and robust data management.

## Getting Started

1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd Y_blogs
   ```
2. Install dependencies for both frontend and backend:
   ```powershell
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Configure environment variables (see below).
4. Start the backend server:
   ```powershell
   npm run dev
   ```
5. Start the frontend development server:
   ```powershell
   cd ../frontend
   npm run dev
   ```

## .env Configuration
Create a `.env` file in the `backend` directory with the following variables:
```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
FIREBASE_API_KEY=<your_firebase_api_key>
FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
FIREBASE_APP_ID=<your_firebase_app_id>
EMAIL_USER=<your_email_address>
EMAIL_PASS=<your_email_password>
```

## Features
- User registration and login (Google OAuth)
- Email verification for new users
- Create, edit, and delete blogs
- Upload images to Cloudinary
- Comment on blogs
- View and edit user profile
- Secure JWT-based authentication
- Responsive UI with Tailwind CSS
- Real-time updates for comments
- Error handling and notifications

## Project Structure
- `frontend/` - React + Vite frontend
- `backend/` - Node.js/Express backend
- `uploads/` - Uploaded images
- `configration/` - Configuration files (Cloudinary, Firebase, DB)
- `controller/` - Route controllers
- `middleware/` - Auth middleware
- `model/` - Mongoose schemas
- `routes/` - API routes
- `utils/` - Utility functions

## Utils
- `googleSlice.js` - Handles Google authentication state
- `blogSlice.js` - Blog state management
- `commentSlice.js` - Comment state management
- `formatDate.js` - Date formatting utility
- `multer.js` - File upload middleware
- `generateToken.js` - JWT token generation

## Contributing
Feel free to open issues or submit pull requests. Contributions are welcome!

