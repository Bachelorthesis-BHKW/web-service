import { Model, Sequelize, DataTypes } from "sequelize";

interface ESForecastHistoricAttributes {
  energySystemId: number;
  pel: number;
  pelPV: number;
  pthHeiz: number;
  pthBww: number;
  speicherfuellstand: number;
  pthKessel: number;
  pthSolarthermie: number;
}

interface ESForecastHistoricCreateAttributes {}

export class ESForecastHistoric
  extends Model<
    ESForecastHistoricAttributes,
    ESForecastHistoricCreateAttributes
  >
  implements ESForecastHistoricAttributes
{
  energySystemId!: number;
  pel!: number;
  pelPV!: number;
  pthHeiz!: number;
  pthBww!: number;
  speicherfuellstand!: number;
  pthKessel!: number;
  pthSolarthermie!: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export default function initESForecastHistoric(sequelize: Sequelize): void {
  ESForecastHistoric.init(
    {
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pel: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pelPV: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pthHeiz: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pthBww: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      speicherfuellstand: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pthKessel: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pthSolarthermie: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    { sequelize }
  );
}
