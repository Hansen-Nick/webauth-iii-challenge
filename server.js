const express = require('express')
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const authRoute = require('./users/authRoute')

server.use(cors(), morgan(), helmet(), express.json());

server.use('/api', authRoute)


module.exports = server