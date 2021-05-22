import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { BufferInterface } from "./BufferInterface";

interface WeatherForecastAttributes extends BufferInterface {
  weatherForecastId: number;
  energySystemId: number;
  date: Date;
  globalHorizontalIrradiance: number;
  directNormalIrradiance: number;
  diffuseHorizontalIrradiance: number;
  temperature: number;
}

interface WeatherForecastCreateAttributes
  extends Optional<WeatherForecastAttributes, "weatherForecastId"> {}

export class WeatherForecast
  extends Model<WeatherForecastAttributes, WeatherForecastCreateAttributes>
  implements WeatherForecastCreateAttributes
{
  weatherForecastId!: number;
  energySystemId!: number;
  bufferIndex!: number;
  date!: Date;
  globalHorizontalIrradiance!: number;
  directNormalIrradiance!: number;
  diffuseHorizontalIrradiance!: number;
  temperature!: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initWeatherForecast(sequelize: Sequelize): void {
  WeatherForecast.init(
    {
      weatherForecastId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      globalHorizontalIrradiance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      directNormalIrradiance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      diffuseHorizontalIrradiance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    { sequelize }
  );
}
