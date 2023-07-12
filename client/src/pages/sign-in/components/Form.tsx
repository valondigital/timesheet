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
  FormErrorMessage,
  Input,
  Stack,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import * as yup from "yup";
import { useSignIn } from "../hooks/queryHooks";
import { CircularProgress } from "@chakra-ui/react";

export type FormValues = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Form() {
  const { mutate, isLoading } = useSignIn();
  // const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormValues) => {
    mutate({ data });
  };

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
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  variant="outline"
                  autoComplete="off"
                  {...register("email")}
                />
                {errors?.email && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  variant="outline"
                  {...register("password")}
                />
                {errors?.email && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <Flex justifyContent="space-between" align="center">
                <Checkbox defaultChecked>Remember Me</Checkbox>
                <Link color="blue.500" fontSize="sm" href="#">
                  Forgot Password?
                </Link>
              </Flex>
              <Button type="submit" variant="secondary" size="lg">
                {isLoading ? (
                  <CircularProgress isIndeterminate color="green" size={8}/>
                ) : (
                  "Log in"
                )}
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
