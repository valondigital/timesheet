import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import paths, { pathObject } from './paths';
import { useUserDetailsContext } from 'setup/app-context-manager/UserDetailsContext';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userDetails } = useUserDetailsContext();

  const filteredPaths = pathObject.filter((item) => {
    return (
      userDetails.role === 'admin' ||
      userDetails.role === 'super-admin' ||
      userDetails.role === 'project-manager' ||
      !['Users', 'Clients', 'Projects', 'All Tasks'].includes(item.name)
    );
  });

  return (
    <Box py={4} px={2}>
      <Flex direction="column">
        {filteredPaths.map((item) => (
          <Link
            key={item.route}
            as={ReactRouterLink}
            to={item.route}
            mb={4}
            p={4}
            bg={pathname === item.route ? '#bee3f8' : undefined}
            borderRadius="12px"
          >
            <Flex align="center">
              <Icon
                as={item.icon}
                boxSize={6}
                color={pathname === item.route ? 'dark.text' : 'light.text'}
              />
              <Text
                ml={2}
                color={pathname === item.route ? 'dark.text' : 'light.text'}
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
