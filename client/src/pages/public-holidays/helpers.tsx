import { createColumnHelper } from "@tanstack/react-table";
import * as yup from "yup";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FiEye, FiMoreHorizontal, FiTrash } from "react-icons/fi";
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

export const statusTypes = [
  { value: true, color: "green", label: "True" },
  { value: false, color: "red", label: "False" },
];

export const getStatusTag = (value: boolean | undefined) => {
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
    date: yup.date().required(),
    notes: yup.string().required(),
    country: yup.string().required(),
  })
  .required();

type NavigateFunction = (to: string) => void;

const columnHelper = createColumnHelper<ITData>();

export const columns = (
  navigate: NavigateFunction
): ITDataColumnDef<ITData>[] => {
  return [
    columnHelper.accessor("name", {
      header: "Holiday",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => {
        const value = info.getValue<string>();
        return formatDateWithoutTime(value) || "Not yet";
      },
    }),
    columnHelper.accessor("country", {
      header: "Region",
      cell: (info) => {
        const value = info.getValue<Record<string, string>>();
        return (
          <Flex>
            <Text mr={4}>{value?.name}</Text>
            <Image
              src={value?.flagUrl}
              sx={{ width: "40px", objectFit: "contain" }}
            />
          </Flex>
        );
      },
    }),
    columnHelper.accessor("notes", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor((row) => row.id, {
    //   header: "Actions",
    //   cell: (info) => {
    //     const originalId = info.row.original._id;
    //     const id: string = typeof originalId === "string" ? originalId : "";

    //     return (
    //       <Box cursor="pointer" onClick={() => navigate(`/staff-leave/${id}`)}>
    //         <Icon as={FiEye} mr={4} />
    //       </Box>
    //     );
    //   },
    // }),
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

export const inputObjList = (leave: Leave) => [
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
    value: `${calculateDateDifference(
      leave?.startLeaveDate,
      leave?.endLeaveDate
    )}`,
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

export const leaveTypes = [
  {
    name: "Educational",
    value: "educational",
  },
  {
    name: "Medical",
    value: "medical",
  },
  {
    name: "Casual",
    value: "casual",
  },
  {
    name: "Other",
    value: "other",
  },
];
