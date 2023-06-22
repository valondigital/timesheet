import React, { createContext, useContext } from 'react';
import { AxiosInstance } from 'axios';
import { publicAxios, authAxios, setupPublicAxios, setupAuthAxios } from '../auth/axios';
import { AxiosProviderProps } from 'models/AxiosTypes';

interface AxiosContextType {
  publicAxios: AxiosInstance;
  authAxios: AxiosInstance;
  setupPublicAxios: (baseUrl: string | undefined) => void;
  setupAuthAxios: (baseUrl: string | undefined, authToken: string) => void;
}

const AxiosContext = createContext<AxiosContextType | undefined>(undefined);

export const useAxiosContext = (): AxiosContextType => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxiosContext must be used within an AxiosProvider');
  }
  return context;
};

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const axiosData: AxiosContextType = {
    publicAxios,
    authAxios,
    setupPublicAxios,
    setupAuthAxios,
  };

  return <AxiosContext.Provider value={axiosData}>{children}</AxiosContext.Provider>;
};
