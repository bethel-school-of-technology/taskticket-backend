const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userValidation } = require('../validation');
const { loginValidation } = require('../validation');
//const { adminValidation} = require('../validation');


//Create a new User
router.post('/user', async (req, res) => {
    //Validating the data before we create a user
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if a user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const user = new User({
        business: req.body.business,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    });
    if (req.body.isAdmin === true) {
        User.isAdmin = true;
    }
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});


//Login route

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const login = await User.findOne({ email: req.body.email });
    if (!login) return res.status(400).send('Email or password is wrong!');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, login.password);
    if (!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({ _id: login._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Logged in');
});

// logout route

router.get('/logout', function (req, res) {
    res.status(401).send('Logged out')
    //or res.status(401).end() to force the user to log in on next visit
});


module.exports = router