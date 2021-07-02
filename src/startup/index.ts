import { sequelizeLoader } from "./sequelize";
import { Express } from "express";
import expressLoader from "./express";
import routesLoader from "./routes";
import cronLoader from "./crons";

export default async (app: Express): Promise<void> => {
  await sequelizeLoader();
  await cronLoader();
  expressLoader(app);
  routesLoader(app);
};
