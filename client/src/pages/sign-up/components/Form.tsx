import React from "react";
import {
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSignUp } from "../hooks/queryHooks";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  country: string;
};

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.number().required(),
    country: yup.string().required(),
  })
  .required();

function Form() {
  const { mutate, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormValues) => {
    console.log(data)
    mutate({ data });
  };
  return (
    <Box maxW="50%">
      <Heading variant="h2" color="blue2" marginBottom={4}>
        Create User
      </Heading>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              variant="outline"
              autoComplete="off"
              {...register("firstName")}
            />
          </FormControl>
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              variant="outline"
              autoComplete="off"
              {...register("lastName")}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              variant="outline"
              autoComplete="off"
              {...register("email")}
            />
          </FormControl>
          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input type="number" variant="outline" {...register("phone")} />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input type="text" variant="outline" {...register("country")} />
          </FormControl>
          <Button
            type="submit"
            variant="secondary"
            size="lg"
          >
           {isLoading ? (
                  <CircularProgress isIndeterminate color="blue" size={8}/>
                ) : (
                  "Log in"
                )}
          </Button>
        </Stack>
      </StyledForm>
    </Box>
  );
}

export default Form;

const StyledForm = styled("form")`
  margin-top: 42px;
`;
