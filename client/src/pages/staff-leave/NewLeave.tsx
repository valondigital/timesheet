import {
  Box,
  Grid,
  GridItem,
  Textarea,
  Text,
  Badge,
  Flex,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import ModalComponent from "components/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import generateGridInputs from "./components/GridForm";
import LeaveDetailsHeader from "./components/Jumbotron";
import { statusTypes, schema, leaveTypes } from "./helpers";
import {
  useApplyForLeave,
  useGetLeaveDetails,
  useUpdateLeaveStatus,
} from "./hooks/queryHooks";
import { useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrorsImpl } from "react-hook-form";

export type FormValues = {
  startLeaveDate: Date;
  endLeaveDate: Date;
  reason: string;
  leaveType: string;
};

const NewLeave = () => {
  const { mutate: applyForLeave, isLoading: leaveApplicationLoading } =
    useApplyForLeave();

  const onSubmit = (values: FormValues) => {
    applyForLeave({ data: values });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const inputObjList = (
    register: UseFormRegister<FormValues>,
    errors: FieldErrorsImpl<FormValues>
  ) => [
    {
      name: "startLeaveDate",
      label: "Start Leave Date",
      placeholder: "",
      type: "date",
      register: register("startLeaveDate", {
        required: "Please enter a valid date",
      }),
      isInvalid: !!errors.startLeaveDate,
      error: errors?.startLeaveDate,
    },
    {
      name: "endLeaveDate",
      label: "End Leave Date",
      placeholder: "",
      type: "date",
      register: register("endLeaveDate", {
        required: "Please enter a valid date",
      }),
      isInvalid: !!errors.endLeaveDate,
      error: errors?.endLeaveDate,
    },
    {
      name: "leaveType",
      label: "Leave Type",
      type: "select",
      options: leaveTypes,
      register: register("leaveType", {
        required: "Please select a leave type",
      }),
      isInvalid: !!errors.leaveType,
      error: errors?.leaveType,
    },
    {
      name: "reason",
      label: "Reason for leave",
      type: "textarea",
      size: "md",
      register: register("reason", {
        required: "Please enter a valid reason for your applied leave",
      }),
      isInvalid: !!errors.reason,
      error: errors?.reason,
    },
  ];

  return (
    <>
      <LeaveDetailsHeader />
      <Box bg="white" shadow="md" rounded="lg" p={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {inputObjList(register, errors).map((input) =>
              generateGridInputs(input)
            )}
          </Grid>
          <Button
            variant="secondary"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            isLoading={leaveApplicationLoading}
          >
            Apply Leave
          </Button>
        </form>
      </Box>
    </>
  );
};

export default NewLeave;
