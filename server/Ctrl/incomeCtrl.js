const getIncome = (req, res) => {
  const db = req.app.get('db');

  db.income
    .get_income([req.user.id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const addIncome = (req, res) => {
  const db = req.app.get('db');
  const { amount, name, payday, id } = req.body;

  db.income
    .add_income([amount, name, payday, id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const deleteIncome = (req, res) => {
  const db = req.app.get('db');
  const { id } = req.params;

  db.income
    .delete_income([req.user.id, id])
    .then(response => res.status(200).send(response))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const editIncome = (req, res) => {
  const db = req.app.get('db');
  const { name, amount, payday } = req.body;

  db.income
    .edit_income([req.params.id, name, amount, payday])
    .then(response => res.status(200).send(response))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const incomeSum = (req, res) => {
  const db = req.app.get('db');

  db.income
    .get_income_sum([req.user.id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getIncome,
  addIncome,
  deleteIncome,
  editIncome,
  incomeSum
};
