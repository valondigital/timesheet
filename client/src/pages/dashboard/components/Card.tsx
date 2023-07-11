import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface CustomCardProps {
  title: string;
  amount: number;
  icon: IconType;
}

function Card({ title, amount, icon }: CustomCardProps) {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box>
          <Text variant="cardText">{title}</Text>
          <Text>{amount}</Text>
        </Box>
        <Box>
          <Icon as={icon} boxSize={8} color="light.primary"/>
        </Box>
      </Flex>
    </Box>
  );
}

export default Card;
