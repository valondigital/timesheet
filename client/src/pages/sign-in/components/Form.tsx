import React from "react";
import {
  Container,
  Heading,
  Text,
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link, 
  Checkbox
} from "@chakra-ui/react";
import styled from "styled-components";

function Form() {
  return (
    <Container height="100%" px={20}>
      <Flex h="100%" align="center" justify="center">
        <Box>
          <Heading variant="h1" color="light.blue1" marginBottom={4}>
            Welcome Back
          </Heading>
          <Text variant="body" color="textWhite">
            Our AI technology is here to help you succeed!
          </Text>
          <StyledForm>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input type="email" variant="outline" autoComplete="off" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" variant="outline" />
              </FormControl>
              <Flex justifyContent="space-between" align="center">
                <Checkbox defaultChecked>Remember Me</Checkbox>
                <Link color="blue.500" fontSize="sm" href="#">
                  Forgot Password?
                </Link>
              </Flex>
              <Button type="submit" variant="secondary" size="lg">
                Log in
              </Button>
            </Stack>
          </StyledForm>
        </Box>
      </Flex>
    </Container>
  );
}

export default Form;

const StyledForm = styled("form")`
  margin-top: 42px;
`;
