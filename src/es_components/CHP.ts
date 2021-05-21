import Component from "./Component";

export interface CHP extends Component {
  p_el_max_kW: number;
  qDot_th_max_kW: number;
  mindestlaufzeit_min: number;
  mindestruhezeit_min: number;
  anlaufzeit_th90_min: number;
  verzugszeit_th_min: number;
  anlaufzeit_el90_min: number;
  verzugszeit_el_min: number;
  modulation: boolean;
  modulationsgrad_el: number[];
  modulationsgrad_th: number[];
}
