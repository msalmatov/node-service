import { FileInput } from "../models/file";
import { File } from "../models";

export const create = (payload: FileInput) => {
    return File.create(payload);
}

export const getAllByUser = (user_id: number, page = 1, listSize = 10) => {
    return File.findAll({
        where: { user_id: user_id },
        offset: (page - 1) * listSize,
        limit: listSize
    })
}

export const getById = (id: number) => {
    return File.findByPk(id);
}

export const updateById = async (id: number, payload: FileInput) => {
    const [affectedCount] = await File.update(payload, {
        where: { id }
    });
    return affectedCount;
}

export const deleteById = (id: number) => {
    return File.destroy({
        where: { id }
    });
}