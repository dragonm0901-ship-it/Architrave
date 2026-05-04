const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  console.error('ERROR 💥', err);

  res.status(statusCode).json({
    status: status,
    message: err.message || 'Internal Server Error',
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
