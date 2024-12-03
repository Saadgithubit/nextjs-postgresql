'use strict'

import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "@/app/dbconnect";

class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare role: string;
    declare active: string;
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
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
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