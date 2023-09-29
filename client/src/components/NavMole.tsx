import { Box, HStack, Text } from '@chakra-ui/react';
import { VscTriangleDown } from 'react-icons/vsc';
import { FiLogOut } from 'react-icons/fi';

const NavMole = ({
  name,
  icon,
  isLogout,
}: {
  name: string;
  icon: React.ReactNode;
  isLogout?: boolean;
}) => {
  return (
    <HStack color={isLogout ? 'red' : 'none'} pb={3}>
      {!isLogout && <Box visibility='hidden'>
        <VscTriangleDown />
      </Box>}

      {isLogout && <FiLogOut />}
      <Text fontSize='sm' variant='nav'>{name}</Text>
    </HStack>
  );
};

export default NavMole;
