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
import { ESComponentType } from "../es_components/Type";
import { ESComponentCurrent } from "./ESComponentCurrent";
import Component from "../es_components/Component";

interface ESComponentAttributes {
  esComponentId: number;
  energySystemId: number;
  name: string;
  type: ESComponentType;
  kenngroessen: Component;
}

export interface ESComponentCreateAttributes
  extends Optional<ESComponentAttributes, "esComponentId"> {}

export class ESComponent
  extends Model<ESComponentAttributes, ESComponentCreateAttributes>
  implements ESComponentCreateAttributes
{
  esComponentId!: number;
  energySystemId!: number;
  name!: string;
  type!: ESComponentType;
  kenngroessen!: Component;

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
    },
    { sequelize }
  );
}
