import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import apiStudentRoutes from './routes/student.routes.js';
import viewStudentRoutes from './routes/student.view.routes.js';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to DB
connectDB();

// Routes
app.use('/students', apiStudentRoutes);
app.use('/view/students', viewStudentRoutes);

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/view/students');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
