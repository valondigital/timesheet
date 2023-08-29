import {
  useQuery,
  useMutation,
  MutationFunction,
  QueryClient,
} from "@tanstack/react-query";
import Services from "./services";
import { ErrorObj } from "utils/types";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PaginationState } from "@tanstack/react-table";

export const useGetAllLogs = (
  pageProps: PaginationState
) => {
  return useQuery<DefaultData, ErrorObj>(["allLogs", pageProps], () =>
    Services.getAllLogs(pageProps)
  );
};

export const useGetLogDetails = (logId: string) => {
  return useQuery<TDefaultData, ErrorObj>(["logDetails"], () =>
    Services.getLogDetails(logId)
  );
};

export const useGetAllAssignedTasks = (payload: TFormValues) => {
  return useQuery<DefaultData, ErrorObj>(["allAssignedTasks", payload], () =>
    Services.getAllAssignedTasks(payload)
  );
};

export const useGetClockInStatus = () => {
  return useQuery<DefaultData, ErrorObj>(["clockInStatus"], () =>
    Services.getUserClockInStatus()
  );
};

export const useCreateLog = () => {
  const toast = useToast();
  const queryClient = new QueryClient();
  const mutation = useMutation(Services.clockIn, {
    onError: (error: AxiosError<any>) => {
      const errorMessage = error?.response?.data?.message;
      toast({
        title: "Clock In Failed",
        description: errorMessage,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      queryClient.invalidateQueries(["allLogs"]);
      toast({
        title: "Clocked In Succesful",
        description: "You have clocked in successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
  });
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateLog = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const updateLogMutation: MutationFunction<any, [string, any]> = (
    params: [string, any]
  ) => {
    const [logId, payload] = params;
    return Services.updateLog(logId, payload)
      .then((response) => response.data)
      .catch((error) => {
        // You can perform error handling here if needed
        throw error;
      });
  };

  return useMutation(updateLogMutation, {
    onError: (data: AxiosError) => {
      console.log(data, "failed");
      toast({
        title: "Invalid Details",
        description: "Please enter valid inputs",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      toast({
        title: "Clock In Updated",
        description: "ClockIn Updated successfullly",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/timesheet");
    },
  });
};
