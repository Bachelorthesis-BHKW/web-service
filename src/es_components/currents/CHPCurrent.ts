export class CHPCurrent {
  motordrehzahl: number;
  laufzeit: number;
  ruhezeit: number;

  constructor(motordrehzahl: number, laufzeit: number, ruhezeit: number) {
    this.motordrehzahl = motordrehzahl;
    this.laufzeit = laufzeit;
    this.ruhezeit = ruhezeit;
  }
}
