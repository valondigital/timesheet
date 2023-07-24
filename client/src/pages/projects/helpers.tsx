import {
  createColumnHelper,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import * as yup from "yup";
import { FiMoreVertical } from "react-icons/fi";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Button,
  Text,
} from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    client: yup.string().required(),
  })
  .required();

const columnHelper = createColumnHelper<ITData>();

export const columns: ITDataColumnDef<ITData>[] = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("client", {
    header: "Client",
    cell: (info) => {
      const firstName = info.getValue<Record<string, string>>()?.firstName;
      const lastName = info.getValue<Record<string, string>>()?.lastName;
      return `${firstName} ${lastName}`
    },
  }),
  columnHelper.accessor((row) => row.id, {
    header: "Actions",
    cell: (info) => (
      <Menu>
        <MenuButton variant="noBg" p={0} as={Button}>
          <Center>
            <FiMoreVertical />
          </Center>
        </MenuButton>

        <MenuList>
          <MenuItem>View Detail</MenuItem>
        </MenuList>
      </Menu>
    ),
  }),
];

export type FormValues = {
  name: string;
  description: string;
};

export const tableTopInput = [
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
      { value: "PENDING", name: "Pending" },
      { value: "ACTIVE", name: "Active" },
      { value: "SUSPENDED", name: "Suspended" },
      { value: "IN_ACTIVE", name: "Inactive" },
      { value: "ON_HOLD", name: "On hold" },
    ],
  },
];

export const tempData = {
  fullName: "Adeniji Adefisayo",
  state: "Osun",
  walletBalance: 2300,
  ageBracket: "THIRTYONE_TO_FORTY",
  mobileNo: "+23498019290019",
  email: "test@yahoo.com",
};

const orderStatuses = [
  { value: "COMPLETED", name: "Completed" },
  { value: "PENDING", name: "Pending" },
  { value: "PROCESSING", name: "Processing" },
  { value: "CANCELLED", name: "Cancelled" },
  { value: "", name: "All" },
];

export const orderTableTopInput: InputObj[] = [
  {
    name: "query",
    label: "",
    placeholder: "Order Number",
    type: "text",
  },
  {
    name: "status",
    label: "",
    placeholder: "Filter by Status",
    type: "select",
    defaultValue: "",
    options: orderStatuses.map(({ value, name }) => ({ value, name })),
  },

  {
    name: "dateRange",
    label: "",
    placeholder: "",
    type: "dateRange",
  },
];

export const data = [
  {
    name: "Valon Timesheet",
    description: "This is just a test project",
  },
  {
    name: "Valon Notepad",
    description: "This is just a test project",
  },
  {
    name: "Valon Timesheet",
    description: "This is just a test project",
  },
];
