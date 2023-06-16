import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface CustomCardProps {
  title: string;
  amount: number;
  icon: string;
}


function Card({title, amount, icon}: CustomCardProps) {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box>
          <Text variant="cardText">{title}</Text>
          <Text>{amount}</Text>
        </Box>
        <Box>
          <Image src={icon}/>
        </Box>
      </Flex>
    </Box>
  );
}

export default Card;
