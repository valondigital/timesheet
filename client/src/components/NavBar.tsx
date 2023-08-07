import React, { useEffect, useState, useContext } from "react";
import { Box, Link, Button, HStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";
import { paths } from "./paths";
import { useQueryClient } from "@tanstack/react-query";

function NavBar() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  useEffect(() => {
    const currentPage = Object.keys(paths).find(
      (key) => paths[key] === location.pathname
    );
    if (currentPage) {
      setPageTitle(currentPage);
    }
  }, [location.pathname]);

  const handleLogout =() => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('userId');
    queryClient.cancelQueries();
    queryClient.clear();
    navigate(paths.login);
  }
  return (
    <Box>
      <Flex align="center" justifyContent="space-between">
        <Box>{pageTitle.replace(/^\w/, (c) => c.toUpperCase())}</Box>
        <HStack align="center">
          {/* <Link as={ReactRouterLink} to="/login" p={0}> */}
            <Button variant="outline" onClick={handleLogout}>Log Out</Button>
          {/* </Link> */}
          <Button variant="secondary">
            Get Started
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavBar;
