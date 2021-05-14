import {
  Optional,
  Model,
  Sequelize,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  HasOneCreateAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneGetAssociationMixin,
} from "sequelize";
import { ESSchedule } from "./ESSchedule";
import { WeatherForecast } from "./WeatherForecast";

interface EnergySystemAttributes {
  energySystemId: number;
  userId: number;
  name: string;
  nFahrplan: number;
  optimierungshorizontMin: number;
  optimierungsgroesse: number;
  deltaT: number;
  stetigkeitsfaktor: number;
  prognosemethodeTh: number;

  latitude: number;
  longitude: number;
}

interface EnergySystemCreateAttributes
  extends Optional<EnergySystemAttributes, "energySystemId"> {}

export class EnergySystem
  extends Model<EnergySystemAttributes, EnergySystemCreateAttributes>
  implements EnergySystemAttributes
{
  energySystemId!: number;
  userId!: number;
  name!: string;

  nFahrplan!: number;
  optimierungshorizontMin!: number;
  optimierungsgroesse!: number;
  deltaT!: number;
  stetigkeitsfaktor!: number;
  prognosemethodeTh!: number;

  latitude!: number;
  longitude!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  getESSchedule!: HasOneGetAssociationMixin<ESSchedule>;
  addESSchedule!: HasOneSetAssociationMixin<ESSchedule, number>;
  createESSchedule!: HasOneCreateAssociationMixin<ESSchedule>;

  getWeatherForecasts!: HasManyGetAssociationsMixin<WeatherForecast>;
  addWeatherForecast!: HasManyAddAssociationsMixin<WeatherForecast, number>;
  hasWeatherForecast!: HasManyHasAssociationMixin<WeatherForecast, number>;
  countWeatherForecast!: HasManyCountAssociationsMixin;
  createWeatherForecast!: HasManyCreateAssociationMixin<WeatherForecast>;

  static associations: {
    esSchedule: Association<EnergySystem, ESSchedule>;
    weatherForecasts: Association<EnergySystem, WeatherForecast>;
  };
}

export default function initEnergySystem(sequelize: Sequelize): void {
  EnergySystem.init(
    {
      energySystemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nFahrplan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      optimierungshorizontMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      optimierungsgroesse: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deltaT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stetigkeitsfaktor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prognosemethodeTh: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );
}
