const jwt = require('../node_modules/jsonwebtoken');
const { AuthError } = require('./error');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new AuthError('Необходима авторизация'));
    }

    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch {
      next(new AuthError('Необходима авторизация'));
    }
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};

module.exports = { auth };
