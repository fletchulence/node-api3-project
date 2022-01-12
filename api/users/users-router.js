const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model');
// The middleware functions also need to be required
const { 
  logger,
  validatePost,
  validateUser,
  validateUserId,
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const allUsers = await User.get(req.query)
  try{
    res.json( allUsers )
  } catch(err){
    next(err)
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try{
    res.json( req.user )
  } catch(err){
    next(err)
  }
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;