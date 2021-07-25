import Component from "./Component";

export default interface PV extends Component {
  kollpower_W: number;
  kollsteigung: number;
  kolllazi: number;
  deltaWp: number;
  etakoll: number;
  albedo: number;
}
