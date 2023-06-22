import axios, { AxiosInstance} from 'axios';

export let publicAxios:AxiosInstance; // eslint-disable-line
export let authAxios: AxiosInstance; // eslint-disable-line

export const setupPublicAxios = (baseUrl : string | undefined) => {
  if(!baseUrl){
    throw new Error('Base Url is not found')
  }
  publicAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    }
  });
};

export const setupAuthAxios = (baseUrl:string | undefined, authToken:string) => {
  if(!baseUrl){
    throw new Error('Base Url is not found')
  }
  
  authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export default authAxios;
