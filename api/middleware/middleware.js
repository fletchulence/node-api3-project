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
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports ={
  // errorResp,
  logger,
  validateUserId,
  validateUser,
  validatePost,
}