import { Sequelize } from "sequelize";
import config from "../config";
import initUser from "../models/User";
import initEnergySystem from "../models/EnergySystem";
import setupAssociations from "../models/associations";
import initESSchedule from "../models/ESSchedule";
import initWeatherForecast from "../models/WeatherForecast";
import initESComponent from "../models/ESComponent";
import initESConsumption from "../models/ESConsumption";
import initCircularBufferPointer from "../models/CircularBufferPointer";
import initESComponentCurrent from "../models/ESComponentCurrent";

export async function sequelizeLoader(): Promise<Sequelize> {
  if (config.dbUri == undefined) throw new Error("No DB URI defined!");

  const sequelize = new Sequelize(config.dbUri, {
    database: config.dbName,
    sync: { alter: true },
    define: { underscored: true },
    logging: false,
  });

  initializeModels(sequelize);
  await sequelize.sync();

  return sequelize;
}

function initializeModels(sequelize: Sequelize): void {
  initUser(sequelize);
  initEnergySystem(sequelize);
  initESSchedule(sequelize);
  initCircularBufferPointer(sequelize);
  initWeatherForecast(sequelize);
  initESComponent(sequelize);
  initESComponentCurrent(sequelize);
  initESConsumption(sequelize);
  setupAssociations();
}
