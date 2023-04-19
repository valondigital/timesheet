const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));


// Checking if the id is valid
exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > users.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// Checking if the request carries the proper paramaters
exports.checkBody = (req, res, next) => {
  if(!req.body.name){
    return res.status(400).json({
      status: 'error',
      message: 'Missing name request'
    })
  }
  next()
}

exports.createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User Created',
  });
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUserDetails = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((user) => user.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: `<p>This is the tour here</p>`,
    },
  });
};

exports.deleteUser = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
