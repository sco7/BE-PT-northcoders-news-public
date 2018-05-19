const express = require('express');
const router = express.Router();

const articleControl = require('../controllers/articles.controller');

router.get('/', articleControl.getArticles);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;