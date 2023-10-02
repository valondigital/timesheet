import { useQuery } from "@tanstack/react-query";
import { ErrorObj } from "components/types";
import services from "./services";


export const useGetAllClockInStatus = (payload: {date: string}) => {
  return useQuery<DefaultData, ErrorObj>(['allClients', payload], () =>
    services.getAllUsersClockInStats(payload)
  );
};