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
  Checkbox,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import styled from "styled-components";

function Form() {
  return (
    <Box maxW="50%">
      <Heading variant="h2" color="blue2" marginBottom={4}>
        Create User
      </Heading>
      <StyledForm>
        <Stack spacing={4}>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input type="text" variant="outline" autoComplete="off" />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" variant="outline" autoComplete="off" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input type="email" variant="outline" autoComplete="off" />
          </FormControl>
          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input type="number" variant="outline" />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input type="text" variant="outline" />
          </FormControl>
          <Link as={ReactRouterLink} to="/">
            <Button type="submit" variant="secondary" size="lg">
              Add User
            </Button>
          </Link>
        </Stack>
      </StyledForm>
    </Box>
  );
}

export default Form;

const StyledForm = styled("form")`
  margin-top: 42px;
`;
