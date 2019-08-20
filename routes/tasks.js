const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


//This get's back all the tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.json({ message: err });
    }
});


//Submits all the tasks
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        res.json({ message: err })
    }
});


//Specific Task

router.get('/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        res.json(task);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a specific task

router.delete('/:taskId', async (req, res) => {
    try {
        const removedTask = await Task.remove({ _id: req.params.taskId });
        res.json(removedTask);
    } catch (err) {
        res.json({ message: err });
    }
});


//Update a task
router.patch('/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.updateOne({ _id: req.params.taskId },
            { $set: { title: req.body.title } });
        res.json(updatedTask);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;