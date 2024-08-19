import Component from "./Component";

export default interface SLK extends Component {
  qDot_max_kW: number;
  eingriffsgrenze: number;
  modulation_min: number;
  mindestlaufzeit_min: number;
  betriebsweise: number;
}
