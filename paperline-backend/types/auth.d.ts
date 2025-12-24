export interface RegisterPayload {
    firstname: string;
    lastname: string;
    profilePic?: string;
    email: string;
    password: string;
    username: string;
}
export type LoginPayload = Omit<RegisterPayload, "firstname" | "lastname" | "profilePic" | "username">;
export type DecodedUser = {
    id: string;
    email: string;
    username: string;
};
//# sourceMappingURL=auth.d.ts.map