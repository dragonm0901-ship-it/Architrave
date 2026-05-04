const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');

// Get all reviews
exports.getReviews = catchAsync(async (req, res, next) => {
  const result = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
  res.json(result.rows);
});

