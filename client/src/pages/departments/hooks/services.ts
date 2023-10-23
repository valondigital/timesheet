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

  async createDepartment(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.departments,
      data: payload.data,
    });
  }

  async getDeptDetails(deptId: string) {
    const response = await  axios({
      method: "GET",
      url: `${endpoints.departments}/${(deptId)}`,
    });
    return response?.data?.data as Dept
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
