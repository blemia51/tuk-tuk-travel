function verifyToken(req, res, next){
  const bearerHeader = req.headers.authorization
  if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ') // split bearerHeader in a new Array
      const bearerToken = bearer[1] // store index 1 of the newly created array in a new variable bearToken
      req.token = bearerToken
      next() // step to the next middleware
  } else{
      res.sendStatus(403)
  }
}

module.exports = verifyToken