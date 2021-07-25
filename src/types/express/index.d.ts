import { User } from "../../models/User";
import { EnergySystem } from "../../models/EnergySystem";

declare global {
  namespace Express {
    interface Request {
      user: User;
      energySystem: EnergySystem;
    }
  }
}
