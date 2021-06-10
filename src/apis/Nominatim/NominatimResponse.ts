export default interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  extratags: Extratags;
  boundingbox: string[];
}

interface Address {
  state: string;
  country: string;
  country_code: string;
}

interface Extratags {
  "ref:nuts": string;
  wikidata: string;
  "ISO3166-2": string;
  wikipedia: string;
  population: string;
  "ref:nuts:1": string;
  state_code: string;
  border_type: string;
  "name:prefix": string;
  linked_place: string;
  "de:regionalschluessel": string;
  "TMC:cid_58:tabcd_1:Class": string;
  "TMC:cid_58:tabcd_1:LCLversion": string;
  "TMC:cid_58:tabcd_1:LocationCode": string;
  "de:amtlicher_gemeindeschluessel": string;
}
