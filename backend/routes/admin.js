const router = require("express").Router()
const { create, list } = require('../controllers/admin')
const { authenticateToken } = require("../middlewares/authenticate-token")

router.post('/create', authenticateToken, create);
router.get('/list', authenticateToken, list);

module.exports = router