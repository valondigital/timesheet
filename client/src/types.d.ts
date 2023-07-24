type SubNav = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type IUserDetails = {
  role: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordChangedAt: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  phone: number;
  __v: number;
};

type IEditProfile = {
  id: number;
  firstName: string;
  lastName: string;
  mobileNo: string;
  state: string;
  agentType: string;
  email: string;
  ageBracket: string;
  gender: string;
};

type ICustomerOrderReqParam = {
  agentId: number;
  customerId: string;
  agentCode: string;
};

interface InputObj {
  isInvalid?: boolean;
  name: string;
  register?: UseFormRegisterReturn /* Record<string | number, string | number> */;
  type: string;
  label: string;
  options?: Record<'value' | 'name', string>[];
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
      | Record<string, Date>
  ) => void;
}

type IButtonValue =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

type literals = string | number | object;

type IKeyOfUser = keyof IUserDetails;
type IValueOfUser<T> = T[keyof T];
type ITData = {
  [key: string]: string | number | object | null | undefined | React.ReactNode;
};
type ITDataColumnDef<T> = ColumnDef<T, object | ReactNode>;

type IFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  country: string;
};

type CFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | undefined;
  company: string | undefined;
  address: string | undefined;
};

interface LFormValues  {
  checkIn?: string ;
  checkOut?: string; // Make it optional with the "?" symbol
  tasks: string[];
  workHours?: number;
  note?: string;
};


type TFormValues = {
  name: string;
  description: string;
  project: string;
  assignedTo: string;
};

interface DefaultData {
  [key: string]: ITData[];
  size: number;
  totalElements: number;
  totalPages: number;
}

interface Task {
  status: string;
  _id: string;
  name: string;
  description: string;
  project: {
    _id: string;
    tasks: any[]; // Replace 'any' with the appropriate type if needed
    name: string;
    description: string;
  };
  assignedTo: {
    role: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordChangedAt: string;
    country: string;
    id: string;
  };
  id: string;
}

interface Log {
  tasks: Task[];
  checkOut: string | null;
  workHours: number | null;
  note: string;
  _id: string;
  user: {
    role: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordChangedAt: string;
    country: string;
    id: string;
  };
  checkIn: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface TDefaultData {
  log: Log;
  size: number;
  totalElements: number;
  totalPages: number;
}


type IPageProps = {
  page: number;
  size: number;
  [key?: string]: string | number;
};

declare function onChange<K extends keyof IButtonValue>(
  key: K,
  value: IButtonValue[K]
): void;
