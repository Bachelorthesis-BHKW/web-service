import { Sequelize } from "sequelize";
import config from "../config";

export async function sequelizeLoader(): Promise<Sequelize> {
  if (config.dbUri == undefined) throw new Error("No DB URI defined!");
  const sequelize = new Sequelize(config.dbUri);
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.error(e);
  }
  return sequelize;
}
