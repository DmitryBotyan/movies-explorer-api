const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { centralError } = require('./middlewares/centralError');

const {
  DATA_BASE_ADRESS = 'mongodb://127.0.0.1/bitfilmsdb',
  PORT = 3000,
} = process.env;

const app = express();

mongoose
  .connect(DATA_BASE_ADRESS);

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors);

app.use(requestLogger);

app.use(router);

app.use(limiter);

app.use(errorLogger);

app.use(errors());

app.use(centralError);

app.listen(PORT, () => {});
