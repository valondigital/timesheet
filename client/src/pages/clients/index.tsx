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
import { useCreateClient, useGetAllClients } from './hooks/queryHooks';

export type FormValues = {
  name: string;
  description: string;
};

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
  }>({ firstName: '', lastName: '', email: '', phone: 0 });
  const { data, isLoading } = useGetAllClients(topInputObj);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState('');

  const {
    mutate: createProject,
    isLoading: createProjectLoading,
    isSuccess,
  } = useCreateClient();

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
    createProject({ data: values });
  };

  const topTableButtons = [{ name: 'Add Client', onClick: onOpen }];

  const handleInputChange = (
    name: string,
    value: string | Record<string, Date>
  ) => {
    setTopInputObj(
      (prevState: {
        firstName: string;
        lastName: string;
        email: string;
        phone: number;
      }) => ({
        ...prevState,
        [name]: value,
      })
    );
  };

  const handleActivate = () => {
    // activateAgent(params);
    // handleClose();
  };


  return (
    <>
      <Info>View all projects and manage them</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={topTableButtons}
      />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns} data={data?.Clients ?? []} />
      )}
      <ModalComponent
        title="Create Project"
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
        handleSubmit={handleActivate}
      />
    </>
  );
};

export default Index;
