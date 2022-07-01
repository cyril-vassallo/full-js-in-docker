import * as dotenv from 'dotenv';
import path from 'path';

const configPath = { path: path.resolve(__dirname, '../../.env') }
console.log('.env location is : ',configPath.path)
dotenv.config(configPath)

interface Config{
  endpoint: string;
  apiKey: string;
  port: string;
  env: string;
  pgSqlPassword: string;
  pgSqlUser: string;
  pgAdminEmail: string;
  pgAdminPassword: string;
  pgAdminPort: string;
}

const config: Config = {
  endpoint: process.env.API_ENDPOINT!,
  apiKey: process.env.API_KEY!,
  port: process.env.PORT!,
  env: process.env.ENV!,
  pgSqlPassword: process.env.POSTGRES_PASSWORD!,
  pgSqlUser: process.env.POSTGRES_USER!,
  pgAdminEmail: process.env.PGADMIN_DEFAULT_EMAIL!,
  pgAdminPassword: process.env.PGADMIN_DEFAULT_PASSWORD!,
  pgAdminPort: process.env.PGADMIN_PORT!
};

export default config;