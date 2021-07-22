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
import { Region } from "feiertagejs";
import { nameof } from "ts-simple-nameof";

export enum AlgorithmTrigger {
  time = "time",
  post = "post",
}

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
  gewichtungsfaktorZufall: number;

  algorithmTrigger: AlgorithmTrigger;
  cronTriggerTime: string;
  maxHistoryDays: number;
  consumptionPostIntervalMin: number;
  latitude: number;
  longitude: number;
  region: Region;
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
  gewichtungsfaktorZufall!: number;

  algorithmTrigger!: AlgorithmTrigger;
  cronTriggerTime!: string;
  consumptionPostIntervalMin!: number;
  maxHistoryDays!: number;
  latitude!: number;
  longitude!: number;
  region!: Region;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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

  getESConsumptions!: HasManyGetAssociationsMixin<ESConsumption>;
  addESConsumption!: HasManyAddAssociationsMixin<ESConsumption, number>;
  hasESConsumption!: HasManyHasAssociationMixin<ESConsumption, number>;
  countESConsumptions!: HasManyCountAssociationsMixin;
  createESConsumption!: HasManyCreateAssociationMixin<ESConsumption>;

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
      gewichtungsfaktorZufall: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      algorithmTrigger: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: AlgorithmTrigger.post,
      },
      cronTriggerTime: {
        type: DataTypes.STRING,
        allowNull: false,
        // https://crontab.guru
        defaultValue: "5 00 * * *",
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
      region: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "BUND",
      },
    },
    {
      sequelize,
    }
  );
}

export const nameOfEnergySystem = (
  selector: (es: EnergySystemCreateAttributes) => unknown
): string => nameof<EnergySystemCreateAttributes>(selector);
