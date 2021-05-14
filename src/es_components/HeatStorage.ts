export class HeatStorage {
  speichertemp_leer: number[];
  speichertemp_voll: number[];
  v_Speicher_m3: number;
  h_Speicher_m: number;
  rho: number;
  cp: number;
  uA_Speicher: number;
  h_Sensoren_m: number;
  t_Raum: number;

  constructor(
    speichertemp_leer: number[],
    speichertemp_voll: number[],
    v_Speicher_m3: number,
    h_Speicher_m: number,
    rho: number,
    cp: number,
    uA_Speicher: number,
    h_Sensoren_m: number,
    t_Raum: number
  ) {
    this.speichertemp_leer = speichertemp_leer;
    this.speichertemp_voll = speichertemp_voll;
    this.v_Speicher_m3 = v_Speicher_m3;
    this.h_Speicher_m = h_Speicher_m;
    this.rho = rho;
    this.cp = cp;
    this.uA_Speicher = uA_Speicher;
    this.h_Sensoren_m = h_Sensoren_m;
    this.t_Raum = t_Raum;
  }
}
