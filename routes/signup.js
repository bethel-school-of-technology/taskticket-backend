const express = require('express');
const router = express.Router();
const SignUp = require('../models/Signup');


//Signup route get
router.get('/', (req, res) => {
    res.send('We are on signup');
});

//Submits all the signups


//Specific signup
router.get('/id', (req, res) => {
    res.send('specific login user');
});

//Delete a specific signup (user)


//Update a signup (user)


module.exports = router;