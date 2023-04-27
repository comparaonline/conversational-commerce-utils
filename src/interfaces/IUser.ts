export interface IUser {
  phone: IUserPhone;
}

export interface IUserPhone {
  country: string;
  countryCallingCode: string;
  nationalNumber: string;
  number: string;
  raw: string;
  isValid: boolean;
}
