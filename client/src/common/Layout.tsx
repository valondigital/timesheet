import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem minH="100vh" bg="light.primary">
        sidebar
      </GridItem>
      <GridItem colSpan={5}>
        <NavBar />
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
