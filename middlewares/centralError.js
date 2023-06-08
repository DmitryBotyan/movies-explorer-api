const { DEFAULT_ERROR } = require('../utils/constants');

const centralError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? DEFAULT_ERROR
      : message,
  });
  next();
};

module.exports = { centralError };
