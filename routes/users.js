const usersRouter = require('express').Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../validation/validation');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;
