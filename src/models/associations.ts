import { EnergySystem } from "./EnergySystem";
import { User } from "./User";
import { ESSchedule } from "./ESSchedule";
import { WeatherForecast } from "./WeatherForecast";
import { ESComponent } from "./ESComponent";
import { ESConsumption } from "./ESConsumption";
import { CircularBufferPointer } from "./CircularBufferPointer";
import { ESComponentCurrent } from "./ESComponentCurrent";

export default function setupAssociations(): void {
  User.hasMany(EnergySystem, {
    sourceKey: "userId",
    foreignKey: "userId",
    onDelete: "cascade",
  });

  EnergySystem.hasMany(ESSchedule, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    onDelete: "cascade",
  });

  EnergySystem.hasOne(CircularBufferPointer, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
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
    onDelete: "cascade",
  });

  EnergySystem.hasMany(ESConsumption, {
    sourceKey: "energySystemId",
    foreignKey: "energySystemId",
    onDelete: "cascade",
  });

  ESComponent.hasMany(ESComponentCurrent, {
    sourceKey: "esComponentId",
    foreignKey: "esComponentId",
    onDelete: "cascade",
  });

  ESComponent.hasOne(ESSchedule, {
    sourceKey: "esComponentId",
    foreignKey: "esComponentId",
    onDelete: "cascade",
  });
}
