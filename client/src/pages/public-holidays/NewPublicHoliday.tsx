import { Box, Grid, Button } from "@chakra-ui/react";
import generateGridInputs from "./components/GridForm";
import LeaveDetailsHeader from "./components/Jumbotron";
import { schema } from "./helpers";
import { useAddPublicHoliday } from "./hooks/queryHooks";
import { useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrorsImpl } from "react-hook-form";
import { useGetCountries } from "./hooks/useGetAllCountries";

export type FormValues = {
  name: string;
  date: Date;
  country: string;
  notes: string;
};

const NewPublicHoliday = () => {
  const { mutate: addPublicHoliday, isLoading } = useAddPublicHoliday();

  const onSubmit = (values: FormValues) => {
    const flag = countries.find((item) => item.name === values.country);
    const payload = { ...values, country: flag };
    addPublicHoliday({ data: payload });
  };

  const { countries } = useGetCountries();
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
      name: "name",
      label: "Name of Holiday",
      type: "text",
      register: register("name", {
        required: "Please enter a valid reason for your applied leave",
      }),
      isInvalid: !!errors.name,
      error: errors?.name,
    },
    {
      name: "date",
      label: "Date",
      placeholder: "Enter a date",
      type: "date",
      register: register("date", {
        required: "Please enter a valid date",
      }),
      isInvalid: !!errors.date,
      error: errors?.date,
    },
    {
      name: "country",
      label: "Region",
      type: "select",
      options: countries,
      register: register("country", {
        required: "Please select a region",
      }),
      isInvalid: !!errors.country,
      error: errors?.country,
    },
    {
      name: "notes",
      label: "Descripiton",
      type: "textarea",
      size: "md",
      register: register("notes", {
        required: "Please enter a description",
      }),
      isInvalid: !!errors.notes,
      error: errors?.notes,
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
            isLoading={isLoading}
          >
            Add
          </Button>
        </form>
      </Box>
    </>
  );
};

export default NewPublicHoliday;
