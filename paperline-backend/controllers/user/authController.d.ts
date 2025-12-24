import { Request, Response } from "express";
declare const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const createAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { loginUser, createAccount };
//# sourceMappingURL=authController.d.ts.map