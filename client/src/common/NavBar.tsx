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
    <Box px={5}>
      <Flex align="center" justifyContent="space-between" p={4}>
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
