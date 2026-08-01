export enum Prioritet {
  Mali="Mali",
  Srednji="Srednji", 
  Veliki="Veliki"
}

export interface Task {
  id: string;
  name: string;
  opis: string;
  prioritet: Prioritet;
}