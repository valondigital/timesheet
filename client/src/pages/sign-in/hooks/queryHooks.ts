import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { ErrorObj } from "common/types";
import services from "./services";
import { LocationState } from "common/types";

export const useSignIn = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  let from = (location.state as LocationState)
    ? (location.state as LocationState).from!.pathname
    : "/";

    
  return useMutation(services.login, {
    onError: (data: AxiosError) => {
      const errObj: ErrorObj = data.response!.data as ErrorObj;
      toast({
        title: "Invalid Credential",
        description: errObj.errorMsg,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data:  AxiosResponse) => {
      localStorage.setItem("la_auth", data.data.jwt);
      localStorage.setItem("agentId", data.data.object.id);
      localStorage.agentCode = data.data.object.agentCode;
      localStorage.LA_AGENT = JSON.stringify(data.data.object);
      navigate(from, { replace: true });
    },
  });
};