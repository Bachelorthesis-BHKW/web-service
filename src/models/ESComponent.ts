import {
  Model,
  Optional,
  Sequelize,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from "sequelize";
import { ESComponentType } from "../es_components/ESComponentType";
import { ESComponentCurrent } from "./ESComponentCurrent";
import Component from "../es_components/Component";
import { nameof } from "ts-simple-nameof";

interface ESComponentAttributes {
  esComponentId: number;
  energySystemId: number;
  name: string;
  type: ESComponentType;
  kenngroessen: Component;

  currentsPostIntervalMin: number;
  maxHistoryDays: number;
  circularBufferMax: number;
  circularBufferPointer: number;
}

export interface ESComponentCreateAttributes
  extends Optional<
    ESComponentAttributes,
    "esComponentId" | "circularBufferPointer" | "circularBufferMax"
  > {}

export class ESComponent
  extends Model<ESComponentAttributes, ESComponentCreateAttributes>
  implements ESComponentAttributes
{
  esComponentId!: number;
  energySystemId!: number;
  name!: string;
  type!: ESComponentType;
  kenngroessen!: Component;

  currentsPostIntervalMin!: number;
  maxHistoryDays!: number;
  circularBufferMax!: number;
  circularBufferPointer!: number;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  getESComponentCurrents!: HasManyGetAssociationsMixin<ESComponentCurrent>;
  addESComponentCurrent!: HasManyAddAssociationsMixin<
    ESComponentCurrent,
    number
  >;
  hasESComponentCurrent!: HasManyHasAssociationMixin<
    ESComponentCurrent,
    number
  >;
  countESComponentCurrents!: HasManyCountAssociationsMixin;
  createESComponentCurrent!: HasManyCreateAssociationMixin<ESComponentCurrent>;

  static associations: {
    esConsumptions: Association<ESComponent, ESComponentCurrent>;
  };
}

export default function initESComponent(sequelize: Sequelize): void {
  ESComponent.init(
    {
      esComponentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      energySystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kenngroessen: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      currentsPostIntervalMin: {
        type: DataTypes.INTEGER,
        defaultValue: 60 * 24,
        allowNull: false,
      },
      maxHistoryDays: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      circularBufferMax: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      circularBufferPointer: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    { sequelize }
  );
}

export const nameOfESComponent = (
  selector: (esc: ESComponentCreateAttributes) => unknown
): string => nameof<ESComponentCreateAttributes>(selector);
