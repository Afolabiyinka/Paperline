import { Request, Response } from "express";
declare const updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { updateProfile, deleteAccount };
//# sourceMappingURL=userController.d.ts.map