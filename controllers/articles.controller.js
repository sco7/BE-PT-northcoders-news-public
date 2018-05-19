const articles = require('../models/Article');

//build functions

function getArticles (req, res) {
  articles.find()
    .then(articles => {
      return res.status(200).send(articles);
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

module.exports = { getArticles };