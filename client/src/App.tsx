import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Projects from './pages/projects';
import Clients from './pages/clients';
import Tasks from './pages/tasks';
import AssignedTasks from './pages/tasks/AssignedTasks';
import Users from './pages/users';
import TimesheetBase from './pages/timelog/Base'
import Timesheet from './pages/timelog';
import ClockOut from './pages/timelog/ClockOut';
import Layout from './components/Layout';
import paths from './components/paths';
import { UserDetailsProvider } from 'setup/app-context-manager/UserDetailsContext';

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
          {/* <Route path={paths.timeclock} element={<ClockInOut />} /> */}
          <Route path={paths.addUser} element={<SignUp />} />
          <Route path={paths.projects} element={<Projects />} />
          <Route path={paths.clients} element={<Clients />} />
          <Route path={paths.tasks} element={<Tasks />} />
          <Route path={paths.myTasks} element={<AssignedTasks />} />
          <Route path={paths.users} element={<Users />} />
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

  if (!localStorage.jwt_token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={paths.login} state={{ from: location }} replace />;
  }

  return <UserDetailsProvider>{children}</UserDetailsProvider>;
}
