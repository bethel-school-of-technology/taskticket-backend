const express = require('express');
const router = express.Router();
const Response = require('../models/Response');


//This get's back all the tasks
router.get('/', async (req, res) => {
    try {
        const response = await Response.find();
        res.json(response);
    } catch (err) {
        res.json({ message: err });
    }
});


//Submits all the tasks

router.post('/', async (req, res) => {
    const response = await new Response({
        title: req.body.title,
        description: req.body.description,
        requestNumber: req.body.requestNumber
    });
    try {
        const savedResponse = response.save();
        res.json(savedResponse);
    } catch (err) {
        res.json({ message: err })
    }
});



//Specific Task

router.get('/:responseId', async (req, res) => {
    try {
        const response = await Response.findById(req.params.responseId || req.user.isAdmin);
        res.json(response);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a specific task

router.delete('/:responseId', async (req, res) => {
    try {
        const removedResponse = await Response.remove({ _id: req.params.responseId || req.user.isAdmin });
        res.json(removedResponse);
    } catch (err) {
        res.json({ message: err });
    }
});


//Update a task
router.patch('/:responseId', async (req, res) => {
    try {
        const updatedResponse = await Response.updateOne({ _id: req.params.responseId || req.user.isAdmin },
            { $set: { title: req.body.title, description: req.body.description, } });
        res.json(updatedResponse);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;