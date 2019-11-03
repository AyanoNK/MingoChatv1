const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

//signin
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    //check password if username exists
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    //username doesn't exist
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

//sign up
passport.use('local.signup', new LocalStrategy({
  //what is to be received
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, /*callback*/async (req, username, password, done) => {

  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };

  //gets string and uses method in helpers to encrypt it
  newUser.password = await helpers.encryptPassword(password);
  //save it in the database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  //redirect
  return done(null, newUser);
}));

//save user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//take id to take data again
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});

