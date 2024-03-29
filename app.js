var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var flash = require('connect-flash');
var app = express();

const readlow = require('./lib/readlow');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var todoRouter = require('./routes/todo')

var session = require('express-session');
//const todo = require('./routes/todo');
var FileStore = require('session-file-store')(session);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'holly molly',
  resave: false,
  saveUninitialized: false,
  store : new FileStore(),
  secure:false
}));   
//app.use(flash());
var passport = require('./lib/passport')(app);

app.get('/:pageId',readlow.todolists);
app.use('/', indexRouter);
app.use('/auth', authRouter(passport));
app.use('/todo',todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
