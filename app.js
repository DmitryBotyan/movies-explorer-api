const express = require('express');
const mongoose = require('./node_modules/mongoose');
const router = require('./routes');
const bodyparser = require('./node_modules/body-parser');
const { cors } = require('./middlewares/cors');
const { errors } = require('./node_modules/celebrate');

const app = express();

mongoose
  .connect('mongodb://127.0.0.1/bitfilmsdb');

app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors);

app.use(router);

app.use(errors());

app.listen(3000, () => {});
