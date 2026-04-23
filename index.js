import express from 'express';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Get port from environment or use default
const PORT = process.env.PORT || 3001;

/**
 * MIDDLEWARE SETUP
 */

// Connect to MongoDB
connectDB();

// Body parser middleware - for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method override middleware - allows PUT and DELETE in HTML forms
app.use(methodOverride('_method'));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files middleware
app.use(express.static('./public'));

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * ROUTES
 */

// All student routes
app.use(studentRoutes);

// 404 - Not found route
app.use((req, res) => {
  res.status(404).render('error', {
    error: `Page not found: ${req.path}`,
  });
});

/**
 * ERROR HANDLING MIDDLEWARE
 */
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).render('error', {
    error: err.message || 'Internal Server Error',
  });
});

/**
 * START SERVER
 */
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`
    ✅ Server is running!
    🌍 Open your browser and visit: http://localhost:${PORT}
    Press Ctrl+C to stop the server
    `);
  });
};

startServer();
