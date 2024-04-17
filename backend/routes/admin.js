const router = require("express").Router()
const { create, list, edit } = require('../controllers/admin')
const { authenticateToken } = require("../middlewares/authenticate-token");
const { getCategories } = require("../models/modules");

router.post('/create', authenticateToken, create);
router.get('/list', authenticateToken, list);
router.put('/edit/:id', authenticateToken, edit);

router.post('/categories', authenticateToken, getCategories);

module.exports = router