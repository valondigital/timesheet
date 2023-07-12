import { useGetAllUsers } from 'pages/users/hooks/queryHooks';
import React, { useState } from 'react';

export const useGetUsers = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: '', description: '', project: '', assignedTo: '' });
  const { data } = useGetAllUsers(topInputObj);

  return {
    usersData: data?.users,
  };
};
