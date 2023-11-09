const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../db/secret');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log(token);

    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      console.log(err)
      console.log(user);
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

  module.exports = authenticateToken;