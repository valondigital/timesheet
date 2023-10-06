import { useGetAllCountries } from "./queryHooks";

export const useGetCountries = () => {
  const { data, isLoading } = useGetAllCountries();

  let ret: {
    name: string | undefined;
    flagUrl: string | undefined;
  }[] = [];

  if (data && Array.isArray(data)) {
    ret = data.map((item) => ({
      name: item?.name?.common,
      flagUrl: item?.flags?.png,
    }));
  }

  return {
    countries: ret,
    isLoading,
  };
};
