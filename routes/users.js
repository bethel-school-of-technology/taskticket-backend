const express = require('express');
const router = express.Router();
const User = require('../models/User');


//Signup route get
router.get('/', (req, res) => {
    res.send('We are on users');
});

//Submits all the signups


//Specific signup
router.get('/id', (req, res) => {
    res.send('specific login user');
});

//Delete a specific signup (user)


//Update a signup (user)


module.exports = router;