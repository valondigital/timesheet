import { Box, Flex, Avatar, Text, Divider, Badge, Heading } from "@chakra-ui/react";
import { MdEmail, MdPhone, MdCake, MdWork } from "react-icons/md";
import { useUserDetailsContext } from "setup/app-context-manager/UserDetailsContext";

const Index = () => {
  const { userDetails, updateUserDetails } = useUserDetailsContext();
  return (
    <Box p={4}>
      <Flex align="center" mb={4}>
        <Avatar name={`${userDetails?.firstName} ${userDetails?.lastName}`} size="xl" mr={4} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">{userDetails?.firstName} {userDetails?.lastName}</Text>
          <Badge colorScheme="green">Active</Badge>
        </Box>
      </Flex>
      <Divider mb={4} />
      <Box>
        <Heading variant="tertiary" color="textLight" mb={2}>Personal Information</Heading>
        <Flex align="center" mb={2}>
          <MdEmail size={18} />
          <Text ml={2}>{userDetails?.email}</Text>
        </Flex>
        <Flex align="center" mb={2}>
          <MdPhone size={18} />
          <Text ml={2}>{userDetails?.phone}</Text>
        </Flex>
        <Flex align="center" mb={2}>
          <MdCake size={18} />
          <Text ml={2}>January 1, 1990</Text>
        </Flex>
      </Box>
      <Divider my={4} />
      <Box>
        <Heading variant="tertiary" color="textLight" mb={2}>Employment Details</Heading>
        <Flex align="center" mb={2}>
          <MdWork size={18} />
          <Text ml={2}>Senior Developer</Text>
        </Flex>
        <Text mb={2}><strong>Department:</strong> Engineering</Text>
        <Text mb={2}><strong>Joining Date:</strong> January 1, 2010</Text>
      </Box>
    </Box>
  );
};

export default Index;
