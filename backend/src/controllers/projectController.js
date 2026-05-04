const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');

// Get all projects
exports.getProjects = catchAsync(async (req, res, next) => {
  const result = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
  res.json(result.rows);
});

