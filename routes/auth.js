const router = require('express').Router();
const Signup = require('../models/Signup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { signupValidation } = require('../validation');
const { loginValidation } = require('../validation');

// Sign up route
router.post('/signup', async (req, res) => {
    //Validating the data before we create a user
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if a user is already in the database
    const emailExist = await Signup.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const signup = new Signup({
        business: req.body.business,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedSignup = await signup.save();
        res.send(savedSignup);
    } catch (err) {
        res.status(400).send(err);
    }
});


//Login route

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const login = await Signup.findOne({ email: req.body.email });
    if (!login) return res.status(400).send('Email or password is wrong!');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, login.password);
    if (!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({ _id: login._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Logged in');
});


module.exports = router