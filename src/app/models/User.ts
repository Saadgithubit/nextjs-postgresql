'use strict'

import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "@/app/dbconnect";

class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare createdAt: CreationOptional<Date>;
    declare updateAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        tableName: 'users',
        sequelize,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default User;