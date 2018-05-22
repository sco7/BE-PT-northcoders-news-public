const { User } = require('../models/index');

//build functions

function getUsers (req, res, next) {
  User.find()
    .then(users => {
      return res.status(200).send(users);
    })
    .catch(err => {
      return next({ message: 'oops internal server error' })
    });
}

function getUserProfile (req, res, next) {
  const username = req.params.username;
  User.find({ username: username })
    .then(users => {
      return res.status(200).send(users);
    })
    .catch(err => {
      // CastError
      if (err.name === 'CastError') 
        return next({ status: 404, message: `User with username '${username}' could not be found` })
    });
}


module.exports = { getUsers, getUserProfile }; 