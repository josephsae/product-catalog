import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Product],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  await AppDataSource.initialize();
};
