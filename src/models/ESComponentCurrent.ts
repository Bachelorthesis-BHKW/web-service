import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ESComponentCurrentAttributes {
  esComponentCurrentId: number;
  esComponentId: number;
  date: Date;
  current: Record<string, unknown>;
}

interface ESComponentCurrentCreateAttributes
  extends Optional<ESComponentCurrentAttributes, "esComponentCurrentId"> {}

export class ESComponentCurrent
  extends Model<
    ESComponentCurrentAttributes,
    ESComponentCurrentCreateAttributes
  >
  implements ESComponentCurrentCreateAttributes
{
  esComponentCurrentId!: number;
  esComponentId!: number;
  date!: Date;
  current!: Record<string, unknown>;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESComponentCurrent(sequelize: Sequelize): void {
  ESComponentCurrent.init(
    {
      esComponentCurrentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      esComponentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      current: {
        type: DataTypes.JSONB,
      },
    },
    { sequelize }
  );
}
