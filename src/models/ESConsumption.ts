import { Model, Sequelize, DataTypes } from "sequelize";
import { BufferInterface } from "./BufferInterface";

interface ESConsumptionAttributes extends BufferInterface {
  energySystemId: number;
  date: Date;
  verbrauchStrom: number;
  verbrauchHeizung: number;
  verbrauchBww: number;
  aussentemperatur: number;
}

export interface ESConsumptionCreateAttributes
  extends ESConsumptionAttributes {}

export class ESConsumption
  extends Model<ESConsumptionAttributes, ESConsumptionCreateAttributes>
  implements ESConsumptionCreateAttributes
{
  energySystemId!: number;
  bufferIndex!: number;
  date!: Date;
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
        allowNull: false,
        primaryKey: true,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
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
