import { useEffect, useState } from 'react';
import { Button, useDisclosure, Box } from '@chakra-ui/react';
import ActionModal from './components/ActionModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Info } from '../../components/Info';
import DynamicTable from '../../components/DynamicTable';
import ModalComponent from '../../components/Modal';
import generateInputs from '../../components/DynamicForm';
import TableTop from '../../components/TableTop';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { columns, schema } from './helpers';
import { useCreateTask, useGetAllLogs } from './hooks/queryHooks';
import { useGetUsersTasks } from './useGetUsersTasks';
import { useGetProjects } from './useGetProjects';

export type FormValues = {
  name: string;
  description: string;
};

const Index = () => {
  const { usersTasks } = useGetUsersTasks();
  const { projectsData } = useGetProjects();
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: '', description: '', project: '', assignedTo: '' });
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const { data, isLoading } = useGetAllLogs();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [open, setOpen] = useState(false);

  const [status] = useState('');

  const {
    mutate: createTask,
    isLoading: createProjectLoading,
    isSuccess,
  } = useCreateTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LFormValues>({ resolver: yupResolver(schema) });

  // const { mutate: activateAgent } = useActivateAgent(params);

  const getArray = () => {
    const ret = usersTasks?.map((item) => ({
      value: item?._id,
      name: item?.name,
    }));

    setTasks(ret ?? []);
    return ret;
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    getArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: LFormValues) => {
    createTask({ data: values });
  };

  const topTableButtons = [{ name: 'Clock In', onClick: onOpen }];

  const handleAddProjectToClient = () => {
    // activateAgent(params);
    // handleClose();
  };

  const inputObjList = (
    register: UseFormRegister<LFormValues>,
    errors: FieldErrorsImpl<LFormValues>
  ) => [
    {
      name: 'checkIn',
      label: 'Check In',
      placeholder: '',
      type: 'date',
      register: register('checkIn', {
        required: 'Please enter a valid task name',
      }),
      isInvalid: !!errors.checkIn,
      error: errors?.checkIn,
    },
    {
      name: 'checkOut',
      label: 'Check Out',
      placeholder: '',
      type: 'text',
      register: register('checkOut'),
      isInvalid: !!errors.checkOut,
      error: errors?.checkOut,
    },
    {
      name: 'workHours',
      label: 'Work Hours',
      placeholder: '',
      type: 'number',
      register: register('workHours'),
      isInvalid: !!errors.workHours,
      error: errors?.workHours,
    },
    {
      name: 'tasks',
      label: 'Tasks',
      placeholder: '',
      type: 'number',
      options: usersTasks?.map((task) => ({
        value: task._id,
        name: task.name,
      })),

      register: register('tasks', {
        required: 'Please select a parent object',
      }),
      isInvalid: !!errors.tasks,
      error: errors?.tasks,
    },
  ];

  const tableTopInput = [
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
      }) => ({
        ...prevState,
        [name]: value,
      })
    );
  };

  return (
    <>
      <Info>Clock In and Clock Out to Manage Your Work Hours</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={topTableButtons}
      />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns} data={data?.logs ?? []} />
      )}
      <ModalComponent
        title="Clock In"
        isOpen={isOpen}
        onClose={onClose}
        button={
          <Button
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            isLoading={createProjectLoading}
          >
            Submit
          </Button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputObjList(register, errors).map((input) => generateInputs(input))}
        </form>
      </ModalComponent>
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
