const {User} = require('../models/index');

//build functions

function getUsers (req, res, next) {
  User.find()
    .then(Users => {
      return res.status(200).send(Users);
    })
    .catch(err => {
      return next({message: 'oops internal server error'})
    });
}

function getUserProfile (req, res, next) {
  const username = req.params.username;
  User.find({username: username})
    .then(Users => {
      return res.status(200).send(Users);
    })
    .catch(err => {
      return next({status: 404, message:err})
    });
}

module.exports = { getUsers, getUserProfile }; 