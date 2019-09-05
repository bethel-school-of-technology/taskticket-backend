const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

//Get all UserProfile
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


//create a new Profile for an specific user with a specific Id

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

// //Get one userProfile with a specific Id

router.get('/userProfile/:id', (req, res, next) => {
    return UserProfile.findById(req.params.id)
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(422).json({
                error: err
            });
        });
});


//Deletes one userProfile

router.delete('/userProfile/:id', (req, res, next) => {
    return UserProfile.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

// //Update a comment
// router.patch('/:commentsId', async (req, res) => {
//     try {
//         const updatedComments = await Comments.updateOne({ _id: req.params.commentsId },
//             { $set: { commentsId: req.body.commentsId, requestId: req.body.requestId, message: req.body.message } });
//         res.json(updatedComments);
//     } catch (err) {
//         res.json({ message: err });
//     }
// })


module.exports = router;