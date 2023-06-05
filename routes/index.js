const router = require('express').Router();
const usersRouter = require('./users');
const {
  createUser, login,
} = require('../controllers/users');
const {
  createUserValidation, loginValidation,
} = require('../validation/validation');
const { DocumentNotFoundError } = require('../middlewares/error');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use(auth);
router.use('/films', moviesRouter);
router.use('/users', usersRouter);
router.use('*', (res, req, next) => {
  next(new DocumentNotFoundError('Страница не найдена'));
});

module.exports = router;
