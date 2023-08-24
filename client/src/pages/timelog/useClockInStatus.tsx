import { useGetClockInStatus } from "./hooks/queryHooks";

export const useClockInStatus = () => {
  const { data } = useGetClockInStatus();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let status;

  if (!data?.data) {
    status = "clock-in";
  } else if (data && currentHour < 17) {
    status = "edit-log";
  } else {
    status = "clock-out";
  }

  return {
    status,
  };
};
