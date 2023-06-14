import React, {useEffect, useState} from "react";
import {
  Flex,
  Box,
  Link,
  Text,
  Button,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import {paths, pageTitles}  from './paths';

function NavBar() {
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    const currentPage = Object.keys(paths).find(key => paths[key] === location.pathname);
    if (currentPage) {
      setPageTitle(currentPage);
    }
  }, [location.pathname]);
  return (
    <Box px={5}>
      {pageTitle.replace(/^\w/, c => c.toUpperCase())}
      <HStack justify="flex-end">
        <Link as={ReactRouterLink} to="/login">
          <Button variant="outline">Log Out</Button>
        </Link>
        <Button variant="secondary" mx={4}>
          Get Started
        </Button>
      </HStack>
    </Box>
  );
}

export default NavBar;
