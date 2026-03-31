import express from 'express';
import Student from '../models/student.model.js';

const router = express.Router();

// List view
router.get('/', async (req, res) => {
  const students = await Student.find().sort({ roll: 1 }).lean();
  res.render('students/index', { students });
});

// Show create form handled on index as inline form

// Edit form
router.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id).lean();
  if (!student) return res.redirect('/view/students');
  res.render('students/edit', { student });
});

// Create via form
router.post('/', async (req, res) => {
  try {
    const { name, roll } = req.body;
    await Student.create({ name, roll });
    res.redirect('/view/students');
  } catch (err) {
    res.redirect('/view/students');
  }
});

// Update via form
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, roll } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, roll }, { runValidators: true });
    res.redirect('/view/students');
  } catch (err) {
    res.redirect('/view/students');
  }
});

// Delete via form
router.post('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/view/students');
  } catch (err) {
    res.redirect('/view/students');
  }
});

export default router;
