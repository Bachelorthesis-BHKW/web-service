import Component from "./Component";

export interface HP extends Component {
  p_el_max_kW: number;
  qDot_th_max_kW: number;
  mindestlaufzeit_min: number;
  mindestruhezeit_min: number;
  modulation: boolean;
  modulationsgrad_el: number;
  modulationsgrad_th: number;
  grenzkosten: number;
  straferloes: number;
}
