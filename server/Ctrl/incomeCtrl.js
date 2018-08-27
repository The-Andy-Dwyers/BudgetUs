const getIncome = (req, res) => {
  const db = req.app.get("db");
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
  const db = req.app.get("db");
  const { amount, name, users_id } = req.body;
  console.log(req.body);

  db.income
    .add_income([amount, name, users_id])
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
  addIncome
};
