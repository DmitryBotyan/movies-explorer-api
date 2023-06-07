const express = require('express');
const mongoose = require('./node_modules/mongoose');
// eslint-disable-next-line import/extensions
const helmet = require('./node_modules/helmet');
const router = require('./routes');
const bodyparser = require('./node_modules/body-parser');
const { cors } = require('./middlewares/cors');
const { errors } = require('./node_modules/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const app = express();

mongoose
  .connect('mongodb://127.0.0.1/bitfilmsdb');

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(limiter);

app.use(helmet());

app.use(cors);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Что-то пошло не так...'
      : message,
  });
  next();
});

app.listen(3000, () => {});
