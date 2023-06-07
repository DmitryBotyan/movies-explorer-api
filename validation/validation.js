const { Joi, celebrate } = require('../node_modules/celebrate');

const urlRegex = /[-a-zA-A0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-A0-9@:%_+.~#?&//=]*)?/i;

const createUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    thumbnail: Joi.string().required().regex(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  idValidation,
  createMovieValidation,
};
