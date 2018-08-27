require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const axios = require('axios');

const port = process.env.PORT || 3001;

const strategy = require('./strategy');

const {login, logout, getUsers} = require('./Ctrl/userCtrl');


const app = express();
app.use(bodyParser.json());

console.log(`${__dirname}/../build`);
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
        if (!response[0]) {
          db.users
            .add_user([user.displayName, user.id])
            .then(res => done(null, res[0]))
            .catch(err => done(err, null));
        } else {
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
app.get('/api/users', getUsers)

//run build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
