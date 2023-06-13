import React from "react";
import { Flex, Box, Link, Text, Button , useColorMode} from "@chakra-ui/react";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box px={5}>
      <Flex p={4} align="center">
        <Box flex={2}>
          <Text>Logo</Text>
        </Box>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Box flex={2}>
          <Link mx={4}>Home</Link>
          <Link mx={4}>About</Link>
        </Box>
        <Box flex={2}>
          <Button variant="outline">Log Out</Button>
          <Button variant="secondary" mx={4}>
            Get Started
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavBar;
