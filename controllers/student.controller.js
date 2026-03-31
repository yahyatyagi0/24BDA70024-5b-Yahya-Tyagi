import Student from '../models/student.model.js';

// GET /students
export const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;
    const total = await Student.countDocuments();
    const students = await Student.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({ data: students, page, limit, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /students
export const createStudent = async (req, res) => {
  try {
    const { name, roll } = req.body;
    const student = new Student({ name, roll });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Roll number must be unique' });
    }
    res.status(400).json({ message: err.message });
  }
};

// GET /students/:id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

// PUT /students/:id
export const updateStudent = async (req, res) => {
  try {
    const { name, roll } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, roll },
      { new: true, runValidators: true }
    ).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /students/:id
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id).lean();
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};
