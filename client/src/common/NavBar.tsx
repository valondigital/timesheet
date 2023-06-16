import React, { useEffect, useState } from "react";
import { Box, Link, Button, HStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { paths } from "./paths";

function NavBar() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    const currentPage = Object.keys(paths).find(
      (key) => paths[key] === location.pathname
    );
    if (currentPage) {
      setPageTitle(currentPage);
    }
  }, [location.pathname]);
  return (
    <Box>
      <Flex align="center" justifyContent="space-between">
        <Box>{pageTitle.replace(/^\w/, (c) => c.toUpperCase())}</Box>
        <HStack align="center">
          <Link as={ReactRouterLink} to="/login" p={0}>
            <Button variant="outline">Log Out</Button>
          </Link>
          <Button variant="secondary">
            Get Started
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavBar;
