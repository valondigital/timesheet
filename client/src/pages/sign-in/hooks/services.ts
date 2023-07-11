import endpoints from "components/endpoints";
import { Params } from "components/types";
import { publicAxios as axios } from "setup/auth/axios";

class Services {
  login(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.login,
      data: payload.data,
    });
  }
}

export default new Services(); // eslint-disable-line
