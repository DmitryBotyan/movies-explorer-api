const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CreateError } = require('../utils/errors/CreateError');
const { ValidationError } = require('../utils/errors/ValidationError');
const { DocumentNotFoundError } = require('../utils/errors/DocumentNotFoundError');

const { VALIDATION_ERROR, REGISTER_ERROR, NOT_FOUND } = require('../utils/constants');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const { name } = req.body;
    User.create({
      name,
      email: req.body.email,
      password: hash,
    }).then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
      .catch((err) => {
        if (err.code === 11000) {
          next(new CreateError(REGISTER_ERROR));
        } else {
          next(err);
        }
      });
  })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ValidationError(VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new DocumentNotFoundError(NOT_FOUND));
    })
    .then((user) => {
      res.send(user);
    }).catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => {
      next(new DocumentNotFoundError(NOT_FOUND));
    })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ValidationError(VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};
