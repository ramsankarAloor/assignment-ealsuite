const router = require("express").Router()
const { create } = require('../controllers/admin')
const { authenticateToken } = require("../middlewares/authenticate-token")

router.post('/create', authenticateToken, create)

module.exports = router