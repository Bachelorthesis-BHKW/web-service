import { Model, Sequelize, DataTypes } from "sequelize";

interface ESScheduleHistoricAttributes {
  energySystemId: number;
  esComponentId: number;
  scheduleStep: number;
}

interface ESScheduleHistoricCreateAttributes {}

export class ESScheduleHistoric
  extends Model<
    ESScheduleHistoricAttributes,
    ESScheduleHistoricCreateAttributes
  >
  implements ESScheduleHistoricCreateAttributes
{
  energySystemId!: number;
  esComponentId!: number;
  scheduleStep!: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESScheduleHistoric(sequelize: Sequelize): void {
  ESScheduleHistoric.init(
    {
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      esComponentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scheduleStep: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    { sequelize }
  );
}
