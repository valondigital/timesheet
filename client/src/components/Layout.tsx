import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./SideBar";
import PageScaffold from "./PageScaffold";

const Layout = () => {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem minH="100vh" bg="light.primary">
        <Sidebar />
      </GridItem>
      <GridItem colSpan={5}>
        <PageScaffold title="scaffold">
          <Outlet />
        </PageScaffold>
      </GridItem>
    </Grid>
  );
};

export default Layout;
