const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, idValidation } = require('../validation/validation');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', createMovieValidation, createMovie);
moviesRouter.delete('/movies/:id', idValidation, deleteMovie);

module.exports = moviesRouter;
