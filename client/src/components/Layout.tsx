import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./SideBar";
import PageScaffold from "./PageScaffold";
import { useIdleTimer } from 'react-idle-timer'
const Layout = () => {

  
  return (
    <>
      <Flex>
        <Box bg="light.blue" w="15vw" minH="100vh" position="fixed">
          <Sidebar />
        </Box>
        <Flex direction="column" ml="15vw" w="100%">
          <Box bg="gray.200" flex="1">
            <PageScaffold title="scaffold">
              <Outlet />
            </PageScaffold>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
