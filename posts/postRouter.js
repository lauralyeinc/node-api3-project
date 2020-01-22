const express = require('express');
const db = require('./postDb.js'); 
const router = express.Router();

router.get('/', (req, res) => {  // √
  db.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Error retrieveing the posts.'
    });
  });
});

router.get('/:id', (req, res) => {  // broken  & needs:  validatePostId
  const {id} = req.params; 

  db.getById(id)
  .then(posts => {
    if(posts.length > 0) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({
        message: 'The post with the specified ID does not exist'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'The post information could not be retrieved.'
    });
  }); 
});

router.delete('/:id',validatePostId, (req, res) => {  // √  //adding validatePostId √√
  const {id} = req.params;

  db.remove(id)
  .then(posts => {
    if(posts > 0) {
      res.status(200).json({message: 'The post has been removed.'});
    } else {
      res.status(404).json({
        message: 'The post with the specific ID does not exist.'
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: ' The post could not be removed.'
    });
  }); 
});


router.put('/:id', (req, res) => {   // broken &  needs: validatePostId
  const {id} = req.params;
  const post = req.body;
  
  db.update(id, post)
  .then(posts => {
    if(posts) {
    res.status(200).json(posts) 
  } else if(id) {
    res.status(404).json({
      message: 'The post with the specified ID does not exist.'
    });
  } else {
    res.status(400).json({
      message: 'Please provide title and contents for the post.'
    });
  }
})
  .catch(error => {
    res.status(500).json({
      message: 'The post information could not be modified.'
    });
  });
});


// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params;

  db.getById(id)
    .then(posts => {
      if (posts) {
        req.posts = posts; 
        next();
      } else {
        next(new Error('does not exist'));
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'exception', error
      });
    });
};

module.exports = router;
