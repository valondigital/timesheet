import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { pathObject } from "./paths";

const Sidebar = () => {
  const { pathname } = useLocation();
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
            borderRadius ="12px"
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
    </Box>
  );
};

export default Sidebar;
