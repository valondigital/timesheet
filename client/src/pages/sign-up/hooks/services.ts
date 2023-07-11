import endpoints from "components/endpoints";
import { Params } from "components/types";
import { authAxios as axios } from "setup/auth/axios";

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
