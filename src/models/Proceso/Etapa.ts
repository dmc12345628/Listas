import { Verbo } from '../Verbo';

export class Etapa {
  title: string;
  verbos: Verbo[];

  constructor(title: string, verbos: Verbo[]) {
    this.title = title;
    this.verbos = verbos;
  }
}
