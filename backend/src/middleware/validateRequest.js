const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: e.errors.map(err => ({
        path: err.path[1], // body.name -> name
        message: err.message
      }))
    });
  }
};

module.exports = validate;
