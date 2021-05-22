import { Model, Optional, Sequelize, DataTypes } from "sequelize";
import ComponentCurrent from "../es_components/currents/Current";
import { BufferInterface } from "./BufferInterface";

interface ESComponentCurrentAttributes extends BufferInterface {
  esComponentCurrentId: number;
  esComponentId: number;
  date: Date;
  current: ComponentCurrent;
}

export interface ESComponentCurrentCreateAttributes
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
  bufferIndex!: number;
  date!: Date;
  current!: ComponentCurrent;

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
      bufferIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
