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
import { useNavigate } from 'react-router-dom';
import { columns, schema, inputObjList, tableTopInput, data } from './helpers';
import { useSignUp, useGetAllUsers } from './hooks/queryHooks';

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: '', description: '', project: '', assignedTo: '' });
  const { data, isLoading } = useGetAllUsers(topInputObj);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState('');

  const {
    mutate: createUser,
    isLoading: createProjectLoading,
    isSuccess,
  } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });

  // const { mutate: activateAgent } = useActivateAgent(params);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: IFormValues) => {
    createUser({ data: values });
  };

  const topTableButtons = [{ name: 'Add User', onClick: onOpen }];

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

  const handleAddProjectToClient = () => {
    // activateAgent(params);
    // handleClose();
  };

  return (
    <>
      <Info>View all users and manage them</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={topTableButtons}
      />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns} data={data?.users ?? []} />
      )}
      <ModalComponent
        title="Add User"
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
