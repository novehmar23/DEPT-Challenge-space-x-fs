import { DataSource } from "typeorm";

const appEnv = process.env.APP_ENV;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/spacex.sql",
  entities:
    appEnv === "docker"
      ? ["./dist/entities/**/*{.ts,.js}"]
      : ["./src/entities/**/*{.ts,.js}"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations:
    appEnv === "docker"
      ? ["./dist/database/migrations/**/*{.ts,.js}"]
      : ["./src/database/migrations/**/*{.ts,.js}"],
});
