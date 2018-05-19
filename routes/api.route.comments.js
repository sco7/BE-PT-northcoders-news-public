const express = require('express');
const router = express.Router();

const commentControl = require('../controllers/comments.controller');

router.get('/', commentControl.getComments);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;