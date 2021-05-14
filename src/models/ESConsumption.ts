import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ESConsumptionAttributes {
  esConsumptionId: number;
  energySystemId: number;
  date: Date;
  verbrauchStrom: number;
  verbrauchHeizung: number;
  verbrauchBww: number;
  aussentemperatur: number;
}

interface ESConsumptionCreateAttributes
  extends Optional<ESConsumptionAttributes, "esConsumptionId"> {}

export class ESConsumption
  extends Model<ESConsumptionAttributes, ESConsumptionCreateAttributes>
  implements ESConsumptionCreateAttributes
{
  esConsumptionId!: number;
  energySystemId!: number;
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
      esConsumptionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
