import { Etapa } from "./Proceso/Etapa";

export class Proceso {
  title: string;
  initial: string;
  etapas: Etapa[];

  constructor(jsonData: any) {
    if (jsonData) {
      this.title = jsonData.title;
      this.initial = jsonData.initial;
      this.etapas = jsonData.etapas;
    } else {
      this.title = '';
      this.initial = '';
      this.etapas = [];
    }
  }
}
