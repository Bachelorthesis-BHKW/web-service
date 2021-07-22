import { Sequelize, DataTypes } from "sequelize";
import { ESComponentCurrent } from "../ESComponentCurrent";

export class ESComponentCurrentHistoric extends ESComponentCurrent {}

export default function initESComponentCurrentHistoric(
  sequelize: Sequelize
): void {
  ESComponentCurrentHistoric.init(
    {
      esComponentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bufferIndex: {
        type: DataTypes.INTEGER,
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
