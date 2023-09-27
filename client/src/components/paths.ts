import { BiTimeFive } from "react-icons/bi";
import { FaBuromobelexperte, FaTasks } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { RiUserSearchLine } from "react-icons/ri";

export const paths: Record<string, string> = {
  home: "/",
  login: "/login",
  profile: "/profile",
  users: "/users",
  addUser: "/addUser",
  projects: "/projects",
  clients: "/clients",
  tasks: "/tasks",
  myTasks: "/my-tasks",
  timesheet: "/timesheet",
  wallet: "/wallet",
  forgotPassword: "/forgotpassword",
  enterNewPassword: "/enternewpassword",
  passwordCreated: "/passwordcreated",
  transactions: "/transactions",
  clockInStats: "/check-all-users-clock-in-status",
};

export const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  timeclock: "Time Clock",
  profile: "Profile",
  projects: "Projects",
  clients: "Clients",
  tasks: "All Tasks",
  myTasks: "My Assigned Tasks",
  timesheet: "My Timesheet",
  timesheetStats: "Timesheet Statistics",
};

export const NavNames = {
  dashboard: "Dashboard",
  profile: "Profile",
  timeclock: "Time Clock",
  logout: "Log Out",
  projects: "Projects",
  clients: "Clients",
  tasks: "All Tasks",
  myTasks: "My Tasks",
  users: "Users",
  timesheet: "My Timesheet",
  timesheetStats: "Clock In Statistics",
};

export const pathObject = [
  { icon: FaBuromobelexperte, name: NavNames.dashboard, route: paths.home },
  // { icon: FiUser, name: NavNames.profile, route: paths.profile },
  { icon: AiOutlineFileText, name: NavNames.timesheet, route: paths.timesheet },
  {
    icon: AiOutlineFileText,
    name: NavNames.timesheetStats,
    route: paths.clockInStats,
  },
  { icon: RiUserSearchLine, name: NavNames.users, route: paths.users },
  { icon: BiTimeFive, name: NavNames.projects, route: paths.projects },
  { icon: RiUserSearchLine, name: NavNames.clients, route: paths.clients },
  { icon: FaTasks, name: NavNames.tasks, route: paths.tasks },
  { icon: BiTimeFive, name: NavNames.myTasks, route: paths.myTasks },
];

export default paths;
