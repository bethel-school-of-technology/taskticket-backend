const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



//Middleware
app.use(cors());
app.use(bodyParser.json());

//Importing the Routes
const requestRoute = require('./routes/request');
const responseRoute = require('./routes/response');
//const loginRoute = require('./routes/login');
//const signupRoute = require('./routes/signup');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
app.use('/request', requestRoute);
app.use('/response', responseRoute);
//app.use('/login', loginRoute);
//app.use('/signup', signupRoute);
app.use('/', authRoute);
app.use('/', userRoute);

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
dotenv.config();
//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => console.log('Connection successful'))
  .catch((err) => console.error(err));
mongoose.Promise = global.Promise;



module.exports = app;