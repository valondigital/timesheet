import { createColumnHelper, ColumnDef , CellContext} from "@tanstack/react-table";
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
    mobileNo: yup.string().required(),
    email: yup.string().required(),
    ageBracket: yup.string().required(),
    gender: yup.string().required(),
    state: yup.string().required(),
    agentType: yup.string().required(),
  })
  .required();

const columnHelper = createColumnHelper<ITData>();


export const columns: ITDataColumnDef<ITData>[] = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.id, {
    header: 'Actions',
    cell: (info) => (
      <Menu>
        <MenuButton variant='noBg' p={0} as={Button}>
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


export const inputObjList = (
  register: UseFormRegister<IFormValues>,
  errors: FieldErrorsImpl<{
    [x: string]: string;
  }>
) => [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Your first name",
    type: "text",
    register: register("firstName", {
      required: "Please enter your first name",
    }),
    isInvalid: !!errors.firstName,
    error: errors?.firstName,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    register: register("lastName", {
      required: "Please enter your last name",
    }),
    isInvalid: !!errors.lastName,
    error: errors?.lastName,
  },
  {
    name: "mobileNo",
    label: "Mobile No",
    type: "phone",
    register: register("mobileNo", {
      required: "Please enter your last name",
    }),
    isInvalid: !!errors.mobileNo,
    error: errors?.mobileNo,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    register: register("email", {
      required: "Please enter your last name",
    }),
    isInvalid: !!errors.email,
    error: errors?.email,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    register: register("gender", {
      required: "Please enter your last name",
    }),
    options: ["Male", "Female", "Others"].map((item) => ({
      value: item.toUpperCase(),
      name: item,
    })),
    isInvalid: !!errors.gender,
    error: errors?.gender,
  },
  {
    name: "agenttype",
    label: "Agent Type",
    type: "select",
    register: register("agentType", {
      required: "Please select an agent type",
    }),
    options: [{ value: "BD_AGENT", name: "Business Development Agent(BDA)" }],
    isInvalid: !!errors.agentType,
    error: errors?.agentType,
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
  ]

  export const tempData = {
    fullName: 'Adeniji Adefisayo',
    state: 'Osun',
    walletBalance: 2300,
    ageBracket:'THIRTYONE_TO_FORTY',
    mobileNo: '+23498019290019',
    email: 'test@yahoo.com'
  }


  const orderStatuses = [
    {value: 'COMPLETED', name: 'Completed' },
    {value: 'PENDING', name: 'Pending' },
    {value: 'PROCESSING', name: 'Processing' },
    {value: 'CANCELLED', name: 'Cancelled' },
    { value: "", name: "All" },
  ]

 
export const orderTableTopInput :InputObj[] = [
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
      options: orderStatuses.map(({value, name}) => ({ value, name})),
    },

     {
      name: 'dateRange',
      label: "",
      placeholder: "",
      type: "dateRange",
    },  
  ];


  export const data = [
    {
      name: "Valon Timesheet", 
      description: "This is just a test project"
    },
    {
      name: "Valon Notepad", 
      description: "This is just a test project"
    },
    {
      name: "Valon Timesheet", 
      description: "This is just a test project"
    },
  ]