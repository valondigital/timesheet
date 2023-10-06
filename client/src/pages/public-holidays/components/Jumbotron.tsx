import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from "@chakra-ui/react";

const LeaveDetailsHeader = () => {
  return (
    <Box bg="white" shadow="md" rounded="lg" p={6} mb={8}>
      <Text fontSize="xl" fontWeight="semibold" mb={2}>
        Leave Details
      </Text>
      <Breadcrumb spacing="1">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Leaves</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Leave Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
};

export default LeaveDetailsHeader;
