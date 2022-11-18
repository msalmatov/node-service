import { UserInput } from "../models/user";
import { User } from "../models";

export const create = (payload: UserInput) => {
    return User.create(payload);
}

export const getById = (id: number) => {
    return User.findByPk(id);
}

export const getByUsername = (username: string) => {
    return User.findOne({
        where: { username: username }
    })
}