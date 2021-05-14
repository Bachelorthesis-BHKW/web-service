import { Sequelize } from "sequelize";
import config from "../config";
import initUser from "../models/User";
import initEnergySystem from "../models/EnergySystem";
import setupAssociations from "../models/associations";
import initESSchedule from "../models/ESSchedule";

export async function sequelizeLoader(): Promise<Sequelize> {
  if (config.dbUri == undefined) throw new Error("No DB URI defined!");

  const sequelize = new Sequelize(config.dbUri, {
    database: config.dbName,
    sync: { force: true },
    define: { underscored: true },
    logging: false,
  });
  initUser(sequelize);
  initEnergySystem(sequelize);
  initESSchedule(sequelize);
  setupAssociations();

  await sequelize.sync();
  return sequelize;
}
