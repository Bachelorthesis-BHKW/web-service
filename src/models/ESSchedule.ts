import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ESScheduleAttributes {
  esScheduleId: number;
  energySystemId: number;
  timeIntervall: number;
  schedule: string;
}

interface ESScheduleCreateAttributes
  extends Optional<ESScheduleAttributes, "esScheduleId"> {}

export class ESSchedule
  extends Model<ESScheduleAttributes, ESScheduleCreateAttributes>
  implements ESScheduleCreateAttributes
{
  esScheduleId!: number;
  energySystemId!: number;
  timeIntervall!: number;
  schedule!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESSchedule(sequelize: Sequelize): void {
  ESSchedule.init(
    {
      esScheduleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeIntervall: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      schedule: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    { sequelize }
  );
}
