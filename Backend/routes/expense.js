const express = require('express');
const authMiddleware = require('../middlewares/auth');

const expenseController = require('../controllers/expense');
const router = express.Router();
router.post('/', expenseController.postExpense);
router.get('/', authMiddleware.authenticate, expenseController.getExpense);
router.delete('/:id', expenseController.deleteExpense);
module.exports = router;
