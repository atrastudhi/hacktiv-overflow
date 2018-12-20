var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')
const kue = require('kue')


require('dotenv').config()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacktivoverflow');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('open database connection')
});

var usersRouter = require('./routes/users');
const tokenRouter = require('./routes/token')
const googleRouter = require('./routes/googleSignin')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use('/users', usersRouter);
app.use('/token', tokenRouter);
app.use('/googleSignin', googleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

kue.app.listen(4000)

module.exports = app;
