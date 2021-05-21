import Component from "./Component";

export default interface HeatStorage extends Component {
  speichertemp_leer: number[];
  speichertemp_voll: number[];
  v_Speicher_m3: number;
  h_Speicher_m: number;
  rho: number;
  cp: number;
  uA_Speicher: number;
  h_Sensoren_m: number;
  t_Raum: number;
}
