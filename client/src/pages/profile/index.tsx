import { Box, Flex, Avatar, Text, Divider, Badge, Heading } from "@chakra-ui/react";
import { MdEmail, MdPhone, MdCake, MdWork } from "react-icons/md";

const Index = () => {
  const randomImageUrl = "https://images.pexels.com/photos/15663076/pexels-photo-15663076/free-photo-of-a-man-driving-a-car.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";

  return (
    <Box p={4}>
      <Flex align="center" mb={4}>
        <Avatar name="John Doe" size="xl" src={randomImageUrl} mr={4} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">John Doe</Text>
          <Badge colorScheme="green">Active</Badge>
        </Box>
      </Flex>
      <Divider mb={4} />
      <Box>
        <Heading variant="tertiary" color="textLight" mb={2}>Personal Information</Heading>
        <Flex align="center" mb={2}>
          <MdEmail size={18} />
          <Text ml={2}>john.doe@example.com</Text>
        </Flex>
        <Flex align="center" mb={2}>
          <MdPhone size={18} />
          <Text ml={2}>+1234567890</Text>
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
