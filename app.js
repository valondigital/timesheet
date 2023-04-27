const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/roleRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);

app.

module.exports = app;
