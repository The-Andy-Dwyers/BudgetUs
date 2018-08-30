const addGoal = (req, res) => {
  const db = req.app.get('db');
  const { savings } = req.body;

  db.goals
    .add_goal([req.user.id, savings])
    .then(newExpenses => {
      res.status(200).send(newExpenses);
    })
    .catch(err => {
      console.log(err);
    });
};

const getGoal = (req, res) => {
    const db = req.app.get("db");
  
    db.goals
      .get_goal_by_id([req.user.id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  };

module.exports = {
    addGoal,
    getGoal
}
