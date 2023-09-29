import { BiTimeFive, BiWallet } from "react-icons/bi";
import {
  FaBuromobelexperte,
  FaDashcube,
  FaMinus,
  FaShopify,
  FaTasks,
  FaTimesCircle,
} from "react-icons/fa";
import { AiOutlineFileText, AiOutlineSmallDash } from "react-icons/ai";
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
  leave: "/staff-leave",
  leaveHistory: '/leave-history',
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
  leave: "All leave",
  leaveHistory: "Leave History",

};

export const pathObject = [
  {
    main: {
      icon: <FaBuromobelexperte fontSize={24} color="white" />,
      name: NavNames.dashboard,
      path: paths.home,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.timesheet,
      path: paths.timesheet,
      icon: <FaShopify fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.timesheetStats,
      path: paths.clockInStats,
      icon: <BiWallet fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.users,
      path: paths.users,
      icon: <RiUserSearchLine fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.clients,
      path: paths.clients,
      icon: <RiUserSearchLine fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.tasks,
      path: paths.tasks,
      icon: <FaTasks fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.myTasks,
      path: paths.myTasks,
      icon: <FaTasks fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.projects,
      path: paths.projects,
      icon: <BiTimeFive fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      icon: <FaBuromobelexperte fontSize={24} color="white" />,
      name: NavNames.leave,
      path: paths.leave,
    },
    sub: [],
  },
  // {
  //   main: {
  //     icon: <FaBuromobelexperte fontSize={24} color="white" />,
  //     name: NavNames.leave,
  //     path: paths.leave,
  //   },
  //   sub: [],
  // },
  {
    main: {
      icon: <FaBuromobelexperte fontSize={24} color="white" />,
      name: NavNames.leaveHistory,
      path: paths.leaveHistory,
    },
    sub: [],
  },
];

export default paths;
