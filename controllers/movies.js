const Movie = require('../models/movie');
const {
  ValidationError, DocumentNotFoundError, CreateUserError, CastError,
} = require('../middlewares/error');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  }).then((movie) => {
    res.status(200).send(movie);
  })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new ValidationError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new CreateUserError('Такой фильм уже добавлен'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((card) => {
      Movie.deleteOne(card)
        .orFail(() => {
          next(new DocumentNotFoundError('Объект не найден'));
        })
        .then((m) => {
          res.send(m);
        }).catch((err) => {
          if (err instanceof CastError) {
            next(new CastError('Невалидный идентификатор'));
          } else {
            next(err);
          }
        });
    });
};
