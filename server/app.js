const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/roleRoutes');
const deptRouter = require('./routes/departmentRoutes');
const taskRouter = require('./routes/taskRoutes');
const projectRouter = require('./routes/projectRoutes');
const clientRouter = require('./routes/clientRoutes');
const timeLogRouter = require('./routes/timeLogRoutes');

const app = express();

app.use(cors());

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
app.use('/api/v1/departments', deptRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/timelogs', timeLogRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
