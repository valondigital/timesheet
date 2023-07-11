import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { ErrorObj } from "components/types";
import services from "./services";
import { LocationState } from "components/types";

export const useSignIn = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  let from = (location.state as LocationState)
    ? (location.state as LocationState).from!.pathname
    : "/";

  return useMutation(services.login, {
    onError: (data: AxiosError) => {
      console.log(data, "failed");
      const errObj: ErrorObj = data.response!.data as ErrorObj;
      toast({
        title: "Invalid Credential",
        description: "Please enter your correct email and address",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      localStorage.setItem("jwt_token", data.data.token);
      localStorage.setItem("userId", data.data.data.user._id);
      localStorage.setItem("user", JSON.stringify(data.data.data.user));
      navigate(from, { replace: true });
    },
  });
};
