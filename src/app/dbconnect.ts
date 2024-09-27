import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL as string

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not defined');
}

const dbOptions: SequelizeOptions = {
    dialect: 'postgres',
    logging: console.log,
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};

const sequelize = new Sequelize(connectionString, dbOptions);

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

initializeDatabase();

export default sequelize;
