import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface CircularBufferPointerAttributes {
  circularBufferPointerId: number;
  energySystemId: number;
  esConsumptionPointer: number;
  weatherForecastPointer: number;
}

interface CircularBufferPointerCreateAttributes
  extends Optional<
    CircularBufferPointerAttributes,
    "circularBufferPointerId"
  > {}

export class CircularBufferPointer
  extends Model<
    CircularBufferPointerAttributes,
    CircularBufferPointerCreateAttributes
  >
  implements CircularBufferPointerCreateAttributes
{
  circularBufferPointerId!: number;
  energySystemId!: number;
  esConsumptionPointer!: number;
  weatherForecastPointer!: number;

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
      },
      weatherForecastPointer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize }
  );
}
