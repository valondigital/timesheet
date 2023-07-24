import {
  createColumnHelper,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import * as yup from "yup";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
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
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string(),
    company: yup.string(),
    address: yup.string(),
  })
  .required();

const columnHelper = createColumnHelper<ITData>();

export const columns: ITDataColumnDef<ITData>[] = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Mobile",
    cell: (info) => info.getValue(),
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

export const inputObjList = (
  register: UseFormRegister<CFormValues>, // Update the type of 'register' to UseFormRegister<CFormValues>
  errors: FieldErrorsImpl<CFormValues> // Update the type of 'errors' to FieldErrorsImpl<CFormValues>
) => [
  {
    name: "firstName", // Use "firstName" instead of "name"
    label: "First Name",
    placeholder: "",
    type: "text",
    register: register("firstName", {
      // Use "firstName" instead of "name"
      required: "Please enter your first name",
    }),
    isInvalid: !!errors.firstName, // Use "firstName" instead of "name"
    error: errors?.firstName, // Use "firstName" instead of "name"
  },
  {
    name: "lastName", // Use "lastName" instead of "description"
    label: "Last Name",
    type: "text",
    register: register("lastName", {
      // Use "lastName" instead of "description"
      required: "Please enter your last name",
    }),
    isInvalid: !!errors.lastName, // Use "lastName" instead of "description"
    error: errors?.lastName, // Use "lastName" instead of "description"
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    register: register("email", {
      required: "Please enter your email address",
    }),
    isInvalid: !!errors.email,
    error: errors?.email,
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    register: register("phone"),
    isInvalid: !!errors.phone,
    error: errors?.phone,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    register: register("company"),
    isInvalid: !!errors.company,
    error: errors?.company,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    register: register("address"),
    isInvalid: !!errors.address,
    error: errors?.address,
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
