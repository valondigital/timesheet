import { useQuery, useMutation } from '@tanstack/react-query';
import Services from './services';
import { ErrorObj } from 'utils/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';
import { PaginationState } from '@tanstack/react-table';

export const useGetAllClients = (payload: CFormValues, pageProps: PaginationState) => {
  return useQuery<DefaultData, ErrorObj>(['allClients', {...payload, ...pageProps}], () =>
    Services.getAllClients(payload, pageProps)
  );
};

export const useCreateClient = () => {
  const toast = useToast();
  return useMutation(Services.createClient, {
    onError: (data: AxiosError) => {
      console.log(data, 'failed');
      toast({
        title: 'Invalid Details',
        description: 'Please enter valid inputs',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, 'success');
      toast({
        title: 'Client Created',
        description: 'Client created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    },
  });
};
