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

  async getLeaveHistory(
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
      url: `${endpoints.leaveHistory}${params}`,
    });
    return response.data as DefaultData;
  }

  async applyForLeave(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.leaveApplications,
      data: payload.data,
    });
  }
  async getLeaveDetails(leaveId: string) {
    const response = await axios({
      method: "GET",
      url: `${endpoints.leaveApplications}/${leaveId}`,
    });
    return response?.data?.data?.leave as Leave;
  }
  async updateLeave(leaveId: string, payload: Object) {
    const user = JSON.parse(localStorage.user);
    const response = await axios({
      method: "PATCH",
      url: `${endpoints.leaveApplications}/${leaveId}/${
        user.role === "admin" ? "admin-approval" : "hod-approval"
      }`,
      data: payload,
    });
    return response?.data as DefaultData;
  }
}

export default new Services();
