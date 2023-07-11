import React from "react";
import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Container,
  Box,
} from "@chakra-ui/react";
import Form from "./components/Form";

const Index = () => {
  return (
    <Flex height="100vh">
      <Grid templateColumns="repeat(2, 1fr)" height="100%">
        <GridItem bgColor="light.primary" height="100%">
          <Container height="100%" px={20}>
            <Flex h="100%" align="center" justify="center">
              <Box>
                <Heading variant="primary" color="textDark" marginBottom={12}>
                  Welcome to Valon TimeTracker.{" "}
                </Heading>
                <Text variant="body" color="textDark">
                  Ready to get started? Sign in now and experience the power of
                  tracking your progress!
                </Text>
              </Box>
            </Flex>
          </Container>
        </GridItem>
        <GridItem>
          <Form />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Index;
