import { useGetAllProjects } from 'pages/projects/hooks/queryHooks';
import React, { useState } from 'react'

export  const useGetProjects = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: '', description: '', project: '', assignedTo: '' });
  const {data, isLoading} = useGetAllProjects(topInputObj)
  return {
    projectsData: data?.Projects,
    isLoading
  }
}

