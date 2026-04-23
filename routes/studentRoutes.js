import express from 'express';
import {
  getAllStudents,
  getCreateForm,
  createStudent,
  getEditForm,
  updateStudent,
  deleteStudent,
  viewStudent,
} from '../controllers/studentController.js';

const router = express.Router();

/**
 * Route: GET /
 * Description: Display all students
 * View: index.ejs
 */
router.get('/', getAllStudents);

/**
 * Route: GET /students/new
 * Description: Show form to create a new student
 * View: new.ejs
 */
router.get('/students/new', getCreateForm);

/**
 * Route: POST /students
 * Description: Create a new student
 * Redirects to: /
 */
router.post('/students', createStudent);

/**
 * Route: GET /students/:id
 * Description: View a single student details
 * View: view.ejs
 */
router.get('/students/:id', viewStudent);

/**
 * Route: GET /students/:id/edit
 * Description: Show form to edit a student
 * View: edit.ejs
 */
router.get('/students/:id/edit', getEditForm);

/**
 * Route: PUT /students/:id
 * Description: Update a student
 * Redirects to: /
 */
router.put('/students/:id', updateStudent);

/**
 * Route: DELETE /students/:id
 * Description: Delete a student
 * Redirects to: /
 */
router.delete('/students/:id', deleteStudent);

export default router;
