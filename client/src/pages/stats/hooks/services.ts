import endpoints from "components/endpoints";
import { Params } from "components/types";
import { authAxios as axios } from "setup/auth/axios";
import getURLParams from "utils/getUrlParams";

class Services {
  async getAllUsersClockInStats(param: TFormValues) {
    const params = getURLParams(param);
    const response = await axios({
      method: "GET",
      url: `${endpoints.clockInStatus}${params}`,
    });
    return response?.data as DefaultData;
  }
}

export default new Services(); // eslint-disable-line
