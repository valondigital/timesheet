import endpoints from "components/endpoints";
import { Params } from "components/types";
import { authAxios as axios } from "setup/auth/axios";
import getURLParams from "utils/getUrlParams";
import { PaginationState } from '@tanstack/react-table';

class Services {
  signup(payload: Params) {
    return axios({
      method: "POST",
      url: endpoints.signup,
      data: payload.data,
    });
  }
  async getAllUsers(param: TFormValues, pageProps: PaginationState) {
    const params = getURLParams({
      ...param, 
      page: pageProps.pageIndex,
      size: pageProps.pageSize
    });
    const response = await  axios({
      method: "GET",
      url: `${endpoints.users}${params}`,
    });
    return response?.data as DefaultData
  };
  
}

export default new Services(); // eslint-disable-line
