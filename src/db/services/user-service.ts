import { UserInput } from "../models/user";
import * as userDal from "../dal/user";

export const create = async (payload: UserInput) => {
    return userDal.create(payload);
}

export const getById = async (id: number) => {
    return userDal.getById(id);
}

export const getByUsername = async (username: string) => {
    return userDal.getByUsername(username);
}