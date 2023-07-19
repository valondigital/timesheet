import {
  createColumnHelper,
  CellContext,
} from '@tanstack/react-table';
import * as yup from 'yup';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { FiMoreVertical } from 'react-icons/fi';

import {
  Menu,
  MenuButton,
  MenuList,
  Center,
  Button,
  Tag,
} from '@chakra-ui/react';
import { formatDate } from 'utils/formatDate';

const statusTypes = [
  { name: 'inProgress', color: 'yellow' },
  { name: 'pending', color: 'red' },
  { name: 'completed', color: 'green' },
];

const getStatusTag = (name: string) => {
  let color;
  statusTypes.forEach((status) => {
    if (status.name === name) {
      color = (
        <Tag variant="solid" colorScheme={status.color}>
          {status.name}
        </Tag>
      );
    }
  });
  return color;
};

export const schema = yup
  .object()
  .shape({
    // checkIn: yup.string(),
    // checkOut: yup.string().required(),
    // workHours: yup.number().required(),
    // note: yup.string().required(),
    tasks: yup.array().required(),
  })
  .required();

const columnHelper = createColumnHelper<ITData>();

export const columns = (
  handleClockOut: (data: CellContext<ITData, object | React.ReactNode>) => void
): ITDataColumnDef<ITData>[] => {
  return [
    columnHelper.accessor('checkIn', {
      header: 'Checked In',
      cell: (info) => formatDate(info.getValue<string>()),
    }),
    columnHelper.accessor('workHours', {
      header: 'Work Hours',
      cell: (info) => info.getValue() ?? getStatusTag('pending'),
    }),
    columnHelper.accessor('checkOut', {
      header: 'Checked Out',
      cell: (info) =>
        info.getValue()
          ? formatDate(info.getValue<string>())
          : getStatusTag('pending'),
    }),
    columnHelper.accessor((row) => row.id, {
      header: 'Actions',
      cell: (info) =>
        info.row.original.checkOut ? (
          <Tag variant="solid" colorScheme="green">
            Completed
          </Tag>
        ) : (
          <Menu>
            <MenuButton variant="noBg" p={0} as={Button}>
              <Center>
                <FiMoreVertical />
              </Center>
            </MenuButton>

            <MenuList>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleClockOut(info)}
              >
                Clock Out
              </Button>
            </MenuList>
          </Menu>
        ),
    }),
  ];
};

export type FormValues = {
  name: string;
  description: string;
};

export const inputObjList = (
  register: UseFormRegister<TFormValues>,
  errors: FieldErrorsImpl<TFormValues>
) => [
  {
    name: 'checkIn',
    label: 'Check In',
    placeholder: '',
    type: 'date',
    register: register('name', {
      required: 'Please enter a valid task name',
    }),
    isInvalid: !!errors.name,
    error: errors?.name,
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: '',
    type: 'text',
    register: register('description'),
    isInvalid: !!errors.description,
    error: errors?.description,
  },
  {
    name: 'project',
    label: 'Project',
    placeholder: 'Enter email address',
    type: 'select',
    options: [
      { value: 'pending', name: 'Pending' },
      { value: 'inProgress', name: 'Active' },
      { value: 'completed', name: 'Suspended' },
    ],

    register: register('project', {
      required: 'Please select a parent object',
    }),
    isInvalid: !!errors.project,
    error: errors?.project,
  },
  {
    name: 'assignedTo',
    label: 'Assignee',
    type: 'select',
    options: [
      { value: 'PENDING', name: 'Pending' },
      { value: 'ACTIVE', name: 'Active' },
      { value: 'SUSPENDED', name: 'Suspended' },
      { value: 'IN_ACTIVE', name: 'Inactive' },
      { value: 'ON_HOLD', name: 'On hold' },
    ],
    register: register('assignedTo', {
      required: 'Please select an assignee',
    }),
    isInvalid: !!errors.assignedTo,
    error: errors?.assignedTo,
  },
];

export const tableTopInput = [
  {
    name: 'query',
    label: 'Search',
    placeholder: 'Search by name, email',
    type: 'text',
  },

  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'PENDING', name: 'Pending' },
      { value: 'ACTIVE', name: 'Active' },
      { value: 'SUSPENDED', name: 'Suspended' },
      { value: 'IN_ACTIVE', name: 'Inactive' },
      { value: 'ON_HOLD', name: 'On hold' },
    ],
  },
];

export const tempData = {
  fullName: 'Adeniji Adefisayo',
  state: 'Osun',
  walletBalance: 2300,
  ageBracket: 'THIRTYONE_TO_FORTY',
  mobileNo: '+23498019290019',
  email: 'test@yahoo.com',
};

const orderStatuses = [
  { value: 'COMPLETED', name: 'Completed' },
  { value: 'PENDING', name: 'Pending' },
  { value: 'PROCESSING', name: 'Processing' },
  { value: 'CANCELLED', name: 'Cancelled' },
  { value: '', name: 'All' },
];

export const orderTableTopInput: InputObj[] = [
  {
    name: 'query',
    label: '',
    placeholder: 'Order Number',
    type: 'text',
  },
  {
    name: 'status',
    label: '',
    placeholder: 'Filter by Status',
    type: 'select',
    defaultValue: '',
    options: orderStatuses.map(({ value, name }) => ({ value, name })),
  },

  {
    name: 'dateRange',
    label: '',
    placeholder: '',
    type: 'dateRange',
  },
];

export const data = [
  {
    name: 'Valon Timesheet',
    description: 'This is just a test project',
  },
  {
    name: 'Valon Notepad',
    description: 'This is just a test project',
  },
  {
    name: 'Valon Timesheet',
    description: 'This is just a test project',
  },
];
