export interface IUserGet {
  fullName: string;
  email: string;
  role: string;
  //   password: string;
}

export interface IUserPost {
  email: string;
  password: string;
}

export interface IUserRegisterPost {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface IUserUpdatePatchOne {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface IUserUpdatePatchTwo {
  fullName: string;
  phoneNumber: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}
