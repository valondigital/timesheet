import { useQuery, useMutation, MutationFunction } from "@tanstack/react-query";
import Services from "./services";
import { ErrorObj } from "utils/types";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { PaginationState } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";

export const useGetAllTasks = (
  payload: TFormValues,
  pageProps: PaginationState
) => {
  return useQuery<DefaultData, ErrorObj>(
    ["allTasks", { ...payload, ...pageProps }],
    () => Services.getAllTasks(payload, pageProps)
  );
};

export const useGetAllAssignedTasks = (payload: TFormValues) => {
  return useQuery<DefaultData, ErrorObj>({
    queryKey: ["allAssignedTasks", payload],
    queryFn: () => Services.getAllAssignedTasks(payload),
    keepPreviousData: true,
  });
};

export const useGetTaskDetails = (taskId: string) => {
  return useQuery<Task, ErrorObj>(["taskDetails"], () =>
    Services.getTaskDetails(taskId)
  );
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  const toast = useToast();
  const updateTaskMutation: MutationFunction<any, [string, any]> = (
    params: [string, any]
  ) => {
    const [taskId, payload] = params;
    return Services.updateTask(taskId, payload);
  };

  return useMutation(updateTaskMutation, {
    onError: (data: AxiosError) => {
      toast({
        title: "Invalid Update",
        description: "Please select valid status",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      toast({
        title: "Task Updated",
        description: "Task updated successfullly",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries(['taskDetails']);
    },
  });
};

export const useCreateTask = () => {
  const toast = useToast();
  return useMutation(Services.createTask, {
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
        title: "Task Created",
        description: "Task created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });
};
