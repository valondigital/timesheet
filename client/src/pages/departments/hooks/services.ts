import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";
import { PaginationState } from "@tanstack/react-table";

class Services {
  async getAllDepartments(param: TFormValues, pageProps: PaginationState) {
    const params = getURLParams({
      page: pageProps.pageIndex,
      size: pageProps.pageSize,
      ...param
    });
    const response = await axios({
      method: "GET",
      url: `${endpoints.departments}${params}`,
    });
    console.log(response?.data, "*******************departments!!!")
    return response?.data as DefaultData;
  }

  async getAllAssignedTasks(param: TFormValues, pageProps: PaginationState) {
    const params = getURLParams({
      page: pageProps.pageIndex,
      size: pageProps.pageSize,
      ...param
    });    const response = await axios({
      method: "GET",
      url: `${endpoints.userTasks(localStorage.userId)}${params}`,
    });
    return response?.data as DefaultData;
  }

  async createTask(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.tasks,
      data: payload.data,
    });
  }

  async getTaskDetails(taskId: string) {
    const response = await  axios({
      method: "GET",
      url: `${endpoints.tasks}/${(taskId)}`,
    });
    return response?.data?.data as Task
  };

  async updateTask(taskId: string, payload: Object) {
    const response = await  axios({
      method: "PATCH",
      url: `${endpoints.tasks}/${(taskId)}`,
      data: payload
    });
    return response?.data as DefaultData
  };

}

export default new Services();
