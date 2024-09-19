import Component from "./Component";

export default interface PV extends Component {
  prognosemethode_pv: number;
  kollpower_kW: number;
  kollsteigung: number;
  kollazi: number;
  deltaWp: number;
  etakoll: number;
  albedo: number;
  Intervall_min: number;
}
