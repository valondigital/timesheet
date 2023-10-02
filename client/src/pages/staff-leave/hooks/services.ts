import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";
import { PaginationState } from "@tanstack/react-table";

class Services {
  async getAllLeaveApplications(
    param: Record<string, string>,
    pageProps: PaginationState
  ) {
    const params = getURLParams({
      page: pageProps.pageIndex,
      size: pageProps.pageSize,
      ...param,
    });
    const response = await axios({
      method: "GET",
      url: `${endpoints.leaveApplications}${params}`,
    });
    return response.data as DefaultData;
  }

  async createProject(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.projects,
      data: payload.data,
    });
  }
  async getLeaveDetails(leaveId:string){
    const response = await  axios({
      method: "GET",
      url: `${endpoints.leaveApplications}/${(leaveId)}`,
    });
    return response?.data?.data?.leave as Leave
  }
}

export default new Services();
