import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorMode,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import paths, { pathObject } from "./paths";
import { useUserDetailsContext } from "setup/app-context-manager/UserDetailsContext";
import logo from "assets/brand/logo-white.png";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userDetails } = useUserDetailsContext();

  const filteredPaths = pathObject.filter((item) => {
    return (
      userDetails.role === "admin" ||
      userDetails.role === "super-admin" ||
      userDetails.role === "project-manager" ||
      ![
        "Users",
        "Clients",
        "Projects",
        "All Tasks",
        "Clock In Statistics",
      ].includes(item.name)
    );
  });

  return (
    <Box py={4}>
      <Box height="10vh">
        <Image src={logo} height="100%" width="60%" />
      </Box>
      <Flex direction="column">
        {filteredPaths.map((item) => (
          <Link
            key={item.route}
            as={ReactRouterLink}
            to={item.route}
            p={4}
            bg={pathname === item.route ? "light.secondary" : ""}
            px={2}
          >
            <Flex align="center">
              <Icon
                as={item.icon}
                boxSize={6}
                // color={pathname === item.route ? "dark.text" : "light.text"}
                color="light.text"
              />
              <Text
                ml={2}
                // color={pathname === item.route ? "dark.text" : "light.text"}
                color="light.text"
                variant="nav"
              >
                {item.name}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
