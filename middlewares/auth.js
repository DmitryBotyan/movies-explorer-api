const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors/AuthError');
const { NEED_AUTHORIZE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new AuthError(NEED_AUTHORIZE));
    }

    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch {
      next(new AuthError(NEED_AUTHORIZE));
    }
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthError(NEED_AUTHORIZE));
  }
};

module.exports = { auth };
