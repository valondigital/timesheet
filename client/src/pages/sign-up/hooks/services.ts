import endpoints from "common/endpoints";
import { Params } from "common/types";
import { publicAxios as axios } from "setup/auth/axios";

class Services {
  signup(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.signup,
      data: payload.data,
    });
  }
}

export default new Services(); // eslint-disable-line
