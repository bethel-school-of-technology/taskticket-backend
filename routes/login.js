const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const verify = require('./verifyToken');

//Login route get
router.get('/', verify, (req, res) => {
    res.send('We are on login');
});

//Get a user with a certain id
router.get('/id', (req, res) => {
    res.send('specific login user');
});

module.exports = router;