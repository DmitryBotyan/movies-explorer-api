const mongoose = require('../node_modules/mongoose');
const validator = require('../node_modules/validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: [true, 'Поле country обязательно'],
  },
  director: {
    type: String,
    require: [true, 'Поле director обязательно'],
  },
  duration: {
    type: Number,
    require: [true, 'Поле duration обязательно'],
  },
  year: {
    type: String,
    require: [true, 'Поле year обязательно'],
  },
  description: {
    type: String,
    require: [true, 'Поле description обязательно'],
  },
  image: {
    type: String,
    require: [true, 'Поле image обязательно'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите ссылку',
    },
  },
  trailerLink: {
    type: String,
    require: [true, 'Поле trailerLink обязательно'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите ссылку',
    },
  },
  thumbnail: {
    type: String,
    require: [true, 'Поле thumbnail обязательно'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: [true, 'Поле owner обязательно'],
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, 'Поле movieId обязательно'],
  },
  nameRU: {
    type: String,
    require: [true, 'Поле nameRU обязательно'],
  },
  nameEN: {
    type: String,
    require: [true, 'Поле nameEN обязательно'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
