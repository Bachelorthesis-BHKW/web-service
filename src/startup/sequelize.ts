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
import initESConsumptionHistoric from "../models/historic/ESConsumptionsHistoric";
import initESComponentCurrentHistoric from "../models/historic/ESComponentCurrentHistoric";
import initESScheduleHistoric from "../models/historic/ESScheduleHistoric";
import initESForecastHistoric from "../models/historic/ESForecastHistoric";

export async function sequelizeLoader(): Promise<Sequelize> {
  if (config.dbUri == undefined) throw new Error("No DB URI defined!");

  const sequelize = new Sequelize(config.dbUri, {
    database: config.dbName,
    sync: {
      force: true,
    },
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

  initESConsumptionHistoric(sequelize);
  initESComponentCurrentHistoric(sequelize);
  initESScheduleHistoric(sequelize);
  initESForecastHistoric(sequelize);
  setupAssociations();
}
