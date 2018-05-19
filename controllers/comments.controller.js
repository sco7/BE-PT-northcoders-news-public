const comments = require('../models/Comment');

//build functions

function getComments (req, res) {
  circuits.find()
    .then(comments => {
      return res.status(200).send(comments);
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

module.exports = { getComments };