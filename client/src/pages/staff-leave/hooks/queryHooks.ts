import { useQuery, useMutation } from "@tanstack/react-query";
import Services from "./services";
import { ErrorObj } from "utils/types";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { PaginationState } from "@tanstack/react-table";

export const useGetAllLeaveApplications = (
  payload: Record<string, string>,
  pageProps: PaginationState
) => {
  return useQuery<DefaultData, ErrorObj>(
    ["allProjects", { ...payload, ...pageProps }],
    () => Services.getAllLeaveApplications(payload, pageProps)
  );
};

