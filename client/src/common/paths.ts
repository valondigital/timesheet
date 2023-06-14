import { VscFileMedia } from "react-icons/vsc";
import { FaWarehouse } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GrUserWorker } from "react-icons/gr";
import { BiWallet } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";


export const paths:Record<string, string> = {
  home: '/',
  about: '/about',
  login: '/login',
  terms: '/terms',
  agents: '/agents',
  bdaOrders: '/bdaOrders',
  profile: '/profile',
  yourOrders: '/yourorders',
  wallet: '/wallet',
  forgotPassword: '/forgotpassword',
  enterNewPassword: '/enternewpassword',
  passwordCreated: '/passwordcreated',
  transactions:'/transactions'
}


export const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  customers: 'Customers',
  agents: 'Agents',
  bdaOrders: 'BDA Orders',
  profile: 'Profile',
  wallet: 'Wallet',
  yourOrders: 'Your Orders',
  forgotPassword: 'Forgot Password',
  enterNewPassword: 'Enter New Password',
  transactions:'Your Transactions'
}


export const NavNames = {
  dashboard: 'Dashboard',
  customers: 'Customers',
  agents: 'Agents',
  terms: 'Terms',
  bdaOrders: 'BDA Orders',
  bdaCustomers:'BDA Customers',
  profile: 'Profile',
  wallet: 'Wallet',
  yourOrders: 'Your Orders',
  transactions:'Transactions',
  BDA_Orders:'BDA Orders',
  Wallet: 'Transactions'
}

export const pathObject = [
  { icon: FiHome, name: NavNames.dashboard, route: "/" },
  { icon: FiUser, name: NavNames.profile, route: "/profile" },
  { icon: FiSettings, name: NavNames.terms, route: "/settings" },
  { icon: FiLogOut, name: NavNames.wallet, route: "/login" },
];


export default paths;
