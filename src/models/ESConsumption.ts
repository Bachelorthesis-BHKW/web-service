import { Model, Sequelize, DataTypes } from "sequelize";
import { BufferInterface } from "./BufferInterface";
import { nameof } from "ts-simple-nameof";

interface ESConsumptionAttributes extends BufferInterface {
  energySystemId: number;
  date: Date;
  holiday: boolean;
  verbrauchStrom: number;
  verbrauchHeizung: number;
  verbrauchBww: number;
  aussentemperatur: number;
}

export interface ESConsumptionCreateAttributes
  extends ESConsumptionAttributes {}

export class ESConsumption
  extends Model<ESConsumptionAttributes, ESConsumptionCreateAttributes>
  implements ESConsumptionAttributes
{
  energySystemId!: number;
  bufferIndex!: number;
  date!: Date;
  holiday!: boolean;
  verbrauchStrom!: number;
  verbrauchHeizung!: number;
  verbrauchBww!: number;
  aussentemperatur!: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESConsumption(sequelize: Sequelize): void {
  ESConsumption.init(
    {
      energySystemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      holiday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      verbrauchStrom: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      verbrauchHeizung: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      verbrauchBww: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      aussentemperatur: {
        type: DataTypes.DOUBLE,
      },
    },
    { sequelize }
  );
}

export const nameOfESConsumption = (
  selector: (esc: ESConsumptionCreateAttributes) => unknown
): string => nameof<ESConsumptionCreateAttributes>(selector);
