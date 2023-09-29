const endpoints = {
  login: '/users/login',
  signup: '/users/signup',
  projects: '/projects',
  clients: '/clients',
  tasks: '/tasks',
  users: '/users',
  leaveApplications: '/leave-applications',
  clockInStatus: '/check-all-users-clock-in-status',
  usersClockInStatus: '/users/checkClockInStatus',
  timelogs: '/timelogs',
  userTasks: (id: string) => `/users/${id}/tasks`
};

export default endpoints;
