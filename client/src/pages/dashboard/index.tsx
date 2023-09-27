import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import Card from "./components/Card";
import Metrics from "./components/Metrics";
import { stats } from "./helpers";
import styled from "styled-components";
import WelcomeCard from "./components/WelcomeCard";

const Index = () => {
  return (
    <Box>
      <WelcomeCard />
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {stats.map((item) => (
          <StyledGridItem p={4} bg="white">
            <Card title={item.title} amount={item.amount} icon={item.icon} />
          </StyledGridItem>
        ))}
      </Grid>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} my={8}>
        {stats.map((item) => (
          <Metrics />
        ))}
      </Grid>
    </Box>
  );
};

export default Index;

const StyledGridItem = styled(Box)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
`;
