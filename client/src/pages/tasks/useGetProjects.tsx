import { PaginationState } from "@tanstack/react-table";
import { useGetAllProjects } from "pages/projects/hooks/queryHooks";
import React, { useState } from "react";

export const useGetProjects = () => {
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: "", description: "", project: "", assignedTo: "" });
  const { data, isLoading } = useGetAllProjects(topInputObj, pageProps);
  return {
    projectsData: data?.data,
    isLoading,
  };
};
