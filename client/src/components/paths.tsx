import { FaPencilRuler } from "react-icons/fa";
import { RiBuilding2Fill } from "react-icons/ri";
import {
  FaHome,
  FaBriefcase,
  FaUserFriends,
  FaTasks,
  FaUsers,
  FaCalendar,
  FaUmbrella,
  FaFileAlt,
  FaCalendarPlus,
  FaHistory,
  FaCalendarDay,
} from "react-icons/fa";

export const paths: Record<string, string> = {
  home: "/",
  login: "/login",
  profile: "/profile",
  users: "/users",
  departments: "/departments",
  addUser: "/addUser",
  projects: "/projects",
  clients: "/clients",
  tasks: "/tasks",
  myTasks: "/my-tasks",
  leave: "/staff-leave",
  applyLeave: "/staff-leave/apply",
  leaveHistory: "/leave-history",
  publicHolidays: "/public-holidays",
  addPublicHoliday: "/public-holidays/add",
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
  departments: "Departments",
  logout: "Log Out",
  projects: "Projects",
  clients: "Clients",
  tasks: "All Tasks",
  myTasks: "My Tasks",
  users: "Users",
  timesheet: "My Timesheet",
  timesheetStats: "Clock In Statistics",
  leave: "All leave",
  applyLeave: "Apply Leave",
  leaveHistory: "Leave History",
  publicHolidays: "Public Holidays",
  addPublicHoliday: "Add Public Holiday",
};

export const pathObject = [
  {
    main: {
      icon: <FaHome fontSize={24} color="white" />,
      name: NavNames.dashboard,
      path: paths.home,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.timesheet,
      path: paths.timesheet,
      icon: <FaCalendar fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.timesheetStats,
      path: paths.clockInStats,
      icon: <FaCalendarDay fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.users,
      path: paths.users,
      icon: <FaUsers fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.departments,
      path: paths.departments,
      icon: <RiBuilding2Fill fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.clients,
      path: paths.clients,
      icon: <FaUserFriends fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      name: NavNames.tasks,
      path: paths.tasks,
      icon: <FaPencilRuler fontSize={24} color="white" />,
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
      icon: <FaBriefcase fontSize={24} color="white" />,
    },
    sub: [],
  },
  {
    main: {
      icon: <FaUmbrella fontSize={24} color="white" />,
      name: NavNames.leave,
      path: paths.leave,
    },
    sub: [],
  },
  {
    main: {
      icon: <FaFileAlt fontSize={24} color="white" />,
      name: NavNames.applyLeave,
      path: paths.applyLeave,
    },
    sub: [],
  },
  {
    main: {
      icon: <FaCalendarDay fontSize={24} color="white" />,
      name: NavNames.leaveHistory,
      path: paths.leaveHistory,
    },
    sub: [],
  },
  {
    main: {
      icon: <FaHistory fontSize={24} color="white" />,
      name: NavNames.publicHolidays,
      path: paths.publicHolidays,
    },
    sub: [],
  },
  {
    main: {
      icon: <FaCalendarPlus fontSize={24} color="white" />,
      name: NavNames.addPublicHoliday,
      path: paths.addPublicHoliday,
    },
    sub: [],
  },
];

export default paths;
