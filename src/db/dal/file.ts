import { FileInput } from "../models/file";
import { File } from "../models";

export const create = (payload: FileInput) => {
    return File.create(payload);
}

export const getAllByUser = (user_id: number, page = 1, listSize = 10) => {
    return File.findAll({
        where: { user_id: user_id },
        limit: listSize,
        offset: (page - 1) * listSize
    })
}

export const getById = (id: number) => {
    return File.findByPk(id);
}

export const updateById = (id: number, payload: FileInput) => {
    return File.update(payload, {
        where: { id }
    });
}

export const deleteById = (id: number) => {
    return File.destroy({
        where: { id }
    });
}