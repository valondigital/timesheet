import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Services from './services';
import { ErrorObj } from 'utils/types';
import { AxiosError, AxiosResponse } from 'axios';

export const useGetAllProjects = (payload: Record<string, string>) => {
  return useQuery<DefaultData, ErrorObj>(['allProjects', payload], () =>
    Services.getAllProjects(payload)
  );
};
