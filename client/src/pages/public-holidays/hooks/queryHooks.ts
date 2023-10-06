import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from "@tanstack/react-query";
import Services from "./services";
import { ErrorObj } from "utils/types";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@chakra-ui/react";
import { PaginationState } from "@tanstack/react-table";

export const useGetAllPublicHolidays = (
  payload: Record<string, string>,
  pageProps: PaginationState
) => {
  return useQuery<DefaultData, ErrorObj>(
    ["allPublicHolidays", { ...payload, ...pageProps }],
    () => Services.getAllPublicHolidays(payload, pageProps)
  );
};

export const useGetAllCountries = (
) => {
  return useQuery<DefaultData, ErrorObj>(
    ["allCountries"],
    () => Services.getAllCountries()
  );
};

export const useAddPublicHoliday = () => {
  const toast = useToast();
  return useMutation(Services.addPublicHoliday, {
    onError: (data: AxiosError) => {
      toast({
        title: "Invalid Entries",
        description: "Public Holiday creation failed",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onSuccess: (data: AxiosResponse) => {
      console.log(data, "success");
      toast({
        title: "Public Holiday Successful",
        description: "Public Holiday Added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });
};
