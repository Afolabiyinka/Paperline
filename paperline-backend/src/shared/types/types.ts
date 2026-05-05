import { Request } from "express";
import { DecodedUser } from "../../modules/auth/auth.types";
export interface AuthenticatedRequest extends Request {
  user?: DecodedUser;
}
