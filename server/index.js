require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');

const port = process.env.PORT || 3001;

const strategy = require('./strategy');

const {
  login,
  logout,
  getUser,
  getUsers,
  editUser
} = require('./Ctrl/userCtrl');
const {
  getExpenses,
  addExpenses,
  getExpensesByCategory,
  getYearlyExpensesByCategory,
  deleteExpense,
  editExpense,
  getTopExpenses,
  getExpenseTotalByMonth
} = require('./Ctrl/expensesCtrl');
const {
  getDashboard,
  addIncome,
  deleteIncome,
  editIncome,
  incomeSum,
  getYearlyIncome,
  incomeYearlySum,
  getIncomeById
} = require('./Ctrl/incomeCtrl');
const {
  addGoal,
  getGoal,
  editGoal,
  addTrophy,
  getTrophy
} = require('./Ctrl/goalsCtrl');

const app = express();
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => {
    console.log(err);
  });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 7 * 2
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  const db = app.get('db');

  db.users
    .get_user_by_id(user.id)
    .then(response => {
      const modifiedUser = user.displayName.includes('@')
        ? user.nickname
        : user.displayName;
      if (!response[0]) {
        db.users
          .add_user([modifiedUser, user.id])
          .then(res => {
            session.auth_id = res[0].auth_id;
            done(null, res[0]);
          })
          .catch(err => done(err, null));
      } else {
        session.auth_id = response[0].auth_id;
        return done(null, response[0]);
      }
    })
    .catch(err => done(err, null));
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//user endpoints
app.get('/login', login);
app.get('/logout', logout);
app.get('/api/me', getUser);
app.get('/api/users', getUsers);
app.put('/api/edit-user', editUser);

//expenses endpoints
app.get('/api/expenses', getExpenses);
app.get('/api/expenses_by_cat', getExpensesByCategory);
app.get('/api/yearly-expenses_by_cat', getYearlyExpensesByCategory);
app.get('/api/top-expenses', getTopExpenses);
app.get('/api/linechart', getExpenseTotalByMonth);
app.post('/api/add-expenses', addExpenses);
app.delete('/api/delete-expense/:id', deleteExpense);
app.put('/api/edit-expense/:id', editExpense);

//income endpoints
app.get('/api/dashboard', getDashboard);
app.post('/api/setup-income', addIncome);
app.delete('/api/delete-income/:id', deleteIncome);
app.put('/api/edit-income/:id', editIncome);
app.get('/api/income/:id', getIncomeById);

//goals endpoints
app.get('/api/goal', getGoal);
app.post('/api/add-goal', addGoal);
app.put('/api/edit-goal', editGoal);
app.post('/api/add-trophy', addTrophy);
app.get('/api/trophy', getTrophy);

// run build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
