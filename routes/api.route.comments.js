const router = express.Router();

const commentControl = require('../controllers/comment.controller');

router.get('/', commentControl.getComments);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;