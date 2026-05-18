import { Op } from "sequelize";
import { Blog } from "./blog.model";
import { User } from "../user/user.model";
import { CreateBlogPayload } from "./blog.types";

export const create = (data: CreateBlogPayload) => Blog.create(data);

export const findAll = ({ limit, offset }: { limit: number; offset: number }) =>
    Blog.findAndCountAll({
        include: {
            model: User,
            as: "author",
            attributes: ["id", "username", "email", "profilePic"],
        },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
    });


export const search = (query: string, limit: number, offset: number) =>
    Blog.findAndCountAll({
        where: {
            [Op.or]: [
                { title: { [Op.iLike]: `%${query}%` } },
                { content: { [Op.iLike]: `%${query}%` } },
            ],
        },
        include: {
            model: User,
            as: "author",
            attributes: ["id", "username", "email", "profilePic"],
        },
        limit,
        offset,
    });