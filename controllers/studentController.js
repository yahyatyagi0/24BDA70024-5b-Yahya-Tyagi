import Student from '../models/Student.js';

/**
 * GET all students
 * Route: GET /students
 */
export const getAllStudents = async (req, res) => {
  try {
    console.log('📖 Fetching all students...');
    const students = await Student.find().sort({ createdAt: -1 });

    res.render('index', {
      students,
      title: 'Student Management System',
    });
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(500).render('error', { error: error.message });
  }
};

/**
 * GET form to create a new student
 * Route: GET /students/new
 */
export const getCreateForm = (req, res) => {
  res.render('new', { title: 'Add New Student' });
};

/**
 * POST create a new student
 * Route: POST /students
 */
export const createStudent = async (req, res) => {
  try {
    const { name, email, rollNumber, department, semester, phoneNumber } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !rollNumber ||
      !department ||
      !semester ||
      !phoneNumber
    ) {
      return res.status(400).render('new', {
        error: 'All fields are required',
        title: 'Add New Student',
      });
    }

    console.log('✏️ Creating new student:', { name, email, rollNumber });

    // Create new student
    const student = new Student({
      name,
      email,
      rollNumber,
      department,
      semester,
      phoneNumber,
    });

    // Save to database
    await student.save();

    console.log('✅ Student created successfully:', student._id);
    res.redirect('/');
  } catch (error) {
    console.error('❌ Error creating student:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ');
      return res.status(400).render('new', {
        error: messages,
        title: 'Add New Student',
      });
    }

    // Handle duplicate email or roll number
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).render('new', {
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        title: 'Add New Student',
      });
    }

    res.status(500).render('error', { error: error.message });
  }
};

/**
 * GET form to edit a student
 * Route: GET /students/:id/edit
 */
export const getEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('📝 Fetching student to edit:', id);

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).render('error', {
        error: 'Student not found',
      });
    }

    res.render('edit', {
      student,
      title: 'Edit Student',
    });
  } catch (error) {
    console.error('❌ Error fetching student:', error);
    res.status(500).render('error', { error: error.message });
  }
};

/**
 * PUT update a student
 * Route: PUT /students/:id
 */
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rollNumber, department, semester, phoneNumber } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !rollNumber ||
      !department ||
      !semester ||
      !phoneNumber
    ) {
      const student = await Student.findById(id);
      return res.status(400).render('edit', {
        student,
        error: 'All fields are required',
        title: 'Edit Student',
      });
    }

    console.log('🔄 Updating student:', id);

    // Update student
    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, rollNumber, department, semester, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).render('error', {
        error: 'Student not found',
      });
    }

    console.log('✅ Student updated successfully:', id);
    res.redirect('/');
  } catch (error) {
    console.error('❌ Error updating student:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const student = await Student.findById(req.params.id);
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ');
      return res.status(400).render('edit', {
        student,
        error: messages,
        title: 'Edit Student',
      });
    }

    // Handle duplicate email or roll number
    if (error.code === 11000) {
      const student = await Student.findById(req.params.id);
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).render('edit', {
        student,
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        title: 'Edit Student',
      });
    }

    res.status(500).render('error', { error: error.message });
  }
};

/**
 * DELETE a student
 * Route: DELETE /students/:id
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deleting student:', id);

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).render('error', {
        error: 'Student not found',
      });
    }

    console.log('✅ Student deleted successfully:', id);
    res.redirect('/');
  } catch (error) {
    console.error('❌ Error deleting student:', error);
    res.status(500).render('error', { error: error.message });
  }
};

/**
 * GET view a single student
 * Route: GET /students/:id
 */
export const viewStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('👁️ Viewing student:', id);

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).render('error', {
        error: 'Student not found',
      });
    }

    res.render('view', {
      student,
      title: `Student - ${student.name}`,
    });
  } catch (error) {
    console.error('❌ Error viewing student:', error);
    res.status(500).render('error', { error: error.message });
  }
};
