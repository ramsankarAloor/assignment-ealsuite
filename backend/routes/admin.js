const router = require("express").Router()
const { create, list, edit } = require('../controllers/admin')
const { authenticateToken } = require("../middlewares/authenticate-token")

router.post('/create', authenticateToken, create);
router.get('/list', authenticateToken, list);
router.put('/edit/:id', authenticateToken, edit);

module.exports = router