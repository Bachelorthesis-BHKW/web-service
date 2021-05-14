import { EnergySystem } from "./EnergySystem";
import { User } from "./User";
import { ESSchedule } from "./ESSchedule";

export default function setupAssociations(): void {
  User.hasMany(EnergySystem, {
    sourceKey: "userId",
    foreignKey: "userId",
    as: "energySystems",
    onDelete: "cascade",
  });

  EnergySystem.hasOne(ESSchedule, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    as: "esSchedule",
    onDelete: "cascade",
  });
}
