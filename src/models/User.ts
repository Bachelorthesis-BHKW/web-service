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
  password: string;
}

interface UserCreateAttributes extends Optional<UserAttributes, "userId"> {}

export class User
  extends Model<UserAttributes, UserCreateAttributes>
  implements UserAttributes
{
  userId!: number;
  name!: string;
  password!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  getEnergySystems!: HasManyGetAssociationsMixin<EnergySystem>;
  addEnergySystem!: HasManyAddAssociationsMixin<EnergySystem, number>;
  hasEnergySystem!: HasManyHasAssociationMixin<EnergySystem, number>;
  countEnergySystem!: HasManyCountAssociationsMixin;
  createEnergySystem!: HasManyCreateAssociationMixin<EnergySystem>;

  public static associations: {
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
