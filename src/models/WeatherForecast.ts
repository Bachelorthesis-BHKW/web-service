import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import { BufferInterface } from "./BufferInterface";

interface WeatherForecastAttributes extends BufferInterface {
  energySystemId: number;
  date: Date;
  globalHorizontalIrradiance?: number;
  directNormalIrradiance?: number;
  diffuseHorizontalIrradiance?: number;
  temperature: number;
}

export interface WeatherForecastCreateAttributes
  extends Optional<
    WeatherForecastAttributes,
    "bufferIndex" | "energySystemId"
  > {}

export class WeatherForecast
  extends Model<WeatherForecastAttributes, WeatherForecastCreateAttributes>
  implements WeatherForecastAttributes
{
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
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      globalHorizontalIrradiance: {
        type: DataTypes.DOUBLE,
      },
      directNormalIrradiance: {
        type: DataTypes.DOUBLE,
      },
      diffuseHorizontalIrradiance: {
        type: DataTypes.DOUBLE,
      },
      temperature: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    { sequelize }
  );
}
