const topics = require('../models/Topic');

//build functions

// function getCircuits (req, res) {
//   circuits.find()
//     .then(circuits => {
//       return res.status(200).send(circuits);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

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

module.exports = { getTopics };