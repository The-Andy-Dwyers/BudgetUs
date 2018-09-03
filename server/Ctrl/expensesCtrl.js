var moment = require("moment");
const start = moment()
  .startOf("month")
  .format("l");
const end = moment()
  .endOf("month")
  .format("l");
const year = moment()
  .startOf("year")
  .format("l");
const yearend = moment()
  .endOf("month")
  .format("l");

const getExpenses = (req, res) => {
  const db = req.app.get("db");

  db.expenses
    .get_expenses([req.user.id, start, end])
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
    .get_expenses_by_category([req.user.id, start, end])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getYearlyExpensesByCategory = (req, res) => {
  const db = req.app.get("db");

  db.expenses
    .get_expenses_by_category([req.user.id, year, end])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const addExpenses = (req, res) => {
  const db = req.app.get("db");
  const { expenseName, amount, type, date, company, category, id } = req.body;

  db.expenses
    .add_expenses([expenseName, amount, type, date, company, category, id])
    .then(newExpenses => {
      res.status(200).send(newExpenses);
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteExpense = (req, res) => {
  const db = req.app.get("db");

  db.expenses
    .delete_expense(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
    });
};

const editExpense = (req, res) => {
  const db = req.app.get("db");
  const { expenseName, amount, date, type, company, category } = req.body;

  db.expenses
    .edit_expense([
      req.params.id,
      expenseName,
      amount,
      date,
      type,
      company,
      category
    ])
    .then(response => res.status(200).send(response))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getTopExpenses = (req, res) => {
  const db = req.app.get("db");

  db.expenses
    .get_top_expenses([req.user.id, start, end])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
const getExpenseTotalByMonth = (req, res) => {
  const db = req.app.get("db");
  db.expenses
    .get_expense_total_by_month(req.user.id, year, yearend)
    .then(totals => {
      res.status(200).send(totals);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};




module.exports = {
  getExpenses,
  addExpenses,
  getExpensesByCategory,
  getYearlyExpensesByCategory,
  deleteExpense,
  editExpense,
  getTopExpenses,
  getExpenseTotalByMonth
};
