import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";



class Services {
  async getAllClients(param: CFormValues) {
    const params = getURLParams(param);
    const response = await  axios({
      method: "GET",
      url: `${endpoints.clients}`,
    });
    return response?.data?.data as DefaultData
  };

  async createClient(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.clients,
      data: payload.data,
    });
  }
}

export default new Services();