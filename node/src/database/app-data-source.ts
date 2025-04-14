import { DataSource } from "typeorm";

const appEnv = process.env.APP_ENV;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/spacex.sql",
  entities:
    appEnv === "local"
      ? ["./src/entities/**/*{.ts,.js}"]
      : ["./dist/entities/**/*{.ts,.js}"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations:
    appEnv === "local"
      ? ["./src/database/migrations/**/*{.ts,.js}"]
      : ["./dist/database/migrations/**/*{.ts,.js}"],
});
