const express = require('express');
const router = express.Router();

const topicControl = require('../controllers/topics.controller');

router.get('/', topicControl.getTopics);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;