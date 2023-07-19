import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";



class Services {
  async getAllLogs() {
    const response = await  axios({
      method: "GET",
      url: `${endpoints.timelogs}`,
    });
    console.log("data", response?.data)
    return response?.data?.data as DefaultData
  };

  async getAllAssignedTasks(param: TFormValues) {
    const response = await  axios({
      method: "GET",
      url: `${endpoints.userTasks(localStorage.userId)}`,
    });
    return response?.data as DefaultData
  };

  async getLogDetails(logId: string) {
    const response = await  axios({
      method: "GET",
      url: `${endpoints.timelogs}/${(logId)}`,
    });
    return response?.data?.data as TDefaultData
  };

  async updateLog(logId: string, payload: Object) {
    console.log(logId, "check log ID")
    const response = await  axios({
      method: "PATCH",
      url: `${endpoints.timelogs}/${(logId)}`,
      data: payload
    });
    return response?.data as DefaultData
  };

  async clockIn(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.timelogs,
      data: payload.data,
    });
  }
}

export default new Services();