const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

const createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User Created',
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

const getUserDetails = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'User Not Found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

const updateUser = (req, res) => {
  if (req.params.id * 1 > users.length) {
    res.status(500).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: `<p>This is the tour here</p>`,
    },
  });
};

const deleteUser = (req, res) => {
  if (req.params.id * 1 > users.length) {
    res.status(404).json({
      status: 'fail',
      message: 'User Not Found',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

const createRole = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The roles endpoint has not been implemented yet',
  });
};

const getAllRoles = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The roles endpoint has not been implemented yet',
  });
};

const userRouter = express.Router();
const roleRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter
  .route('/:id')
  .get(getUserDetails)
  .patch(updateUser)
  .delete(deleteUser);

roleRouter.route('/').get(getAllRoles).post(createRole);

roleRouter
  .route('/:id')
  .get(getUserDetails)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);

const port = 8000;
app.listen(port, () => {
  console.log('App running...');
});
