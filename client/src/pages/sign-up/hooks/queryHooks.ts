import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { ErrorObj } from "components/types";
import services from "./services";
import { LocationState } from "components/types";

export const useSignUp = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  let from = (location.state as LocationState)
    ? (location.state as LocationState).from!.pathname
    : "/";

  return useMutation(services.signup, {
    onError: (data: AxiosError) => {
      console.log(data, "failed");
      const errObj: ErrorObj = data.response!.data as ErrorObj;
      console.log(errObj, "errorssssssssssssssssss")
      toast({
        title: "message",
        description: `<div>${data?.response?.data}</div>`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      toast({
        title: "User Created",
        description: "User Created Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate(from, { replace: true });
    },
  });
};
