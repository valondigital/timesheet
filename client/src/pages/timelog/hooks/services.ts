import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";
import { PaginationState } from "@tanstack/react-table";

class Services {
  async getAllLogs(pageProps: PaginationState) {
    const params = getURLParams({
      page: pageProps.pageIndex,
      size: pageProps.pageSize,
    });
    const response = await axios({
      method: "GET",
      url: `${endpoints.timelogs}${params}`,
    });
    return response?.data as DefaultData;
  }

  async getAllAssignedTasks(param: TFormValues) {
    const response = await axios({
      method: "GET",
      url: `${endpoints.userTasks(localStorage.userId)}`,
    });
    return response?.data as DefaultData;
  }

  async getLogDetails(logId: string) {
    const response = await axios({
      method: "GET",
      url: `${endpoints.timelogs}/${logId}`,
    });

    console.log({ logId });
    return response?.data?.data as TDefaultData;
  }

  async updateLog(logId: string, payload: Object) {
    const response = await axios({
      method: "PATCH",
      url: `${endpoints.timelogs}/${logId}`,
      data: payload,
    });
    return response?.data as DefaultData;
  }

  async clockIn(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.timelogs,
      data: payload.data,
    });
  }

  async getUserClockInStatus() {
    const response = await axios({
      method: "GET",
      url: endpoints.usersClockInStatus,
    });
    return response?.data as DefaultData;
  }
}

export default new Services();
