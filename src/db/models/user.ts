import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../config";

interface UserAttributes {
    id: number;
    username: string;
    password: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {
};

export interface UserOutput extends Required<UserAttributes> {
};

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User'
});

export default User;