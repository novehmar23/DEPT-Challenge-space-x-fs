import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/spacex.sql",
  entities: [
    "./dist/entities/**/*{.ts,.js}", //For compiled environments
    "./src/entities/**/*{.ts,.js}", //For development (nodemon)
  ],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ["./dist/database/migrations/**/*{.ts,.js}"],
});
