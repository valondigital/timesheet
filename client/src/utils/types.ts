import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
// import { OptionBase } from "react-select";

export type literals = string | number | object;

export type TData = {
  [key: string]: string | number | object | null | undefined | React.ReactNode;

}

export interface Params {
  [key: string]: string | number | object;
}

// export interface AsyncSelectOptions extends OptionBase {
//   label: string;
//   value: string;
// }

export interface ErrorObj {
  errorCode: string;
  errorMsg: string;
  object: object | null;
  status: string;
  timestamp: string;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface UserProfileResponse {
  [key: string]: Params;
  object: Params;
}

export interface DashboardStats {
  [key: string]: Params;
  object: {
    totalRegisteredAgents: number;
    totalCompletedOrders: number;
    totalOrders: number;
    totalEarnings: number;
  };
}

export interface DefaultData {
  content: TData[];
  size: number;
  totalElements: number;
  totalPages: number;
  currentPage?: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}

export interface InputObj {
  isInvalid?: boolean;
  name: string;
  register?: UseFormRegisterReturn /* Record<string | number, string | number> */;
  type: string;
  label: string;
  options?: Record<"value" | "name", string>;
  error?: FieldError;
  size?: string;
  placeholder?: string;
  disabled?: boolean;
  helperMessage?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: (
    values:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}
