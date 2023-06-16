import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaUser, FaChartBar, FaClock, FaMoneyBillAlt } from "react-icons/fa";

const Metrics = () => {
  return (
    <Box bg="white" borderRadius="lg" boxShadow="xl" p={6} width="300px">
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Flex align="center" justify="center" mb={4}>
          <Icon as={FaUser} boxSize={16} color="light.primary" />
        </Flex>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={2} textAlign="center">
            Employee Metrics
          </Text>
          <Flex align="center" justify="space-between" mb={2}>
            <Flex direction="column" align="center">
              <Icon as={FaChartBar} boxSize={6} color="gray.500" mb={2} />
              <Text color="gray.500">Sales</Text>
              <Text fontSize="lg" fontWeight="bold">
                123
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Icon as={FaClock} boxSize={6} color="gray.500" mb={2} />
              <Text color="gray.500">Hours Worked</Text>
              <Text fontSize="lg" fontWeight="bold">
                160
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" justify="center">
            <Icon as={FaMoneyBillAlt} boxSize={6} color="gray.500" mr={2} />
            <Text fontSize="sm" color="gray.500">
              Last Updated: June 16, 2023
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Metrics;
