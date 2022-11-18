import {FileInput} from "../models/file";
import * as fileDal from "../dal/file";

export const create = (payload: FileInput) => {
    return fileDal.create(payload);
}

export const getAllByUser = (user_id: number, page = 1, listSize = 10) => {
    return fileDal.getAllByUser(user_id, page, listSize);
}

export const getById = (id: number) => {
    return fileDal.getById(id);
}

export const updateById = (id: number, payload: FileInput) => {
    return fileDal.updateById(id, payload);
}

export const deleteById = (id: number) => {
    return fileDal.deleteById(id);
}