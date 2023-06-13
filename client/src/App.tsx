import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "./pages/sign-in";
import Layout from "./common/Layout";
import paths from "./common/paths";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path={paths.login} element={<SignIn />}></Route>
        <Route
          path={paths.home}
          element={
            <Layout>
              <div>Hello</div>
            </Layout>
          }
        >
          <Route path={paths.home} element={<SignIn />}/>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
