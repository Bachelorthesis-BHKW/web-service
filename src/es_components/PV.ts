import Component from "./Component";

export default interface PV extends Component {
  kollpower_kW: number;
  kollsteigung: number;
  kollazi: number;
  deltaWp: number;
  etakoll: number;
  albedo: number;
}
