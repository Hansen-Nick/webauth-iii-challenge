const express = require('express')
const router = express.Router();
const helpers = require('./helperFunctions')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../data/secretsCconfig')
const restricted = require('../users/authMiddleware')

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  helpers.add(credentials)
    .then( user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
})

router.post('/login', (req, res) => {
  const {username, password} = req.body

  helpers.findByUsername({username})
    .first()
    .then( user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({message: `Welcome ${user.username}`, token})
      } else {
        res.status(401).json({message: 'invalid credentials'})
      }
    })
    .catch( err => {
      res.status(500).json({error: err})
    })
})


router.get('/', restricted, (req, res) => {
  helpers.find()
    .then( users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
})

module.exports = router