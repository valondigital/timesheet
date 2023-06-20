const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/roleRoutes');
<<<<<<< HEAD
const deptRouter = require('./routes/departmentRoutes');
=======
>>>>>>> d2d405c3e44dc14e160406092ca25773c7fa40ee

const app = express();

// Global Middlewares

//set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from the body into req.body
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);
<<<<<<< HEAD
app.use('/api/v1/departments', deptRouter);
=======
>>>>>>> d2d405c3e44dc14e160406092ca25773c7fa40ee

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
