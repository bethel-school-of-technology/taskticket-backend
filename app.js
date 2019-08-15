var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('We are on home');
  });
  
module.exports = app;