const getExpenses = (req, res) => {
  const db = req.app.get("db");

  db.expenses
    .get_expenses([req.user.id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
const getExpensesByCategory = (req, res) => {
  const db = req.app.get("db");

  db.expenses
    .get_expenses_by_category([req.user.id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const addExpenses = (req, res) => {
  const { expenseName, amount, type, date, company, category, id } = req.body;
  req.app
    .get("db")
    .expenses.add_expenses([
      expenseName,
      amount,
      type,
      date,
      company,
      category,
      id
    ])
    .then(newExpenses => {
      res.status(200).send(newExpenses);
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteExpense = (req, res) => {
  console.log(req.params);
  req.app
    .get("db")
    .expenses.delete_expense(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getExpenses,
  addExpenses,
  getExpensesByCategory,
  deleteExpense
};
