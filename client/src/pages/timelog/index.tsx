import { useEffect, useState } from "react";
import {
  Button,
  useDisclosure,
  Box,
  Stack,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Info } from "../../components/Info";
import DynamicTable from "../../components/DynamicTable";
import ModalComponent from "../../components/Modal";
import TableTop from "../../components/TableTop";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { columns, schema } from "./helpers";
import { useGetAllLogs, useCreateLog } from "./hooks/queryHooks";
import { useGetUsersTasks } from "./useGetUsersTasks";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useClockInStatus } from "./useClockInStatus";
import EditLogTasks from "./EditLogTasks";

const Index = () => {
  const { usersTasks } = useGetUsersTasks();
  const navigate = useNavigate();
  const [topInputObj, setTopInputObj] = useState<{
    name: string;
    description: string;
    project: string;
    assignedTo: string;
  }>({ name: "", description: "", project: "", assignedTo: "" });
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const [logId, setLogId] = useState<string | null>(null);
  const { data, isLoading } = useGetAllLogs();
  const { status } = useClockInStatus();

  console.log({ status });
  const [pageProps, setPageProps] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: editOpen,
    onClose: editClose,
    onOpen: onEditOpen,
  } = useDisclosure();
  const queryClient = useQueryClient();

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

  const filterCompletedTasks = (tasks: ITData[] | undefined) => {
    return tasks?.filter((task) => task.status !== "COMPLETED");
  };

  const getArray = () => {
    const filteredTasks = filterCompletedTasks(usersTasks);
    const ret = filteredTasks?.map((item) => ({
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
    queryClient.invalidateQueries(["allLogs"]);
    getArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, usersTasks]);

  function filterFalseTasks(tasks: (string | boolean)[]) {
    return tasks.filter((task) => task !== false);
  }

  const onSubmit = (values: LFormValues) => {
    const filteredTasks = filterFalseTasks(values.tasks);
    clockIn({ data: { ...values, tasks: filteredTasks } });
  };

  const topTableButtons = [{ name: "Clock In", onClick: onOpen, size: "sm" }];

  const inputObjList = (
    register: UseFormRegister<LFormValues>,
    errors: FieldErrorsImpl<LFormValues>
  ) => [
    {
      name: "tasks",
      label: "Please select what tasks you would be working on",
      placeholder: "",
      type: "checkbox",
      options: tasks, // Map the usersTasks directly with checkboxes
      register: register("tasks", {
        required: "Please select a parent object",
      }),
      isInvalid: !!errors.tasks,
      error: errors?.tasks,
    },
  ];

  const tableTopInput = [
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
    navigate(`/timesheet/${data.row.original.id}`);
  };

  const handleEditLog = (data: any = {}) => {
    onEditOpen();
    setLogId(data.row.original.id);
  };

  return (
    <>
      <Info>Clock In and Clock Out to Manage Your Work Hours</Info>
      <TableTop
        onChange={handleInputChange}
        inputObj={tableTopInput}
        buttons={status === "clock-in" && topTableButtons}
      />
      {isLoading ? (
        <Box>...Loading</Box>
      ) : (
        <DynamicTable
          columns={columns(handleClockOut, handleEditLog, status)}
          data={data?.logs ?? []}
          setPageProps={setPageProps}
          pageProps={pageProps}
          totalPages={data?.totalPages}
        />
      )}
      <ModalComponent
        title="Please select a task which you would be working on"
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        button={
          <Button
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            size="lg"
            isLoading={createProjectLoading}
          >
            Submit
          </Button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputObjList(register, errors).map((input) => (
            <VStack
              key={input.name}
              spacing={[1, 5]}
              alignItems="start"
              direction={["column", "row"]}
            >
              {input?.options.map((option, index) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  {...register(`tasks.${index}`)}
                >
                  {option.name}
                </Checkbox>
              ))}
            </VStack>
          ))}
        </form>
      </ModalComponent>
      {logId && (
        <EditLogTasks editOpen={editOpen} editClose={editClose} logId={logId} />
      )}
    </>
  );
};

export default Index;
