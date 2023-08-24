import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { ErrorObj } from "components/types";
import services from "./services";
import { LocationState } from "components/types";


export const useGetAllClockInStatus = (payload: TFormValues) => {
  return useQuery<DefaultData, ErrorObj>(['allClients', payload], () =>
    services.getAllUsersClockInStats(payload)
  );
};