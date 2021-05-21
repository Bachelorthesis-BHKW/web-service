import Current from "./Current";

export default interface CHPCurrent extends Current {
  motordrehzahl: number;
  laufzeit: number;
  ruhezeit: number;
}
