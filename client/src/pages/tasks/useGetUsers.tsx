import { PaginationState } from "@tanstack/react-table";
import { useGetAllUsers } from "pages/users/hooks/queryHooks";
import { useState } from "react";

export const useGetUsers = () => {
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
  const { data, isLoading } = useGetAllUsers(topInputObj, pageProps);

  return {
    usersData: data,
    isLoading,
  };
};
