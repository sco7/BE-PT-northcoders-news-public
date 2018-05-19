const express = require('express');
const router = express.Router();

const userControl = require('../controllers/users.controller');

router.get('/', userControl.getUsers);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;