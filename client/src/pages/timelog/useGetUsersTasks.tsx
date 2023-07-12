import React, { useState } from 'react';
import { useGetAllAssignedTasks } from './hooks/queryHooks';

export const useGetUsersTasks = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: '', description: '', project: '', assignedTo: '' });
  const { data } = useGetAllAssignedTasks(topInputObj);

  return {
    usersTasks: data?.Tasks,
  };
};
