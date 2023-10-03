import { useEffect, useState } from "react";
import { Button, useDisclosure, Box } from "@chakra-ui/react";
import ActionModal from "./components/ActionModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Info } from "../../components/Info";
import DynamicTable from "../../components/DynamicTable";
import ModalComponent from "../../components/Modal";
import generateInputs from "../../components/DynamicForm";
import TableTop from "../../components/TableTop";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { columns, schema, tableTopInput } from "./helpers";
import { useGetAllProjects, useCreateProject } from "./hooks/queryHooks";
import { useGetAllClients } from "./../clients/hooks/queryHooks";
import { PaginationState } from "@tanstack/react-table";

export type FormValues = {
  name: string;
  description: string;
  client: string;
};

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    query: string;
  }>({ name: "", query: "" });
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [clientInputObj, setClientInputObj] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string | undefined;
    company: string | undefined;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });
  const { data: clientsData } = useGetAllClients(clientInputObj, {
    pageIndex: 0,
    pageSize: 100,
  });
  const [clients, setClients] = useState<Record<string, any>[]>([]);
  const { data, isLoading } = useGetAllProjects(topInputObj, pageProps);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState("");

  const {
    mutate: createProject,
    isLoading: createProjectLoading,
    isSuccess,
  } = useCreateProject();

  const getArray = () => {
    const res = clientsData?.data?.map((item) => ({
      value: item?._id,
      name: `${item?.firstName} ${item?.lastName}`,
    }));
    setClients(res ?? []);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    getArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, clientsData]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });


  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: FormValues) => {
    createProject({ data: values });
  };

  const topTableButtons = [{ name: "Add Project", onClick: onOpen }];

  const handleInputChange = (
    name: string,
    value: string | Record<string, Date>
  ) => {
    setTopInputObj((prevState: { name: string; query: string }) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleActivate = () => {
    // activateAgent(params);
    // handleClose();
  };

  const inputObjList = (
    register: UseFormRegister<FormValues>,
    errors: FieldErrorsImpl<FormValues>
  ) => [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "",
      type: "text",
      register: register("name", {
        required: "Please enter your first name",
      }),
      isInvalid: !!errors.name,
      error: errors?.name,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      register: register("description", {
        required: "Please enter your project description",
      }),
      isInvalid: !!errors.description,
      error: errors?.description,
    },
    {
      name: "client",
      label: "Client",
      type: "select",
      options: clients,
      register: register("client", {
        required: "Please select an assignee",
      }),
      isInvalid: !!errors.client,
      error: errors?.client,
    },
  ];

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
        <DynamicTable
          columns={columns}
          data={data?.data ?? []}
          setPageProps={setPageProps}
          pageProps={pageProps}
          totalCount={data?.totalElements}
          totalPages={data?.totalPages}
        />
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
