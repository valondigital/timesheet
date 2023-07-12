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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import paths, { pathObject } from './paths';
import { useUserDetailsContext } from 'setup/app-context-manager/UserDetailsContext';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { userDetails, updateUserDetails } = useUserDetailsContext();
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
              >
                {item.name}
              </Text>
            </Flex>
          </Link>
        ))}
        {userDetails.role === 'admin' && (
          <Link
            as={ReactRouterLink}
            to={paths.addUser}
            mb={4}
            p={4}
            bg={pathname === paths.addUser ? 'dark.bgGrey' : undefined}
            borderRadius="12px"
          >
            <Flex align="center">
              {/* <Icon as={item.icon} boxSize={6} color="light.text" /> */}
              <Text ml={2} color="light.text">
                Add User
              </Text>
            </Flex>
          </Link>
        )}
      </Flex>
      <Box>
        <Button
          onClick={toggleColorMode}
          size="sm"
          borderRadius="md"
          colorScheme="teal"
        >
          {colorMode === 'light' ? (
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
