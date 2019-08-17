const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;