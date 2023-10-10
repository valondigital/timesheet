const endpoints = {
  login: '/users/login',
  signup: '/users/signup',
  projects: '/projects',
  clients: '/clients',
  tasks: '/tasks',
  users: '/users',
  leaveApplications: '/leave-applications',
  publicHolidays: '/public-holidays',
  leaveHistory: '/leave-applications/leave-history',
  clockInStatus: '/check-all-users-clock-in-status',
  usersClockInStatus: '/users/checkClockInStatus',
  timelogs: '/timelogs',
  countries: 'https://restcountries.com/v3.1/all',
  departments: '/departments',
  userTasks: (id: string) => `/users/${id}/tasks`
};

export default endpoints;
