import express from 'express';
import * as studentCtrl from '../controllers/student.controller.js';

const router = express.Router();

router.get('/', studentCtrl.getStudents);
router.post('/', studentCtrl.createStudent);
router.get('/:id', studentCtrl.getStudentById);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

export default router;
