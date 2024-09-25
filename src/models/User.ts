import { Model, DataTypes } from "sequelize";
import sequelize from "@/app/dbconnect";

class User extends Model {
    declare id: number;
    declare name: string
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        createdAt: 'create_at',
        updatedAt: 'update_at',
    }
);

export default User;