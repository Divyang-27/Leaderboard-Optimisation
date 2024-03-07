const Expense = require('../models/expense');
const jwt = require('jsonwebtoken');

const extractId = (token) => jwt.verify(token, 'secretKey').id;

const postExpense = async (req, res, next) => {
  try {
    req.body.userId = extractId(req.body.userId);
    const expense = await Expense.create(req.body);
    res.send({ newExpenseDetails: expense });
  } catch (error) {
    throw new Error(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    id = req.user.id;
    const allExpense = await Expense.findAll({ where: { userId: id } });
    res.send({ allExpenseDetails: allExpense });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    Expense.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  postExpense,
  getExpense,
  deleteExpense,
};
