import { sequelizeLoader } from "./sequelize";
import { Express } from "express";
import expressLoader from "./express";
import routesLoader from "./routes";

export default async (app: Express): Promise<void> => {
  await sequelizeLoader();
  expressLoader(app);
  routesLoader(app);
};
