import { Optional, Model, Sequelize, DataTypes } from "sequelize";

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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
    }
  );
}
