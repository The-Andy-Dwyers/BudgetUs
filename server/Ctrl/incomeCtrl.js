const getIncome = (req, res) => {
    const db = req.app.get('db');
  
    db.income
      .get_income()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  };

  module.exports = {
      getIncome
  }