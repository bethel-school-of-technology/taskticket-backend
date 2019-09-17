const express = require('express');
const router = express.Router();
const Request = require('../models/Request');


//This get's back all the tasks
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.json({ message: err });
  }
});


//Submits all the tasks

router.post('/', async (req, res) => {
  const request = await new Request({
    item: req.body.item,
    description: req.body.description,
    urgency: req.body.urgency
  });
  return request
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


//Specific Task

router.get('/:requestId', async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);
    res.json(request);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a specific task

router.delete('/:requestId', async (req, res) => {
  try {
    const removedRequest = await Request.remove({ _id: req.params.requestId });
    res.json(removedRequest);
  } catch (err) {
    res.json({ message: err });
  }
});


//Update a task
router.patch('/:requestId', async (req, res) => {
  try {
    const updatedRequest = await Request.updateOne({ _id: req.params.requestId },
      { $set: { item: req.body.item, description: req.body.description, urgency: req.body.urgency } });
    res.json(updatedRequest);
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;