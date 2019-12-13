const jwt = require('jsonwebtoken');
const secrets = require('../data/secretsCconfig');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: "Invalid token"})
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({message: "cant touch that"})
  }
}