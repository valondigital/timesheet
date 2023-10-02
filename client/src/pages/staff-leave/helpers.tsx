import { createColumnHelper } from "@tanstack/react-table";
import * as yup from "yup";
import { Icon } from "@chakra-ui/react";
import { FiDelete, FiEye, FiMoreHorizontal, FiTrash } from "react-icons/fi";
import {
  calculateDateDifference,
  formatDate,
  formatDateWithoutTime,
} from "utils/formatDate";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Button,
  Tag,
} from "@chakra-ui/react";

const statusTypes = [
  { value: "approved", color: "green", label: "Approved" },
  { value: "pending", color: "yellow", label: "Pending" },
  { value: "declined", color: "red", label: "Declined" },
];

export const getStatusTag = (value: string | undefined) => {
  let color;
  statusTypes.forEach((status) => {
    if (status.value === value) {
      color = (
        <Tag variant="solid" colorScheme={status.color}>
          {status.label}
        </Tag>
      );
    }
  });
  return color;
};

export const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    client: yup.string().required(),
  })
  .required();

type NavigateFunction = (to: string) => void;

const columnHelper = createColumnHelper<ITData>();

export const columns = (
  navigate: NavigateFunction
): ITDataColumnDef<ITData>[] => {
  return [
    columnHelper.accessor("applicant", {
      header: "Staff Name",
      cell: (info) => {
        const firstName = info.getValue<Record<string, string>>()?.firstName;
        const lastName = info.getValue<Record<string, string>>()?.lastName;
        return `${firstName} ${lastName}`;
      },
    }),
    columnHelper.accessor("leaveType", {
      header: "Leave Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Applied Date",
      cell: (info) => {
        const value = info.getValue<string>();
        return formatDate(value) || "Not yet";
      },
    }),
    columnHelper.accessor("hodApproval", {
      header: "HOD Status",
      cell: (info) => {
        const status = info.getValue<Record<string, string>>()?.status;
        return getStatusTag(status);
      },
    }),
    columnHelper.accessor("adminApproval", {
      header: "Admin Status",
      cell: (info) => {
        const status = info.getValue<Record<string, string>>()?.status;
        return getStatusTag(status);
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

export const inputObjList = (leave : Leave) => [
  {
    name: "name",
    label: "Full Name",
    value: `${leave?.applicant?.firstName} ${leave?.applicant?.lastName}`,
    type: "text",
  },
  {
    name: "email",
    label: "Email Address",
    value: `${leave?.applicant?.email}`,
    type: "email",
  },
  {
    name: "phone",
    label: "Phone Number",
    value: `${leave?.applicant?.phone}`,
    type: "number",
  },
  {
    name: "leaveType",
    label: "Leave Type",
    value: `${leave?.leaveType}`,
    type: "text",
  },
  {
    name: "appliedDate",
    label: "Applied Date",
    value: `${formatDate(leave?.createdAt) || "Null"}`,
    type: "text",
  },
  {
    name: "noOfDays",
    label: "Applied No. Of Days",
    value: `${
      calculateDateDifference(leave?.startLeaveDate, leave?.endLeaveDate)
    }`,
    type: "text",
  },
  {
    name: "avalableNoOfDays",
    label: "Available No. Of Days",
    value: `${leave?.applicant?.availableLeaveDays}`,
    type: "text",
  },
  {
    name: "leavePeriod",
    label: "Leave Period",
    value: `From ${formatDateWithoutTime(
      leave?.startLeaveDate
    )} to ${formatDateWithoutTime(leave?.endLeaveDate)}`,
    type: "text",
  },
  {
    name: "appliedDate",
    label: "Applied Date",
    value: `${formatDate(leave?.createdAt) || "Null"}`,
    type: "text",
  },
];