import { useEffect, useState } from 'react';
import { Button, useDisclosure, Box } from '@chakra-ui/react';
import ActionModal from './ActionModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Info } from '../../components/Info';
import DynamicTable from '../../components/DynamicTable';
import ModalComponent from '../../components/Modal';
import generateInputs from '../../components/DynamicForm';
import TableTop from '../../components/TableTop';
import { useNavigate } from 'react-router-dom';
import {
  columns,
  schema,
  inputObjList,
  tableTopInput,
  data,
} from './components/helpers';
import { useGetAllProjects } from './hooks/queryHooks';

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    query: string;
  }>({ name: '', query: '' });
  const { data, isLoading } = useGetAllProjects(topInputObj);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({});
  const navigate = useNavigate();

  const [status, setStatus] = useState('');

  // const {
  //   mutate: registerAgent,
  //   isLoading: registerAgentLoading,
  //   isSuccess,
  // } = useRegisterAgent();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IFormValues>({ resolver: yupResolver(schema) });

  // const { mutate: activateAgent } = useActivateAgent(params);

  // useEffect(() => {
  //   if (isSuccess) {
  //     onClose();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  // const onSubmit = (values: IFormValues) => {
  //   values.agentId = localStorage.agentId;
  //   registerAgent({ data: values });
  // };

  const topTableButtons = [{ name: 'Add Agents', onClick: onOpen }];

  const handleInputChange = (
    name: string,
    value: string | Record<string, Date>
  ) => {
    setTopInputObj((prevState: { name: string; query: string }) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDeactivateAccount = (status: string, data: any = {}) => {
    const action = status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setStatus(status);
    setParams({ action, agentId: data.row.original.id });
    setOpen(true);
  };

  const handleActivate = () => {
    // activateAgent(params);
    // handleClose();
  };

  console.log(data?.Projects, "check data here")

  return (
    <>
      <Info>View all agent assigned to you and manage them</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={topTableButtons}
      />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable columns={columns} data={data?.Projects ?? []} />
      )}
      <ModalComponent
        title="Register Agent"
        isOpen={isOpen}
        onClose={onClose}
        button={
          <Button
            // onClick={handleSubmit(onSubmit)}
            type="submit"
            // isLoading={registerAgentLoading}
          >
            Submit
          </Button>
        }
      >
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          {inputObjList(register, errors).map((input) => generateInputs(input))}
        </form> */}
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
