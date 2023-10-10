import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Projects from "./pages/projects";
import Clients from "./pages/clients";
import Tasks from "./pages/tasks";
import Departments from "./pages/departments";
import DepartmentDetails from "./pages/departments/Department";
import AllLeave from "./pages/staff-leave";
import AllPublicHolidays from "./pages/public-holidays"
import NewPublicHoliday from "./pages/public-holidays/NewPublicHoliday"
import AssignedTasks from "./pages/tasks/AssignedTasks";
import Users from "./pages/users";
import ClockInStats from "./pages/stats";
import TimesheetBase from "./pages/timelog/Base";
import Timesheet from "./pages/timelog";
import ClockOut from "./pages/timelog/ClockOut";
import Layout from "./components/Layout";
import paths from "./components/paths";
import { UserDetailsProvider } from "setup/app-context-manager/UserDetailsContext";
import TaskDetails from "pages/tasks/TaskDetails";
import LeaveDetails from "pages/staff-leave/LeaveDetails";
import NewLeave from "pages/staff-leave/NewLeave";
import LeaveHistory from './pages/staff-leave/LeaveHistory';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path={paths.login} element={<SignIn />}></Route>
        <Route
          path={paths.home}
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path={paths.home} element={<Dashboard />} />
          <Route path={paths.profile} element={<Profile />} />
          <Route path={paths.addUser} element={<SignUp />} />
          <Route path={paths.projects} element={<Projects />} />
          <Route path={paths.clients} element={<Clients />} />
          <Route path={paths.leaveHistory} element={<LeaveHistory />} />
          <Route path={paths.tasks}>
            <Route index element={<Tasks />} />
            <Route path=":taskId" element={<TaskDetails />} />
          </Route>
          <Route path={paths.departments}>
            <Route index element={<Departments />} />
            <Route path=":deptId" element={<DepartmentDetails />} />
          </Route>
          <Route path={paths.leave}>
            <Route index element={<AllLeave />} />
            <Route path=":leaveId" element={<LeaveDetails />} />
            <Route path="apply" element={<NewLeave />} />
          </Route>
          <Route path={paths.publicHolidays}>
            <Route index element={<AllPublicHolidays />} />
            <Route path="add" element={<NewPublicHoliday />} />
          </Route>
          <Route path={paths.myTasks} element={<AssignedTasks />} />
          <Route path={paths.users} element={<Users />} />
          <Route path={paths.clockInStats} element={<ClockInStats />} />
          <Route path={paths.timesheet} element={<TimesheetBase />}>
            <Route index element={<Timesheet />} />
            <Route path=":logId" element={<ClockOut />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!localStorage.getItem("jwt_token")) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={paths.login} state={{ from: location }} replace />;
  }

  return <UserDetailsProvider>{children}</UserDetailsProvider>;
}
