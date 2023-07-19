import { useQuery, useMutation, MutationFunction } from '@tanstack/react-query';
import Services from './services';
import { ErrorObj } from 'utils/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useGetAllLogs = () => {
  return useQuery<DefaultData, ErrorObj>(['allLogs'], () =>
    Services.getAllLogs()
  );
};

export const useGetLogDetails = (logId: string) => {
  return useQuery<TDefaultData, ErrorObj>(['logDetails'], () =>
    Services.getLogDetails(logId)
  );
};

// export const useGetLogDetails = (logId: string) => {
//   return useQuery<DefaultData, ErrorObj>(['allLogs'], () =>
//     Services.getLogDetails(logId)
//   );
// };

export const useGetAllAssignedTasks = (payload: TFormValues) => {
  return useQuery<DefaultData, ErrorObj>(['allAssignedTasks', payload], () =>
    Services.getAllAssignedTasks(payload)
  );
};

export const useCreateLog = () => {
  const toast = useToast();
  return useMutation(Services.clockIn, {
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
        title: 'Task Created',
        description: 'Task created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    },
  });
};

export const useUpdateLog = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const updateLogMutation: MutationFunction<any, [string, any]> = (params: [string, any]) => {
    const [logId, payload] = params;
    return Services.updateLog(logId, payload)
      .then(response => response.data)
      .catch(error => {
        // You can perform error handling here if needed
        throw error;
      });
  };

  return useMutation(updateLogMutation, {
    onError: (data: AxiosError) => {
      console.log(data, 'failed');
      toast({
        title: 'Invalid Details',
        description: 'Please enter valid inputs',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, 'success');
      toast({
        title: 'User Clocked Out',
        description: 'You have clocked out successfullly',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      navigate('/timesheet');
    },
  });
};
