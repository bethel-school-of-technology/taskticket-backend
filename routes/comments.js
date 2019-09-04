const express = require('express');
const router = express.Router();
const Comments = require('../models/Comments');


//This get's back all the tasks
router.get('/', async (req, res) => {
    try {
        const comments = await Comments.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});


//Submits all the tasks

router.post('/', async (req, res) => {
    const comments = await new Comments({
        commentsId: req.body.commentsId,
        requestId: req.body.requestId,
        message: req.body.message
    });
    try {
        const savedComments = comments.save();
        res.json(savedComments);
    } catch (err) {
        res.json({ message: err })
    }
});



//Specific Task

router.get('/:CommentsId', async (req, res) => {
    try {
        const comments = await Comments.findById(req.params.commentsId  );
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a specific task

router.delete('/:commentsId', async (req, res) => {
    try {
        const removedComments = await Comments.remove({ _id: req.params.commentsId });
        res.json(removedComments);
    } catch (err) {
        res.json({ message: err });
    }
});


//Update a task
router.patch('/:commentsId', async (req, res) => {
    try {
        const updatedComments = await Comments.updateOne({ _id: req.params.commentsId  },
            { $set: { commentsId: req.body.commentsId, requestId: req.body.requestId, message: req.body.message } });
        res.json(updatedComments);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;