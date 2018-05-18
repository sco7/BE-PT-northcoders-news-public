const router = express.Router();

const usersControl = require('../controllers/users.controller');

router.get('/', userControl.getUsers);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;