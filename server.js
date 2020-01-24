const express = require('express');
const postsRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js'); 
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2> 👩🏼‍🎤 Let's write some middleware!</h2>`);
});

// express routes 
server.use('/api/posts', postsRouter); 
server.use('/api/users', userRouter); 

//custom middleware
server.use(express.json());
server.use(logger); 

function logger(req, res, next) {
  console.log(` [${new Date().toISOString()}]
  ${req.method} to ${req.url} ${req.get('Origin')}`);
  next(); 
}

module.exports = server;
