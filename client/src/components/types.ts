export interface Params {
  [key: string]: string | number | object;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface ErrorObj {
  errorCode: string;
  errorMsg: string;
  message: string;
  object: object | null;
  status: string;
  timestamp: string;
}