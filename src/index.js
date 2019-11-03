const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');


const { database } = require('./keys');
const Chats = require('./model/chats.config.js');

const http = require('http');
const socketio = require('socket.io');

//init
const app = express();
require('./lib/passport');
const server = http.Server(app);
const io = socketio(server);

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname/*throws where the file exec. is*/, 'views'));//tells node where the folder is
app.engine('.hbs', exphbs({
  //where the views are
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'), //where layouts is
  //partials can be used to reuse code pieces in views
  partialsDir: path.join(app.get('views'), 'partials'),//where partials is
  //extension of Handlebars files.
  extname: '.hbs',//hbs == handlebars
  //cant execute function within handlebars, so we need helpers
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cdn', express.static(path.join(__dirname, 'node_modules')));


//middlewares -> petition handler
app.use(morgan('dev'));
//urlencoded accepts data from datasheets. false means simple data (no imgs or .js)
app.use(bodyParser.urlencoded({extended: false}));
//to, in future, get .json files
app.use(bodyParser.json());

app.use(session({
  secret: 'MingoDB',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
//to use passport methods
app.use(passport.initialize());
//how to use data
app.use(passport.session());
app.use(validator());

//global vars
//takes user data (req), takes what the server wants to respond (res)\
//& takes next() to continue w/ code
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

//routes
app.use(require('./routes/index'));
//import authentication.js
app.use(require('./routes/authentication'));
//import links, will precede /links, meaning that
//if i want all /links routes, will need to ask /links
// parsing body 
app.use(bodyParser.json({extended: true, limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use('/', require('./model/router.config.js')(io));


//public
//static also receives address, says where public folder is
app.use(express.static(path.join(__dirname, 'public')));

//startserver
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
  //start chat
  console.log('Inicializando Chat.');
  
  Chats.startChat(io);
});

//start chat service
require('dotenv').config();

require('babel-register')({
    presets: ['env']
});

module. exports = require('./index');