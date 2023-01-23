import { config } from "dotenv";
config();
export const PORT = process.env.PORT || 3001;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "2060";
export const DB_DATABASE = process.env.DB_DATABASE || "projectsdb";
export const DB_PORT = process.env.DB_PORT || 33060;
export const SECRET_KEY = process.env.SECRET_KEY || "";