const { User } = require('../models/index');

//build functions

function getUsers (req, res, next) {
  User.find()
    .then(users => {
      return res.status(200).send({users});
    })
    .catch(err => {
      return next({ message: 'oops internal server error' })
    });
}

function getUserProfile (req, res, next) {
  const username = req.params.username;
  User.find({ username: username })
    .then(users => {
    if (users.length === 0) return next ({ status: 404, message: `User with username '${username}' could not be found` });
      return res.status(200).send({users});
    })
    .catch(err => {
      if (err) 
        return next({ message: 'oops internal server error' })
    });
}

module.exports = { getUsers, getUserProfile }; 