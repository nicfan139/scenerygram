import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.PG_URL,
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false
		}
	},
	synchronize: false,
	migrationsRun: true,
	logging: false,
	entities: [User],
	migrations: [process.env.TYPEORM_MIGRATION_DIR as string],
	subscribers: []
});
