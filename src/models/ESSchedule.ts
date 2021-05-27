import { Model, Sequelize, DataTypes } from "sequelize";

interface ESScheduleAttributes {
  energySystemId: number;
  timeInterval: number;
  schedule: string;
}

interface ESScheduleCreateAttributes {}

export class ESSchedule
  extends Model<ESScheduleAttributes, ESScheduleCreateAttributes>
  implements ESScheduleCreateAttributes
{
  energySystemId!: number;
  timeInterval!: number;
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
      timeInterval: {
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
