import { EnergySystem } from "./EnergySystem";
import { User } from "./User";
import { ESSchedule } from "./ESSchedule";
import { WeatherForecast } from "./WeatherForecast";
import { ESComponent } from "./ESComponent";
import { ESConsumption } from "./ESConsumption";
import { CircularBufferPointer } from "./CircularBufferPointer";

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

  EnergySystem.hasOne(CircularBufferPointer, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    as: "circularBufferPointer",
    onDelete: "cascade",
  });

  EnergySystem.hasMany(WeatherForecast, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    as: "weatherForecasts",
    onDelete: "cascade",
  });

  EnergySystem.hasMany(ESComponent, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    as: "esComponents",
    onDelete: "cascade",
  });

  EnergySystem.hasMany(ESConsumption, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    as: "esConsumptions",
    onDelete: "cascade",
  });
}
