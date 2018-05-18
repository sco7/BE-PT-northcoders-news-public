const router = express.Router();

const articleControl = require('../controllers/article.controller');

router.get('/', articleControl.getArticles);

//router.get('/:circuitId', circuitControl.getCircuitId);

module.exports = router;