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

function index() {
  return (
    <Flex height="100vh">
      <Grid templateColumns="repeat(2, 1fr)" height="100%">
        <GridItem bgColor="light.primary" height="100%">
          <Container height="100%" px={20}>
            <Flex h="100%" align="center" justify="center">
              <Box>
                <Heading variant="primary" color="textDark" marginBottom={12}>
                  Take your trading game to the next level.{" "}
                </Heading>
                <Text variant="body" color="textDark">
                  Ready to get started? Sign up now and experience the power of
                  AI trading for yourself. It's easy to join – simply fill out
                  the form and start trading smarter today!
                </Text>
              </Box>
            </Flex>
          </Container>
        </GridItem>
        <GridItem>
          <Form/>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default index;
