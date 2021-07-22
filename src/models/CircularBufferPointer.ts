import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface CircularBufferPointerAttributes {
  circularBufferPointerId: number;
  energySystemId: number;
  esConsumptionPointer: number;
  maxEsConsumption: number;
  weatherForecastPointer: number;
  maxWeatherForecast: number;
}

export interface CircularBufferPointerCreateAttributes
  extends Optional<
    CircularBufferPointerAttributes,
    | "circularBufferPointerId"
    | "esConsumptionPointer"
    | "weatherForecastPointer"
    | "maxWeatherForecast"
  > {}

export class CircularBufferPointer
  extends Model<
    CircularBufferPointerAttributes,
    CircularBufferPointerCreateAttributes
  >
  implements CircularBufferPointerAttributes
{
  circularBufferPointerId!: number;
  energySystemId!: number;
  esConsumptionPointer!: number;
  maxEsConsumption!: number;
  weatherForecastPointer!: number;
  maxWeatherForecast!: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initCircularBufferPointer(sequelize: Sequelize): void {
  CircularBufferPointer.init(
    {
      circularBufferPointerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      esConsumptionPointer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxEsConsumption: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weatherForecastPointer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxWeatherForecast: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 48,
      },
    },
    { sequelize }
  );
}
