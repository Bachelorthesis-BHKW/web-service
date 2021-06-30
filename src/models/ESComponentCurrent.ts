import { Model, Sequelize, DataTypes } from "sequelize";
import ComponentCurrent from "../es_components/currents/Current";
import { BufferInterface } from "./BufferInterface";
import { nameof } from "ts-simple-nameof";

interface ESComponentCurrentAttributes extends BufferInterface {
  esComponentId: number;
  date: Date;
  current: ComponentCurrent;
}

export interface ESComponentCurrentCreateAttributes
  extends ESComponentCurrentAttributes {}

export class ESComponentCurrent
  extends Model<
    ESComponentCurrentAttributes,
    ESComponentCurrentCreateAttributes
  >
  implements ESComponentCurrentCreateAttributes
{
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
      esComponentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

export const nameOfESComponentCurrent = (
  selector: (esc: ESComponentCurrentCreateAttributes) => unknown
): string => nameof<ESComponentCurrentCreateAttributes>(selector);
