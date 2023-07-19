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
import { useCreateTask, useGetAllTasks } from './hooks/queryHooks';
import { useGetUsers } from './useGetUsers';
import { useGetProjects } from './useGetProjects';

export type TFormValues = {
  name: string;
  description: string;
  project: string;
  assignedTo: string;
};

const Index = () => {
  const { usersData, isLoading: usersLoading } = useGetUsers();
  const { projectsData, isLoading: projectsLoading } = useGetProjects();
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [projects, setProjects] = useState<Record<string, any>[]>([]);
  const [topInputObj, setTopInputObj] = useState<TFormValues>({
    name: '',
    description: '',
    project: '',
    assignedTo: '',
  });
  const { data, isLoading: tasksLoading } = useGetAllTasks(topInputObj);
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
  } = useForm<TFormValues>({ resolver: yupResolver(schema) });

  const getArray = () => {
    const ret = usersData?.map((item) => ({
      value: item?._id,
      name: item?.firstName,
    }));
    const res = projectsData?.map((item) => ({
      value: item?._id,
      name: item?.name,
    }));
    setUsers(ret ?? []);
    setProjects(res ?? []);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    getArray();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, usersData, projectsData, data]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: TFormValues) => {
    createTask({ data: values });
  };

  const topTableButtons = [{ name: 'Create Task', onClick: onOpen }];

  const handleInputChange = (
    name: string,
    value: string | Record<string, Date>
  ) => {
    setTopInputObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProjectToClient = () => {
    // activateAgent(params);
    // handleClose();
  };

  const inputObjList = (
    register: UseFormRegister<TFormValues>,
    errors: FieldErrorsImpl<TFormValues>
  ) => [
    {
      name: 'name',
      label: 'Task',
      placeholder: '',
      type: 'text',
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
      options: projects,

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
      options: users,
      register: register('assignedTo', {
        required: 'Please select an assignee',
      }),
      isInvalid: !!errors.assignedTo,
      error: errors?.assignedTo,
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

  return (
    <>
      <Info>View all tasks and manage them</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={topTableButtons}
      />
      {tasksLoading || usersLoading || projectsLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns} data={data?.Tasks ?? []} />
      )}
      <ModalComponent
        title="Create Task"
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
