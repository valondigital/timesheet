import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import DynamicTable from "components/DynamicTable"
import { useGetLeaveHistory } from "./hooks/queryHooks";
import { Info } from "components/Info";
import { Box } from "@chakra-ui/react";
import { columns } from "./helpers";
import { useNavigate } from "react-router-dom";

const LeaveHistory = () => {
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    query: string;
  }>({ name: "", query: "" });

  const navigate = useNavigate()

  const { data, isLoading } = useGetLeaveHistory(
    topInputObj,
    pageProps
  );

  return (
    <>
      <Info>View all my leave history</Info>
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns(navigate)} data={data?.data ?? []} />
      )}
    </>
  );
};

export default LeaveHistory;
