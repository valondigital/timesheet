import endpoints from "components/endpoints";
import { authAxios as axios } from "setup/auth/axios";
import { Params } from "components/types";
import getURLParams from "utils/getUrlParams";



class Services {
  async getAllProjects(param: Record<string, string>) {
    const params = getURLParams(param);
    const response = await  axios({
      method: "GET",
      url: `${endpoints.projects}${params}`,
    });
    return response.data.data as DefaultData
  };

  async createProject(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.projects,
      data: payload.data,
    });
  }
}

export default new Services();