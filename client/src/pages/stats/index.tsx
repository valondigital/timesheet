import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Info } from "../../components/Info";
import DynamicTable from "../../components/DynamicTable";
import { columns, getFormattedDate } from "./helpers";
import { useGetAllClockInStatus } from "./hooks/queryHooks";
import TableTop from "./../../components/TableTop";

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    date: string;
  }>({
    date: getFormattedDate(),
  });
  const { data, isLoading } = useGetAllClockInStatus(topInputObj);

  const tableTopInput = [
    {
      name: "date",
      label: "Filter clock in and out status by date",
      placeholder: "Search by name, email",
      type: "date",
    },
  ];

  const handleInputChange = (
    name: string,
    value: string | Record<string, Date>
  ) => {
    setTopInputObj(
      (prevState: {
        date: string;
      }) => ({
        ...prevState,
        [name]: value,
      })
    );
  };

  return (
    <>
      <TableTop onChange={handleInputChange} inputObj={tableTopInput} />
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
