import { VscFileMedia } from "react-icons/vsc";
import { FaWarehouse } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GrUserWorker } from "react-icons/gr";
import { BiWallet } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const paths = {
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


export const pageTitles = {
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
  bdaOrders: 'BDA Orders',
  bdaCustomers:'BDA Customers',
  profile: 'Profile',
  wallet: 'Wallet',
  yourOrders: 'Your Orders',
  transactions:'Transactions',
  BDA_Orders:'BDA Orders',
  Wallet: 'Transactions'
}

// export const pathObject = [
//   {main: { name: NavNames.dashboard, path: paths.home, icon: <FaWarehouse /> }, sub:[]},
//   { main: {name: NavNames.agents, path: paths.agents, icon: <GrUserWorker />  }, sub:[]},
//   {main: { name: 'BDAs' }, sub: [
//     { name: NavNames.bdaOrders, path: paths.bdaOrders, icon: <CgProfile/> },
//     { name: NavNames.bdaCustomers, path: paths.customers, icon: <CgProfile/> }
//   ]},
//   { main: {name: NavNames.yourOrders, path: paths.yourOrders, icon: <VscFileMedia /> }, sub:[]},
//   {main: { name: 'Wallet' }, sub: [
//     { name: NavNames.wallet, path: paths.wallet, icon: <BiWallet/> },
//     { name: NavNames.transactions, path: paths.transactions, icon: <CgProfile/> }
//   ]},
//   { main: {name: NavNames.profile, path: paths.profile, icon: <CgProfile /> }, sub:[]},
// ]

export default paths;
