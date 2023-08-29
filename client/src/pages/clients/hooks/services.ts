import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";
import { PaginationState } from "@tanstack/react-table";

class Services {
  async getAllClients(param: CFormValues, pageProps: PaginationState) {
    const params = getURLParams({
      page: pageProps.pageIndex,
      size: pageProps.pageSize,
      ...param,
    });
    const response = await axios({
      method: "GET",
      url: `${endpoints.clients}${params}`,
    });
    return response?.data as DefaultData;
  }

  async createClient(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.clients,
      data: payload.data,
    });
  }
}

export default new Services();
