const express = require('express');
const router = express.Router();

const { getUsers, getUserProfile } = require('../controllers/users.controller');

router.get('/', getUsers);

router.get('/:username', getUserProfile);

module.exports = router;