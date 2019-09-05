const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comments = require('../models/Comments');
const Request = require('../models/Request');


//Gets all comments
router.get('/', (req, res, next) => {
    Comments.find()
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


//Creates a new comment for a request with a specific Id

router.post('/', (req, res, next) => {
    Request.findById(req.body.requestId)
        .then(request => {
            if (!request) {
                return res.status(404).json({
                    message: 'Request not found'
                });
            }
            const comments = new Comments({
                _id: mongoose.Types.ObjectId(),
                response: req.body.response,
                request: req.body.requestId
            });
            return comments
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

router.get('/:id', (req, res, next) => {
    return Comments.findById(req.params.id)
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
router.delete('/:id', (req, res, next) => {
    return Comments.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(next);
});



//Update a comment
router.patch('/:id', async (req, res) => {
    try {
        const updatedComments = await Comments.updateOne({ _id: req.params.id },
            { $set: { response: req.body.response } });
        res.json(updatedComments);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;