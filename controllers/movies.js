const Movie = require('../models/movie');
const { ValidationError } = require('../utils/errors/ValidationError');
const { DocumentNotFoundError } = require('../utils/errors/DocumentNotFoundError');
const { CastError } = require('../utils/errors/CastError');

const {
  VALIDATION_ERROR, NOT_FOUND, CAST_ERROR, FILM_DELETE, FILM_DELETE_ERROR,
} = require('../utils/constants');

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
        next(new ValidationError(VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
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
            next(new DocumentNotFoundError(NOT_FOUND));
          })
          .then(() => {
            res.send(FILM_DELETE);
          }).catch((err) => {
            if (err instanceof CastError) {
              next(new CastError(CAST_ERROR));
            } else {
              next(err);
            }
          });
      } else {
        res.status(403).send(FILM_DELETE_ERROR);
      }
    })
    .catch((err) => {
      next(err);
    });
};
