const db = require('../data/dbConfig');

function find() {
  return db('users').select('username', 'id', 'department')
}

function findByID(id) {
  return db('users').select('username', 'id', 'department').where({id})
}

function findByUsername(username) {
  return db('users').select('username', 'id', 'password', 'department').where(username)
}

function add(userData) {
  return db('users').insert(userData, 'id')
    .then( ids => {
      const [id] = ids;
      return findByID(id)
    })
}

module.exports = {
  find,
  add,
  findByID,
  findByUsername
}