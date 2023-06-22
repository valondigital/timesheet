
import endpoints from 'common/endpoints';
import  { Params } from 'common/types';
import { publicAxios as axios } from 'setup/auth/axios';

class Services{
    login(payload : Params){
        return axios({
            method: 'POST',
            url: endpoints.login,
            data: payload.data
        })
    }
}


export default new Services()