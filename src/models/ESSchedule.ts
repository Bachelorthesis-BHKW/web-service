import { Model, Sequelize, DataTypes } from "sequelize";
import Schedule from "../es_components/Schedule";

interface ESScheduleAttributes {
  energySystemId: number;
  esComponentId: number;
  timeIntervalMin: number;
  schedule: Schedule;
}

interface ESScheduleCreateAttributes extends ESScheduleAttributes {}

export class ESSchedule
  extends Model<ESScheduleAttributes, ESScheduleCreateAttributes>
  implements ESScheduleAttributes
{
  energySystemId!: number;
  esComponentId!: number;
  timeIntervalMin!: number;
  schedule!: Schedule;

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
        type: DataTypes.JSONB,
      },
    },
    { sequelize }
  );
}
