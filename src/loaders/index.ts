import { sequelizeLoader } from "./sequelize";

export default async (): Promise<void> => {
  await sequelizeLoader();
};
