import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import DynamicTable from "components/DynamicTable"
import { useGetAllLeaveApplications } from "./hooks/queryHooks";
import { Info } from "components/Info";
import { Box } from "@chakra-ui/react";
import { columns } from "./helpers";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    query: string;
  }>({ name: "", query: "" });

  const navigate = useNavigate()

  const { data, isLoading } = useGetAllLeaveApplications(
    topInputObj,
    pageProps
  );

  return (
    <>
      {/* <TableTop onChange={handleInputChange} inputObj={tableTopInput} /> */}
      <Info>View all users and manage them</Info>
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns(navigate)} data={data?.data ?? []} />
      )}
    </>
  );
};

export default Index;
