const express = require('express');
const db = require('./userDb.js'); 
const router = express.Router();

router.post('/', (req, res) => {
  const User = req.body; 
  db.insert(User)
  .then(users => {
    if(users) {
      res.status(201).json(users);
    } else {
      res.status(400).json({
        message: 'Please provide name of user.'
      });
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: ' There was an error while saving the user to the database.'
    });
  });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
