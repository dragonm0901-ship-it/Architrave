const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');

// Post a contact submission
exports.createContactSubmission = catchAsync(async (req, res, next) => {
  const { name, email, message } = req.body;

  const query = 'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, email, message];
  const result = await db.query(query, values);
  res.status(201).json({ status: 'success', data: result.rows[0] });
});

