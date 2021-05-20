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
} from "sequelize";
import { EnergySystem } from "./EnergySystem";

interface UserAttributes {
  userId: number;
  name: string;
  email: string;
  company: string;
  password: string;
}

export interface UserCreateAttributes
  extends Optional<UserAttributes, "userId"> {}

export class User
  extends Model<UserAttributes, UserCreateAttributes>
  implements UserAttributes
{
  userId!: number;
  name!: string;
  email!: string;
  company!: string;
  password!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  getEnergySystems!: HasManyGetAssociationsMixin<EnergySystem>;
  addEnergySystem!: HasManyAddAssociationsMixin<EnergySystem, number>;
  hasEnergySystem!: HasManyHasAssociationMixin<EnergySystem, number>;
  countEnergySystems!: HasManyCountAssociationsMixin;
  createEnergySystem!: HasManyCreateAssociationMixin<EnergySystem>;

  static associations: {
    energySystems: Association<User, EnergySystem>;
  };
}

export default function initUser(sequelize: Sequelize): void {
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );
}
