import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import getURLParams from "utils/getUrlParams";



class Services {
  async getAllProjects(param: Record<string, string>) {
    const params = getURLParams(param);
    const response = await  axios({
      method: "GET",
      url: `${endpoints.getAllProjects}${params}`,
    });
    return response.data.data as DefaultData
  };
}

export default new Services();