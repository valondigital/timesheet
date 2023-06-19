import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./pages/sign-in";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import ClockInOut from "./pages/timelog";
import Layout from "./common/Layout";
import paths from "./common/paths";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path={paths.login} element={<SignIn />}></Route>
        <Route path={paths.home} element={<Layout />}>
          <Route path={paths.home} element={<Dashboard />} />
          <Route path={paths.profile} element={<Profile />} />
          <Route path={paths.timeclock} element={<ClockInOut />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
