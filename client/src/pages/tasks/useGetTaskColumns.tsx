import { Button } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStatusTag } from "./helpers";

const useGetTaskColumns = () => {
  const columnHelper = createColumnHelper<ITData>();
  const history = useNavigate();

  const handleNavigation = (id: object | ReactNode) => {
    history(`/tasks/${id}`);
  };

  const columns: ITDataColumnDef<ITData>[] = [
    columnHelper.accessor("name", {
      header: "Task",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("project", {
      header: "Project",
      cell: (info) => info.getValue<Record<string, string>>()?.name,
    }),
    columnHelper.accessor("assignedTo", {
      header: "Assignee",
      cell: (info) => info.getValue<Record<string, string>>()?.firstName,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => getStatusTag(info.getValue<string>()),
    }),
    columnHelper.accessor((row) => row.id, {
      header: "Actions",
      cell: (info) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleNavigation(info.getValue())}
        >
          View Details
        </Button>
      ),
    }),
  ];
  return columns;
};

export default useGetTaskColumns;
