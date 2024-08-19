import Current from "./Current";

export default interface HPCurrent extends Current {
  pel_akt_kW: number;
  qDot_akt_kW: number;
  betriebszustand: number;
}
