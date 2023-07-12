const endpoints = {
  login: '/users/login',
  signup: '/users/signup',
  projects: '/projects',
  clients: '/clients',
  tasks: '/tasks',
  users: '/users',
  timelogs: '/timelogs',
  userTasks: (id: string) => `/users/${id}/tasks`
};

export default endpoints;
