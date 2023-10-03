import { useQuery, useMutation } from "@tanstack/react-query";
import Services from "./services";
import { ErrorObj } from "utils/types";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { PaginationState } from "@tanstack/react-table";

export const useGetAllProjects = (
  payload: Record<string, string>,
  pageProps: PaginationState
) => {
  return useQuery<DefaultData, ErrorObj>(
    ["allProjects", { ...payload, ...pageProps }],
    () => Services.getAllProjects(payload, pageProps)
  );
};

export const useCreateProject = () => {
  const toast = useToast();
  return useMutation(Services.createProject, {
    onError: (data: AxiosError) => {
      toast({
        title: "Invalid Entries",
        description: "Please enter a valid name for your project",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      toast({
        title: "Project Created",
        description: "Project created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
  });
};
