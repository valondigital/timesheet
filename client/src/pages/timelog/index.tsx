import { useEffect, useState } from 'react';
import { Button, useDisclosure, Box } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Info } from '../../components/Info';
import DynamicTable from '../../components/DynamicTable';
import ModalComponent from '../../components/Modal';
import generateInputs from '../../components/DynamicForm';
import TableTop from '../../components/TableTop';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { columns, schema } from './helpers';
import {
  useGetAllLogs,
  useCreateLog,
} from './hooks/queryHooks';
import { useGetUsersTasks } from './useGetUsersTasks';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { usersTasks } = useGetUsersTasks();
  const navigate = useNavigate()
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: '', description: '', project: '', assignedTo: '' });
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const { data, isLoading } = useGetAllLogs();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    mutate: clockIn,
    isLoading: createProjectLoading,
    isSuccess,
  } = useCreateLog();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LFormValues>({ resolver: yupResolver(schema) });

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
  }, [isSuccess, usersTasks]);

  const onSubmit = (values: LFormValues) => {
    clockIn({ data: values });
  };

  const topTableButtons = [{ name: 'Clock In', onClick: onOpen }];

  const inputObjList = (
    register: UseFormRegister<LFormValues>,
    errors: FieldErrorsImpl<LFormValues>
  ) => [
    {
      name: 'tasks',
      label: 'Please select what tasks you would be working on',
      placeholder: '',
      type: 'checkbox',
      options: tasks,
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

  const handleClockOut = (data: any = {}) => {
    console.log(data.row.original)
    navigate(`/timesheet/${data.row.original.id}`);
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
        <DynamicTable
          columns={columns(handleClockOut)}
          data={data?.logs ?? []}
        />
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
    </>
  );
};

export default Index;
