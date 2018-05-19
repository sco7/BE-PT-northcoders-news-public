const users = require('../models/User');

//build functions

function getUsers (req, res) {
  circuits.find()
    .then(users => {
      return res.status(200).send(users);
    })
    .catch(err => {
      console.log(err);
    });
}

// function getCircuitId (req, res) {
//   const circuitId = req.params.circuitId;
//   circuits.findOne({_id: circuitId})
//     .then(circuits => {
//       return res.status(200).send(circuits);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

module.exports = { getUsers };