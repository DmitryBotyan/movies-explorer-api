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
    movieId,
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
    owner: req.user._id,
    nameRU,
    nameEN,
    movieId,
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
    .populate('owner')
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
    .then((movie) => {
      if (movie.owner.toJSON() === req.user._id) {
        Movie.deleteOne(movie)
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
      } else {
        res.send({
          message: 'Нельзя удалить чужой фильм',
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
