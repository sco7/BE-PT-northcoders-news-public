const router = express.Router();

const topicControl = require('../controllers/topic.controller');

router.get('/', topicControl.gettopics);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;