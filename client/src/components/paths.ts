import { BiTimeFive } from "react-icons/bi";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";


export const paths:Record<string, string> = {
  home: '/',
  login: '/login',
  profile: '/profile',
  users: '/users',
  addUser: '/addUser',
  projects: '/projects',
  clients: '/clients',
  tasks: '/tasks',
  myTasks: '/my-tasks',
  timesheet: '/timesheet',
  wallet: '/wallet',
  forgotPassword: '/forgotpassword',
  enterNewPassword: '/enternewpassword',
  passwordCreated: '/passwordcreated',
  transactions:'/transactions'
}


export const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  timeclock: 'Time Clock',
  profile: 'Profile',
  projects: 'Projects',
  clients: 'Clients',
  tasks: 'All Tasks',
  myTasks: "My Assigned Tasks",
  timesheet: 'My Timesheet',
}


export const NavNames = {
  dashboard: 'Dashboard',
  profile: 'Profile',
  timeclock: 'Time Clock',
  logout: "Log Out",
  projects: 'Projects',
  clients: 'Clients',
  tasks: 'All Tasks',
  myTasks: 'My Tasks',
  users: 'Users',
  timesheet: 'My Timesheet'
}

export const pathObject = [
  { icon: FiHome, name: NavNames.dashboard, route: paths.home },
  { icon: FiUser, name: NavNames.profile, route: paths.profile },
  { icon: BiTimeFive, name: NavNames.timesheet, route: paths.timesheet },
  { icon: BiTimeFive, name: NavNames.users, route: paths.users },
  { icon: BiTimeFive, name: NavNames.projects, route: paths.projects },
  { icon: BiTimeFive, name: NavNames.clients, route: paths.clients },
  { icon: BiTimeFive, name: NavNames.tasks, route: paths.tasks },
  { icon: BiTimeFive, name: NavNames.myTasks, route: paths.myTasks },
  { icon: FiLogOut, name: NavNames.logout, route: paths.login },
];


export default paths;
