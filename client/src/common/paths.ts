import { BiTimeFive } from "react-icons/bi";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";


export const paths:Record<string, string> = {
  home: '/',
  login: '/login',
  profile: '/profile',
  timeclock: '/timeclock',
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
}


export const NavNames = {
  dashboard: 'Dashboard',
  profile: 'Profile',
  timeclock: 'Time Clock',
  logout: "Log Out"
}

export const pathObject = [
  { icon: FiHome, name: NavNames.dashboard, route: paths.home },
  { icon: FiUser, name: NavNames.profile, route: paths.profile },
  { icon: BiTimeFive, name: NavNames.timeclock, route: paths.timeclock },
  { icon: FiLogOut, name: NavNames.logout, route: paths.login },
];


export default paths;
