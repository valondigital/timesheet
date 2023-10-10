import {
  createColumnHelper,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import { Icon } from "@chakra-ui/react";
import * as yup from "yup";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { FiEye, FiMoreHorizontal, FiTrash } from "react-icons/fi";

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
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.number().required(),
    country: yup.string().required(),
  })
  .required();

const columnHelper = createColumnHelper<ITData>();

export const columns = (navigate: NavigateFunction): ITDataColumnDef<ITData>[] => {
  return [
    columnHelper.accessor("name", {
      header: "Department",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("hod", {
      header: "Head Of Department",
      cell: (info) => {
        const value = info.getValue<Record<string, string>>();
        return `${value?.firstName} ${value?.lastName}`;
      },
    }),
    columnHelper.accessor((row) => row.id, {
      header: "Actions",
      cell: (info) => {
        const originalId = info.row.original._id;
        const id: string = typeof originalId === "string" ? originalId : "";

        return (
          <Menu size="sm">
            <MenuButton p={0} as={Button}>
              <Center>
                <FiMoreHorizontal />
              </Center>
            </MenuButton>
            <MenuList>
              <MenuItem minH="48px" onClick={() => navigate(id)}>
                <Icon as={FiEye} mr={4} />
                <span>View</span>
              </MenuItem>
              <MenuItem minH="48px">
                <Icon as={FiTrash} mr={4} />
                <span>Delete</span>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    }),
  ];
};

export type FormValues = {
  name: string;
  description: string;
};

export const inputObjList = (
  register: UseFormRegister<IFormValues>,
  errors: FieldErrorsImpl<IFormValues>
) => [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "",
    type: "text",
    register: register("firstName", {
      required: "Please enter a valid task name",
    }),
    isInvalid: !!errors.firstName,
    error: errors?.firstName,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "",
    type: "text",
    register: register("lastName", {
      required: "Please enter a valid task name",
    }),
    isInvalid: !!errors.lastName,
    error: errors?.lastName,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "",
    type: "email",
    register: register("email", {
      required: "Please enter a valid task name",
    }),
    isInvalid: !!errors.email,
    error: errors?.email,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "",
    type: "number",
    register: register("phone", {
      required: "Please enter a valid Mobile Number",
    }),
    isInvalid: !!errors.phone,
    error: errors?.phone,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "",
    type: "text",
    register: register("country", {
      required: "Please enter a valid country",
    }),
    isInvalid: !!errors.country,
    error: errors?.country,
  },
];

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
