import React, { useEffect } from "react";
import { Button, Checkbox, VStack } from "@chakra-ui/react";
import ModalComponent from "components/Modal";
import { useGetLogDetails, useUpdateLog } from "./hooks/queryHooks";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FieldErrorsImpl } from "react-hook-form";
import { useForm } from "react-hook-form";
import { schema } from "./helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUsersTasks } from "./useGetUsersTasks";

type Props = {
  editOpen: boolean;
  editClose: () => void;
  logId: string;
};

type LFormValues = {
  tasks: any[]; // Adjust the type according to your requirements
};

const EditLogTasks = ({ editOpen, editClose, logId }: Props) => {
  const { data } = useGetLogDetails(logId);
  const { usersTasks } = useGetUsersTasks();
  const { mutate: updateLog } = useUpdateLog();
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LFormValues>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (data) {
      const selectedTasks = data?.log?.tasks;
      const filteredTasks = filterCompletedTasks(usersTasks);
      const ret = filteredTasks?.map((item) => ({
        value: item?._id,
        name: item?.name,
        checked:
          selectedTasks?.some(
            (selectedTask) => selectedTask._id === item?._id
          ) || false,
      }));
      setTasks(ret ?? []);
    }
  }, [usersTasks, data]);

  function filterFalseTasks(tasks: (string | boolean)[]) {
    return tasks.filter((task) => task !== false);
  }

  const onSubmit = (values: LFormValues) => {
    const filteredTasks = filterFalseTasks(values.tasks);
    updateLog([logId, { tasks: filteredTasks }]);
    editClose()
  };

  const filterCompletedTasks = (tasks: ITData[] | undefined) => {
    return tasks?.filter((task) => task.status !== "COMPLETED");
  };

  const inputObjList = (
    register: UseFormRegister<LFormValues>,
    errors: FieldErrorsImpl<LFormValues>
  ) => [
    {
      name: "tasks",
      label: "Please select what tasks you would be working on",
      placeholder: "",
      type: "checkbox",
      options: tasks,
      register: register("tasks", {
        required: "Please select a parent object",
      }),
      isInvalid: !!errors.tasks,
      error: errors?.tasks,
    },
  ];

  if (!data) {
    return null; // Return a loading indicator or custom message if desired
  }

  return (
    <ModalComponent
      title="Please edit your Timelog for Today"
      isOpen={editOpen}
      onClose={editClose}
      size="2xl"
      button={
        <Button
          variant="secondary"
          onClick={handleSubmit(onSubmit)}
          type="submit"
          size="lg"
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
                key={index}
                value={option.value}
                defaultChecked={option.checked}
                {...register(`tasks.${index}`)}
              >
                {option.name}
              </Checkbox>
            ))}
          </VStack>
        ))}
      </form>
    </ModalComponent>
  );
};

export default EditLogTasks;
