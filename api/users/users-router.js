const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model');
const Post = require('./../posts/posts-model')
// The middleware functions also need to be required
const { 
  logger,
  validatePost,
  validateUser,
  validateUserId,
  checkNameExists
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

//todo: this actually is looking for unique names...
router.post('/', validateUser, checkNameExists, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = await User.insert( req.body )
  try {
    return res.json( newUser )
  } catch(err){
    next(err)
  }
});

router.put('/:id', validateUserId, validateUser, checkNameExists, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const updatedUser = await User.update(req.params.id, req.body )
  try{
    res.json( updatedUser )
  } catch(err){
    next(err)
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  const {id} = req.params;
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const deletedUser = await User.getById(id)
  try {
    res.json( deletedUser ) 
    await User.remove( id )
  } catch(err){
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try{
    res.json( await User.getUserPosts(req.params.id) )
  } catch(err){
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  const { id } = req.params
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // const userToInsert = await User.getById( req.user.id )
  // const req.posts.user_id = userToInsert
  try{
    const post = await Post.insert({ ...req.body, user_id: id })
    // console.log(post)
    res.json( /* await Post.getById(post) */ post )
    // console.log()
  } catch(err){
    next(err)
  }
});

// do not forget to export the router
module.exports = router;