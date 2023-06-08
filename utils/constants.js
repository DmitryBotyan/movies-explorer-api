const VALIDATION_ERROR = 'Переданы некорректные данные';

const REGISTER_ERROR = 'Такой пользователь уже существует';

const NOT_FOUND = 'Объект не найден';

const CAST_ERROR = 'Невалидный идентификатор';

const NEED_AUTHORIZE = 'Необходима авторизация';

const INVALID_EMAIL_OR_PASS = 'Неправильные почта или пароль';

const FILM_DELETE = 'Фильм удален';

const FILM_DELETE_ERROR = 'Нельзя удалить чужой фильм';

const DEFAULT_ERROR = 'Что-то пошло не так...';

const PAGE_NOT_FOUND = 'Страница не найдена';

const SERVER_CRASH = 'Сервер сейчас упадет';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3001',
  'http://localhost:3000',
];

module.exports = {
  VALIDATION_ERROR,
  REGISTER_ERROR,
  NOT_FOUND,
  CAST_ERROR,
  NEED_AUTHORIZE,
  INVALID_EMAIL_OR_PASS,
  FILM_DELETE,
  FILM_DELETE_ERROR,
  DEFAULT_ERROR,
  PAGE_NOT_FOUND,
  SERVER_CRASH,
  allowedCors,
};
