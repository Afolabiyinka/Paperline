export interface updateProfilePayload {
  firstname: string;
  lastname: string;
  profilePic?: string;
  email: string;
  password: string;
  username: string;
  id: number | string;
}

export interface profilePicPayload {
  id: number | string;
  profilePic: string;
}
