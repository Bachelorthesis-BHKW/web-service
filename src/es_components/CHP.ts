import { ESComponentType } from "./Type";

export class CHP {
  static type: ESComponentType = ESComponentType.CHP;
  readonly p_el_max_kW: number;
  readonly qDot_th_max_kW: number;
  readonly mindestlaufzeit_min: number;
  readonly mindestruhezeit_min: number;
  readonly anlaufzeit_th90_min: number;
  readonly verzugszeit_th_min: number;
  readonly anlaufzeit_el90_min: number;
  readonly verzugszeit_el_min: number;
  readonly modulation: boolean;
  readonly modulationsgrad_el: number[];
  readonly modulationsgrad_th: number[];

  constructor(
    p_el_max_kw: number,
    qDot_th_max_kW: number,
    mindestlaufzeit_min: number,
    mindestruhezeit_min: number,
    anlaufzeit_th90_min: number,
    verzugszeit_th_min: number,
    anlaufzeit_el90_min: number,
    verzugszeit_el_min: number,
    modulation: boolean,
    modulationsgrad_el: number[],
    modulationsgrad_th: number[]
  ) {
    this.p_el_max_kW = p_el_max_kw;
    this.qDot_th_max_kW = qDot_th_max_kW;
    this.mindestlaufzeit_min = mindestruhezeit_min;
    this.mindestruhezeit_min = mindestruhezeit_min;
    this.anlaufzeit_th90_min = anlaufzeit_th90_min;
    this.verzugszeit_th_min = verzugszeit_th_min;
    this.anlaufzeit_el90_min = anlaufzeit_el90_min;
    this.verzugszeit_el_min = verzugszeit_el_min;
    this.modulation = modulation;
    this.modulationsgrad_el = modulationsgrad_el;
    this.modulationsgrad_th = modulationsgrad_th;
  }
}
