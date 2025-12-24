import { Request, Response } from "express";
declare const createBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getParticularBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllBlogs: (req: Request, res: Response) => Promise<void>;
declare const deleteBlog: (req: Request, res: Request) => Promise<void>;
declare const searchBlog: (req: Request, res: Response) => Promise<void>;
export { searchBlog, createBlog, deleteBlog, getAllBlogs, getParticularBlog };
//# sourceMappingURL=blogController.d.ts.map