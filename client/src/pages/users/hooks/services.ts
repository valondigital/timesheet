import endpoints from "components/endpoints";
import { Params } from "components/types";
import { authAxios as axios } from "setup/auth/axios";
import getURLParams from "utils/getUrlParams";

class Services {
  signup(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.signup,
      data: payload.data,
    });
  }
  async getAllUsers(param: TFormValues) {
    const params = getURLParams(param);
    const response = await  axios({
      method: "GET",
      url: `${endpoints.users}`,
    });
    return response?.data?.data as DefaultData
  };
  
}

export default new Services(); // eslint-disable-line
