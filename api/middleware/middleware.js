const User = require('./../users/users-model.js')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log({ method: req.method, url: req.baseUrl, timestamp:Date.now()})
  next()
}

async function validateUserId (req, res, next) {
  const { id } = req.params
  // DO YOUR MAGIC
  const validId = await User.getById(id)
  try{
    if ( validId ){
      console.log(`validId`, validId)
      req.user = validId
      next();
    } else{
      next({ status: 404, message: `user not found`})
    }
  } catch(err){
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name){
    next({ status: 400, message: 'missing required name field'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text){
    next({ status: 400, message: 'missing required text field'})
  } else{
    next()
  }
}

//! i added this one
async function checkNameExists(req, res, next){
  const existingName = await User.getName(req.body.name)
  if (existingName) {
    next({ status: 400, message: 'sorry that name already exists in our db. Try another' })
  } else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports ={
  // errorResp,
  logger,
  validateUserId,
  validateUser,
  validatePost,
  checkNameExists,
}