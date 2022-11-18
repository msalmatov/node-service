import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../config";
import { User } from "./index";

interface FileAttributes {
    id: number;
    user_id: number;
    name: string;
    extension: string;
    mime: string;
    size: number;
    date_upload: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface FileInput extends Optional<FileAttributes, 'id'> {
};

export interface FileOutput extends Required<FileAttributes> {
};

class File extends Model<FileAttributes, FileInput> implements FileAttributes {
    public id!: number;
    public user_id!: number;
    public name!: string;
    public extension: string;
    public mime: string;
    public size: number;
    public date_upload: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

File.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: User,
            key: "id"
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING
    },
    mime: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    date_upload: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'File'
});

export default File;