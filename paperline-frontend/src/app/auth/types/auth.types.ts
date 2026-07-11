export interface SignupPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmedPassword?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type UpdateUserPayload = {
  username?: string;
  email?: string;
  id?: string;
  firstname?: string;
  lastname?: string;
  profilePic?: string;
};
export interface DeleteAccountPayload {
  id: string;
}
