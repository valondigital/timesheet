import axios, { AxiosInstance } from "axios";

export let publicAxios: AxiosInstance;
export let authAxios: AxiosInstance;
export let foreignAxios: AxiosInstance; // Initialize as null

export const setupPublicAxios = (baseUrl: string | undefined) => {
  if (!baseUrl) {
    throw new Error("Base Url is not found");
  }
  publicAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
};

export const setupForeignAxios = (baseUrl: string | undefined) => {
  if (!baseUrl) {
    throw new Error("Base Url is not found");
  }
  foreignAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });
};

export const setupAuthAxios = (
  baseUrl: string | undefined,
  authToken: string
) => {
  if (!baseUrl) {
    throw new Error("Base Url is not found");
  }

  authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  // Add request interceptor
  authAxios.interceptors.request.use(
    (config) => {
      // Get the token from your Context API here
      const accessToken = localStorage.getItem("jwt_token"); // Replace this with your actual function to get the token from the Context API

      // If the token exists, add it to the request headers
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default authAxios;
