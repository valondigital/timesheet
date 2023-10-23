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
import { useNavigate } from "react-router-dom";
import { columns, schema, inputObjList, tableTopInput, data } from "./helpers";
import {  useGetAllDepartments, useCreateDepartment } from "./hooks/queryHooks";
import { PaginationState } from "@tanstack/react-table";

const Index = () => {
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: "", description: "", project: "", assignedTo: "" });
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data, isLoading } = useGetAllDepartments(topInputObj, pageProps);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()


  const [status, setStatus] = useState("");

  const {
    mutate: createUser,
    isLoading: createProjectLoading,
    isSuccess,
  } = useCreateDepartment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DFormValues>({ resolver: yupResolver(schema) });

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

  const onSubmit = (values: DFormValues) => {
    createUser({ data: values });
  };

  const topTableButtons = [{ name: "Create Department", onClick: onOpen }];

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
      <Info>View all departments and manage them</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={topTableButtons}
      />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable
          columns={columns(navigate)}
          data={data?.data ?? []}
          setPageProps={setPageProps}
          pageProps={pageProps}
          totalCount={data?.totalElements}
          totalPages={data?.totalPages}
        />
      )}
      <ModalComponent
        title="Create Department"
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
