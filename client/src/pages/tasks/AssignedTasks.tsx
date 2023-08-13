import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ActionModal from "./components/ActionModal";
import { Info } from "../../components/Info";
import DynamicTable from "../../components/DynamicTable";
import TableTop from "../../components/TableTop";
// import { columns } from './helpers';
import { useGetAllAssignedTasks } from "./hooks/queryHooks";
import useGetTaskColumns from "./useGetTaskColumns";
import { PaginationState } from "@tanstack/react-table";

export type FormValues = {
  name: string;
  description: string;
};

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
    status: string;
  }>({ name: "", description: "", project: "", assignedTo: "", status: "" });
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data, isLoading } = useGetAllAssignedTasks(topInputObj, pageProps);
  console.log({data})
  const columns = useGetTaskColumns();
  const [open, setOpen] = useState(false);

  const [status] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    name: string,
    value: string | Record<string, Date>
  ) => {
    setTopInputObj(
      (prevState: {
        name: string;
        description: string;
        project: string;
        assignedTo: string;
        status: string;
      }) => ({
        ...prevState,
        [name]: value,
      })
    );
  };

  const handleAddProjectToClient = () => {
    // activateAgent(params);
    // handleClose();
  };

  const tableTopInput = [
    {
      name: "query",
      label: "Search",
      placeholder: "Search by name, email",
      type: "text",
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", name: "All" },
        { value: "PENDING", name: "Pending" },
        { value: "IN_PROGRESS", name: "In Progress" },
        { value: "COMPLETED", name: "Completed" },
      ],
    },
  ];

  return (
    <>
      <Info>View all tasks assigned to you</Info>
      <TableTop onChange={handleInputChange} inputObj={tableTopInput} />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable
          columns={columns}
          data={data?.data ?? []}
          setPageProps={setPageProps}
          pageProps={pageProps}
          totalCount={data?.totalElements}
          totalPages={data?.totalPages}
        />
      )}
      <ActionModal
        title="reactivate"
        status={status}
        isOpen={open}
        onClose={handleClose}
        handleSubmit={handleAddProjectToClient}
      />
    </>
  );
};

export default Index;
