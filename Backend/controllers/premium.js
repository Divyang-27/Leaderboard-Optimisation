const User = require('../models/user');
const Expense = require('../models/expense');

const getUserLeaderboard = async (req, res) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userTotalExpense = {};
    expenses.forEach((expense) => {
      if (userTotalExpense[expense.userId]) {
        userTotalExpense[expense.userId] =
          userTotalExpense[expense.userId] + expense.amount;
      } else userTotalExpense[expense.userId] = expense.amount;
    });
    let userLeaderboardDetails = [];
    users.forEach((user) => {
      userLeaderboardDetails.push({
        name: user.name,
        total_expense: userTotalExpense[user.id] || 0,
      });
    });
    userLeaderboardDetails.sort((a, b) => b.total_expense - a.total_expense);
    res.status(200).send(userLeaderboardDetails);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUserLeaderboard,
};
