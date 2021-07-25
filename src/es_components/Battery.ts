import Component from "./Component";

export default interface Battery extends Component {
  W_el_max_kWh: number;
  P_el_Charge_max_kW: number;
  P_el_Discharge_max_kW: number;
  Charge_eff: number;
  Discharge_eff: number;
  Inverter_eff: number;
}
