import { ESComponentType } from "./Type";

export class CHP {
  static type: ESComponentType = ESComponentType.CHP;
  readonly p_el_max_kW: number;
  readonly qDot_th_max_kW: number;
  readonly mindestlaufzeit_min: number;
  readonly mindestruhezeit_min: number;
  readonly anlaufzeit_th90: number;
  readonly verzugszeit_el: number;
  readonly modulation: boolean;
  readonly modulationsgrad_el: number[];
  readonly modulationsgrad_th: number[];

  constructor(
    p_el_max_kw: number,
    qDot_th_max_kW: number,
    mindestlaufzeit_min: number,
    mindestruhezeit_min: number,
    anlaufzeit_th90: number,
    verzugszeit_el: number,
    modulation: boolean,
    modulationsgrad_el: number[],
    modulationsgrad_th: number[]
  ) {
    this.p_el_max_kW = p_el_max_kw;
    this.qDot_th_max_kW = qDot_th_max_kW;
    this.mindestlaufzeit_min = mindestruhezeit_min;
    this.mindestruhezeit_min = mindestruhezeit_min;
    this.anlaufzeit_th90 = anlaufzeit_th90;
    this.verzugszeit_el = verzugszeit_el;
    this.modulation = modulation;
    this.modulationsgrad_el = modulationsgrad_el;
    this.modulationsgrad_th = modulationsgrad_th;
  }
}
