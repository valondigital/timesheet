import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Services from './services';
import { ErrorObj } from 'utils/types';
import { Params } from "components/types";
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';

export const useGetAllProjects = (payload: Record<string, string>) => {
  return useQuery<DefaultData, ErrorObj>(['allProjects', payload], () =>
    Services.getAllProjects(payload)
  );
};

export const useCreateProject = () => {
  const toast = useToast();
  return useMutation(Services.createProject, {
    onError: (data: AxiosError) => {
      console.log(data, "failed");
      const errObj: ErrorObj = data.response!.data as ErrorObj;
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
