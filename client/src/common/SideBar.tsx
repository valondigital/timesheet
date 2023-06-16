import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { pathObject } from "./paths";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box py={4} px={2}>
      <Flex direction="column">
        {pathObject.map((item) => (
          <Link
            key={item.route}
            as={ReactRouterLink}
            to={item.route}
            mb={4}
            p={4}
            bg={pathname === item.route ? "dark.bgGrey" : undefined}
            borderRadius="12px"
          >
            <Flex align="center">
              <Icon as={item.icon} boxSize={6} color="light.text" />
              <Text ml={2} color="light.text">
                {item.name}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
      <Box>
        <Button
          onClick={toggleColorMode}
          size="sm"
          borderRadius="md"
          colorScheme="teal"
        >
          {colorMode === "light" ? (
            <>
              <MoonIcon mr={2} />
              Dark Mode
            </>
          ) : (
            <>
              <SunIcon mr={2} />
              Light Mode
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
