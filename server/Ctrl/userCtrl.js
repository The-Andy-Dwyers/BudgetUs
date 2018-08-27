const passport = require('passport');

const logout = (req, res) => {
  req.session.destroy(() => {
    // res.redirect('http://localhost:3000');
    res.redirect(process.env.REACT_APP_CLIENT + '/');
  });
};

const login = passport.authenticate('auth0', {
  // successRedirect: 'http://localhost:3000',
  successRedirect: process.env.REACT_APP_CLIENT + '/dashboard',

  // failureRedirect: 'http://localhost:3000/login'
  failureRedirect: process.env.REACT_APP_CLIENT + '/login'
});

const getUser = (req, res) => {
  if (!req.user) {
    res.status(500).send({ message: 'Not Logged in' });
  } else {
    res.status(200).send(req.user);
  }
};

const getUsers = (req, res) => {
  const db = req.app.get('db');

  db.users
    .get_users()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  login,
  logout,
  getUser,
  getUsers
};
