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
import { ESComponent } from "./ESComponent";
import { ESConsumption } from "./ESConsumption";
import { CircularBufferPointer } from "./CircularBufferPointer";

interface EnergySystemAttributes {
  energySystemId: number;
  userId: number;
  name: string;
  nFahrplan: number;
  untermengeNFahrplan: number;
  optimierungshorizontMin: number;
  optimierungsgroesse: number;
  deltaT: number;
  stetigkeitsfaktor: number;
  prognosemethodeTh: number;
  qThZaehlerGesamt: boolean;
  qThZaehlerGetrennt: boolean;

  maxHistoryDays: number;
  consumptionPostIntervalMin: number;
  latitude: number;
  longitude: number;
}

export interface EnergySystemCreateAttributes
  extends Optional<EnergySystemAttributes, "energySystemId"> {}

export class EnergySystem
  extends Model<EnergySystemAttributes, EnergySystemCreateAttributes>
  implements EnergySystemAttributes
{
  energySystemId!: number;
  userId!: number;
  name!: string;

  nFahrplan!: number;
  untermengeNFahrplan!: number;
  optimierungshorizontMin!: number;
  optimierungsgroesse!: number;
  deltaT!: number;
  stetigkeitsfaktor!: number;
  prognosemethodeTh!: number;
  qThZaehlerGesamt!: boolean;
  qThZaehlerGetrennt!: boolean;

  consumptionPostIntervalMin!: number;
  maxHistoryDays!: number;
  latitude!: number;
  longitude!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  getEsSchedule!: HasOneGetAssociationMixin<ESSchedule>;
  addEsSchedule!: HasOneSetAssociationMixin<ESSchedule, number>;
  createEsSchedule!: HasOneCreateAssociationMixin<ESSchedule>;

  getCircularBufferPointer!: HasOneGetAssociationMixin<CircularBufferPointer>;
  addCircularBufferPointer!: HasOneSetAssociationMixin<
    CircularBufferPointer,
    number
  >;
  createCircularBufferPointer!: HasOneCreateAssociationMixin<CircularBufferPointer>;

  getWeatherForecasts!: HasManyGetAssociationsMixin<WeatherForecast>;
  addWeatherForecast!: HasManyAddAssociationsMixin<WeatherForecast, number>;
  hasWeatherForecast!: HasManyHasAssociationMixin<WeatherForecast, number>;
  countWeatherForecasts!: HasManyCountAssociationsMixin;
  createWeatherForecast!: HasManyCreateAssociationMixin<WeatherForecast>;

  getESComponents!: HasManyGetAssociationsMixin<ESComponent>;
  addESComponent!: HasManyAddAssociationsMixin<ESComponent, number>;
  hasESComponent!: HasManyHasAssociationMixin<ESComponent, number>;
  countESComponents!: HasManyCountAssociationsMixin;
  createESComponent!: HasManyCreateAssociationMixin<ESComponent>;

  getEsConsumptions!: HasManyGetAssociationsMixin<ESConsumption>;
  addEsConsumption!: HasManyAddAssociationsMixin<ESConsumption, number>;
  hasEsConsumption!: HasManyHasAssociationMixin<ESConsumption, number>;
  countEsConsumptions!: HasManyCountAssociationsMixin;
  createEsConsumption!: HasManyCreateAssociationMixin<ESConsumption>;

  static associations: {
    esConsumptions: Association<EnergySystem, ESConsumption>;
    circularBufferPointer: Association<EnergySystem, CircularBufferPointer>;
    esComponents: Association<EnergySystem, ESComponent>;
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
      untermengeNFahrplan: {
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
      qThZaehlerGesamt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      qThZaehlerGetrennt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      consumptionPostIntervalMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxHistoryDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 90,
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
