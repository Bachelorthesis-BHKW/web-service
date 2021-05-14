import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ESComponentAttributes {
  esComponentId: number;
  energySystemId: number;
  name: string;
  type: string;
  kenngroessen: Record<string, unknown>;
}

interface ESComponentCreateAttributes
  extends Optional<ESComponentAttributes, "esComponentId"> {}

export class ESComponent
  extends Model<ESComponentAttributes, ESComponentCreateAttributes>
  implements ESComponentCreateAttributes
{
  esScheduleId!: number;
  energySystemId!: number;
  name!: string;
  type!: string;
  kenngroessen!: Record<string, unknown>;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESComponent(sequelize: Sequelize): void {
  ESComponent.init(
    {
      esComponentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kenngroessen: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    { sequelize }
  );
}
