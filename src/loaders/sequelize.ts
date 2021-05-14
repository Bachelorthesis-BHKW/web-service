import { Sequelize } from "sequelize";
import config from "../config";

export async function sequelizeLoader(): Promise<Sequelize> {
  if (config.dbUri == undefined) throw new Error("No DB URI defined!");

  const sequelize = new Sequelize(config.dbUri, {
    database: config.dbName,
    sync: { alter: true },
    define: { underscored: true },
  });

  await sequelize.sync();
  return sequelize;
}
