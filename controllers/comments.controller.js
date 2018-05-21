const {Comments} = require('../models/Comment');

//build functions

function getComments (req, res, next) {
  Comments.find()
    .then(Comments => {
      return res.status(200).send(Comments);
    })
    .catch(err => {
      return next({message: 'oops internal server error'})
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