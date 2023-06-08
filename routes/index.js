const router = require('express').Router();
const usersRouter = require('./users');
const {
  createUser, login,
} = require('../controllers/users');
const {
  createUserValidation, loginValidation,
} = require('../utils/validation');
const { DocumentNotFoundError } = require('../utils/errors/DocumentNotFoundError');
const { PAGE_NOT_FOUND, SERVER_CRASH } = require('../utils/constants');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_CRASH);
  }, 0);
});
router.use(auth);
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.use('*', (res, req, next) => {
  next(new DocumentNotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
