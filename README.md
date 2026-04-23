# Yahya Tyagi
# 24bda70024

# 🎓 Student Management System


A full-featured CRUD (Create, Read, Update, Delete) application built with Node.js, Express, MongoDB, and EJS. This project demonstrates modern web development practices using the MVC (Model-View-Controller) architectural pattern.

## 📋 Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Architecture Explained](#project-architecture-explained)
- [API Endpoints](#api-endpoints)
- [Learning Resources](#learning-resources)

## 🏗️ Project Structure

```
├── config/
│   └── db.js                    # Database connection configuration
├── models/
│   └── Student.js               # MongoDB Student schema
├── controllers/
│   └── studentController.js      # Business logic for all CRUD operations
├── routes/
│   └── studentRoutes.js          # URL route definitions
├── views/
│   ├── layout.ejs              # Master layout template
│   ├── index.ejs               # List all students
│   ├── new.ejs                 # Form to create new student
│   ├── edit.ejs                # Form to edit student
│   ├── view.ejs                # View single student details
│   └── error.ejs               # Error page
├── public/                      # Static files (CSS, images, JS)
├── index.js                    # Main server file
├── package.json                # Project dependencies
└── .env                        # Environment variables
```

## ✨ Features

✅ **Create Students** - Add new student records with validation
✅ **Read Students** - View all students in a table or view individual details
✅ **Update Students** - Edit existing student information
✅ **Delete Students** - Remove student records with confirmation
✅ **Data Validation** - Server-side validation for all inputs
✅ **Error Handling** - Comprehensive error messages and handling
✅ **Responsive Design** - Beautiful UI that works on all devices
✅ **Database Persistence** - All data stored securely in MongoDB

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Frontend**: EJS (Embedded JavaScript Templating)
- **Styling**: CSS3
- **Development Tools**: Nodemon (auto-reload)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd 24BDA70024-5b-Yahya-Tyagi
   ```

2. **Install dependencies** (already done, but if needed):
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas**
   - Create an account at https://www.mongodb.com/cloud/atlas
   - Create a new cluster (free tier)
   - Get your connection string
   - Save it in your `.env` file

4. **Update .env file**
   ```
   PORT=3001
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studentdb
   ```

5. **Start the server**
   ```bash
   npm run dev    # Development mode (auto-reload with Nodemon)
   # OR
   npm start      # Production mode
   ```

6. **Open in browser**
   ```
   http://localhost:3001
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Port number for the server
PORT=3001

# MongoDB Atlas Connection String
# Format: mongodb+srv://username:password@cluster.mongodb.net/dbname
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/studentdb
```

**⚠️ Important**: Never commit `.env` file to Git! It's already in `.gitignore`.

## 🏛️ Project Architecture Explained

### Model-View-Controller (MVC) Pattern

Our project follows the MVC pattern, which separates the application into three interconnected components:

#### 1. **Model** (`models/Student.js`)
- Defines the data structure (schema) for MongoDB
- Validates data before saving to database
- Handles database queries

**Example Structure:**
```javascript
{
  name: String,
  email: String,
  rollNumber: String,
  department: String,
  semester: Number,
  phoneNumber: String
}
```

#### 2. **View** (`views/*.ejs`)
- EJS templates that generate HTML for the browser
- Displays data to users
- Contains forms for user input

**Files:**
- `layout.ejs` - Main page structure
- `index.ejs` - List all students
- `new.ejs` - Add student form
- `edit.ejs` - Edit student form
- `view.ejs` - Student details

#### 3. **Controller** (`controllers/studentController.js`)
- Contains business logic
- Handles requests from routes
- Interacts with models
- Sends responses to views

**Functions:**
- `getAllStudents()` - GET all students
- `getCreateForm()` - Show new student form
- `createStudent()` - CREATE new student
- `getEditForm()` - Show edit form
- `updateStudent()` - UPDATE student
- `deleteStudent()` - DELETE student
- `viewStudent()` - VIEW single student

#### 4. **Routes** (`routes/studentRoutes.js`)
- Maps URL endpoints to controller functions
- Defines HTTP methods (GET, POST, PUT, DELETE)

**Routes:**
```
GET    /                    → List all students
GET    /students/new        → Show create form
POST   /students            → Save new student
GET    /students/:id        → View student details
GET    /students/:id/edit   → Show edit form
PUT    /students/:id        → Update student
DELETE /students/:id        → Delete student
```

#### 5. **Config** (`config/db.js`)
- Handles database connection
- Centralized configuration

## 📡 API Endpoints

### List All Students
```
GET /
Response: Renders index.ejs with all students
```

### Show Create Form
```
GET /students/new
Response: Renders new.ejs with empty form
```

### Create New Student
```
POST /students
Body: {
  name: "John Doe",
  email: "john@example.com",
  rollNumber: "24BDA70024",
  department: "CSE",
  semester: 5,
  phoneNumber: "9876543210"
}
Response: Redirects to / (home page)
```

### View Student Details
```
GET /students/:id
Response: Renders view.ejs with student details
```

### Show Edit Form
```
GET /students/:id/edit
Response: Renders edit.ejs with pre-filled student data
```

### Update Student
```
PUT /students/:id
Body: { ... updated fields ... }
Response: Redirects to / (home page)
```

### Delete Student
```
DELETE /students/:id
Response: Redirects to / (home page)
```

## 📚 Learning Resources

### Understanding Each Component

**1. Database Connection**
- Learn how we connect to MongoDB using Mongoose
- Understand connection pooling and error handling

**2. Schema & Validation**
- See how Mongoose schemas define data structure
- Learn about built-in validation (required, email format, etc.)

**3. CRUD Operations**
- Create: `Student.create()` or `new Student().save()`
- Read: `Student.find()` and `Student.findById()`
- Update: `Student.findByIdAndUpdate()`
- Delete: `Student.findByIdAndDelete()`

**4. Error Handling**
- Validation errors from schema
- Duplicate key errors (unique fields)
- Not found errors (404)
- Server errors (500)

**5. View Templating**
- How EJS renders dynamic content
- Looping through arrays with `<% %>`
- Conditional rendering with `<% if %>`
- Interpolating variables with `<%= %>`

## 🔧 Customization Ideas

1. **Add more fields to students** (e.g., GPA, date of birth, address)
2. **Add search functionality** - Filter students by name or department
3. **Add authentication** - Login for admin users
4. **Add pagination** - Show limited students per page
5. **Add sorting** - Sort by name, roll number, semester
6. **Add file uploads** - Upload student photo or documents
7. **Add reporting** - Generate PDF or Excel reports
8. **Add email notifications** - Send confirmation emails

## 🐛 Troubleshooting

### Connection Error: ECONNREFUSED
- Check your MongoDB Atlas network access settings
- Ensure your IP is whitelisted
- Verify MONGO_URI in .env file

### Port Already in Use
```bash
# Change PORT in .env file to a different number (e.g., 3002)
```

### Module Not Found
```bash
npm install    # Reinstall all dependencies
```

## 📝 Notes

- All student email addresses and roll numbers must be unique
- Phone numbers must be exactly 10 digits
- Department must be one of: CSE, ECE, ME, CE, EE, BT
- Semester must be between 1-8
- All fields are required

## 🎓 Next Steps

1. Try adding a new student and exploring the system
2. Check the browser console and terminal logs to understand the flow
3. Modify the views to customize the design
4. Add new fields to the Student model
5. Implement search or filter functionality
6. Deploy to a hosting platform (Vercel, Render, Railway)

---

**Happy Learning! 🚀**
