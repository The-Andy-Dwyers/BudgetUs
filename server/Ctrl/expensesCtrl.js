const getExpenses = (req, res) => {
  const db = req.app.get('db');

  db.expenses
    .get_expenses()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const addExpenses = (req, res) => [
  req.app.get('db').expenses.add_expenses()
    .then(newExpenses => {
      res.status(200).send(newExpenses)
    }).catch(err => { console.log(err) })
]

module.exports = {
  getExpenses,
  addExpenses
}