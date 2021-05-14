import { EnergySystem } from "./EnergySystem";
import { User } from "./User";

export default function setupAssociations(): void {
  User.hasMany(EnergySystem, {
    sourceKey: "userId",
    foreignKey: "userId",
    as: "energySystems",
    onDelete: "cascade",
  });
}
