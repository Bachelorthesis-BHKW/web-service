import { ESComponentType } from "./Type";

export class PeakBoiler {
  static type: ESComponentType = ESComponentType.PeakBoiler;

  qDot_Kessel_max_kW: number;

  constructor(qDot_Kessel_max_kW: number) {
    this.qDot_Kessel_max_kW = qDot_Kessel_max_kW;
  }
}
