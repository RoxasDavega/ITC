var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authRouter = require("./app/authentication/route");
const usersRouter = require('./app/user/route');
const { customErrorHandler } = require('./middleware/CustomErrorHandler');
const handler404NotFound = require('./middleware/Handler404NotFound');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRouter);
app.use('/user', usersRouter);

app.use(customErrorHandler);
app.use(handler404NotFound);


module.exports = app;
