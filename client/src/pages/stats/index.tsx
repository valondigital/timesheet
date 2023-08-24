import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Info } from "../../components/Info";
import DynamicTable from "../../components/DynamicTable";
import { columns } from "./helpers";
import { useGetAllClockInStatus } from "./hooks/queryHooks";

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: "", description: "", project: "", assignedTo: "" });
  const { data, isLoading } = useGetAllClockInStatus(topInputObj);

  console.log(data, "here is the datate !!!")

  return (
    <>
      <Info>View all users and manage them</Info>
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns} data={data?.data ?? []} />
      )}
    </>
  );
};

export default Index;
