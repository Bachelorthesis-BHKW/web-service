import { Sequelize, DataTypes } from "sequelize";
import { ESConsumption } from "../ESConsumption";

export class ESConsumptionHistoric extends ESConsumption {}

export default function initESConsumptionHistoric(sequelize: Sequelize): void {
  ESConsumptionHistoric.init(
    {
      energySystemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
