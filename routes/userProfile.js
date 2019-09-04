const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

router.get('/userProfile', (req, res, next) => {
    UserProfile.find()
        //.populate('product', 'email')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(422).json({
                error: err
            });
        });
});

router.post('/userProfile', (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const userProfile = new UserProfile({
                _id: mongoose.Types.ObjectId(),
                business: req.body.business,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                phoneNumber: req.body.phoneNumber,
                user: req.body.userId
            });
            return userProfile
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(422).json({
                        error: err
                    });
                });
        });
});

router.get('/userProfile/:Id', (req, res, next) => {
    UserProfile.findById(req.params.userProfileId)
        // .populate('user')
        .exec()
        .then(userProfile => {
            // if (!userProfile) {
            //     return res.status(404).json({
            //         message: 'User not found'
            //     });
            // }
            res.status(200).json({
                userProfile: userProfile,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/userProfile'
                }
            });
        })
        .catch(err => {
            res.status(422).json({
                error: err
            });
        });
});

router.delete('/userProfile/:Id', (req, res, next) => {
    UserProfile.remove({ _id: req.params.userProfileId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'UserProfile deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/userProfile',
                }
            });
        })
        .catch(err => {
            res.status(422).json({
                error: err
            });
        });
});


module.exports = router;