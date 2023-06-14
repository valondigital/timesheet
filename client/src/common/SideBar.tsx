import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { pathObject } from "./paths";

const Sidebar = () => {
  return (
    <Box py={4} px={2}>
      <Flex direction="column" align="center">
        {pathObject.map((item) => (
          <Link key={item.route} as={ReactRouterLink} to={item.route} mb={4}>
            <Flex align="center">
              <Icon as={item.icon} boxSize={6} />
              <Text ml={2}>{item.name}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
