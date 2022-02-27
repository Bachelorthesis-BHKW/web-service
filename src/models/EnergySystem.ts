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
  prognosemethodeEl: number;
  qThZaehlerGesamt: boolean;
  qThZaehlerGetrennt: boolean;
  gewichtungsfaktorZufall: number;
  uaGeb: number;

  algorithmTrigger: AlgorithmTrigger;
  cronTriggerTime: string;
  inputFilename: string;
  outputFilename: string;
  mailInputTrigger: boolean;
  mailOutputTrigger: boolean;
  mailAddress: string;
  ftpInputTrigger: boolean;
  ftpOutputTrigger: boolean;
  ftpServer: string;
  ftpUser: string;
  ftpPassword: string;
  ftpInputPath: string;
  ftpOutputPath: string;
  zellbereich_date: string;
  zellbereich_consumptions: string;
  zelle_chp1_id: string;
  zellbereich_chp1: string;
  zelle_tes_id: string;
  zellbereich_tes: string;
  output_column: string;

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
  prognosemethodeEl!: number;
  qThZaehlerGesamt!: boolean;
  qThZaehlerGetrennt!: boolean;
  gewichtungsfaktorZufall!: number;
  uaGeb!: number;

  algorithmTrigger!: AlgorithmTrigger;
  cronTriggerTime!: string;
  inputFilename!: string;
  outputFilename!: string;
  mailInputTrigger!: boolean;
  mailOutputTrigger!: boolean;
  mailAddress!: string;
  ftpInputTrigger!: boolean;
  ftpOutputTrigger!: boolean;
  ftpServer!: string;
  ftpUser!: string;
  ftpPassword!: string;
  ftpInputPath!: string;
  ftpOutputPath!: string;
  zellbereich_date!: string;
  zellbereich_consumptions!: string;
  zelle_chp1_id!: string;
  zellbereich_chp1!: string;
  zelle_tes_id!: string;
  zellbereich_tes!: string;
  output_column!: string;

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

  getESSchedules!: HasManyGetAssociationsMixin<ESSchedule>;

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
      prognosemethodeEl: {
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
      uaGeb: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.3,
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
      inputFilename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outputFilename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mailInputTrigger: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      mailOutputTrigger: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      mailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ftpInputTrigger: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      ftpOutputTrigger: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      ftpServer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ftpUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ftpPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ftpInputPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ftpOutputPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zellbereich_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zellbereich_consumptions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zelle_chp1_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zellbereich_chp1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zelle_tes_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zellbereich_tes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      output_column: {
        type: DataTypes.STRING,
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
