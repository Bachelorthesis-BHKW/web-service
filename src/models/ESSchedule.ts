import { Model, Sequelize, DataTypes } from "sequelize";

interface ESScheduleAttributes {
  energySystemId: number;
  esComponentId: number;
  timeIntervalMin: number;
  schedule: string;
}

interface ESScheduleCreateAttributes {}

export class ESSchedule
  extends Model<ESScheduleAttributes, ESScheduleCreateAttributes>
  implements ESScheduleAttributes
{
  energySystemId!: number;
  esComponentId!: number;
  timeIntervalMin!: number;
  schedule!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESSchedule(sequelize: Sequelize): void {
  ESSchedule.init(
    {
      energySystemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      esComponentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      timeIntervalMin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      schedule: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
    },
    { sequelize }
  );
}
