const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');

// Get all services
exports.getServices = catchAsync(async (req, res, next) => {
  const result = await db.query('SELECT * FROM services ORDER BY service_id ASC');
  res.json(result.rows);
});

