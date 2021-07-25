import Component from "./Component";

export default interface ThermalEnergyStorage extends Component {
  speichertemp_leer: number[];
  speichertemp_voll: number[];
  v_Speicher_m3: number;
  h_Speicher_m: number;
  rho: number;
  cp: number;
  uA_Speicher: number;
  h_Sensoren_m: number;
  t_Raum: number;
  ruecklauftemp_Speicher: number;
  vorlauftemp_max_waermeerzeiger: number;
  bodentemp_leer: number;
  bodentemp_voll: number;
  deckeltemp_leer: number;
  deckeltemp_voll: number;
}
