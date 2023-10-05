import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from "@tanstack/react-query";
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

export const useGetLeaveHistory = (
  payload: Record<string, string>,
  pageProps: PaginationState
) => {
  return useQuery<DefaultData, ErrorObj>(
    ["allProjects", { ...payload, ...pageProps }],
    () => Services.getLeaveHistory(payload, pageProps)
  );
};

export const useGetLeaveDetails = (leaveId: string) => {
  return useQuery<Leave, ErrorObj>(["leaveDetails"], () =>
    Services.getLeaveDetails(leaveId)
  );
};

export const useApplyForLeave = () => {
  const toast = useToast();
  return useMutation(Services.applyForLeave, {
    onError: (data: AxiosError) => {
      toast({
        title: "Invalid Entries",
        description: "Leave Application failed",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      toast({
        title: "Leave Applied",
        description: "Leave application successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const updateLeaveMutation: MutationFunction<any, [string, any]> = (
    params: [string, any]
  ) => {
    const [leaveId, payload] = params;
    return Services.updateLeave(leaveId, payload);
  };

  return useMutation(updateLeaveMutation, {
    onError: (data: AxiosError<any>) => {
      toast({
        title: "Invalid Update",
        description: data?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      toast({
        title: "Leave Updated",
        description: "Leave updated successfullly",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries(["leaveDetails"]);
    },
  });
};
