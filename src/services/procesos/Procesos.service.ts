import { Injectable } from '@angular/core';
import { Proceso } from '../../models/Proceso';
import { MotivarPage } from '../../pages/procesos/ganar/encuentro/motivar/motivar';
import { IntegrarPage } from '../../pages/procesos/ganar/encuentro/integrar/integrar';
import { ConsolidarPage } from '../../pages/procesos/ganar/encuentro/consolidar/consolidar';
import { PrepararPage } from '../../pages/procesos/ganar/encuentro/preparar/preparar';
import { SantificarPage } from '../../pages/procesos/ganar/encuentro/santificar/santificar';

@Injectable()
export class ProcesosService {

  procesos: Proceso[] = [
    {
      title: 'ganar',
      initial: 'G',
      etapas: [
        {
          title: 'Encuentro',
          verbos: [
            {
              title: 'Motivar',
              icon: 'thumbs-up',
              page: MotivarPage
            },
            {
              title: 'Integrar',
              icon: 'contacts',
              page: IntegrarPage
            },
            {
              title: 'Consolidar',
              icon: 'cube',
              page: ConsolidarPage
            },
            {
              title: 'Preparar',
              icon: 'timer',
              page: PrepararPage
            },
            {
              title: 'Santificar',
              icon: 'body',
              page: SantificarPage
            },
          ]
        }
      ]
    },
    {
      title: 'afirmar',
      initial: 'A',
      etapas: []
    },
    {
      title: 'discipular',
      initial: 'D',
      etapas: []
    }
  ];

  constructor() { }

  // getters
  get proceso() {
    return this.procesos[0];
  }

  get etapas() {
    return this.procesos[0].etapas;
  }

  setProceso(procesoIndex: number) {
    let lastProceso = new Proceso(this.procesos[0]);
    this.procesos[0] = new Proceso(this.procesos[procesoIndex]);
    this.procesos[procesoIndex] = lastProceso;
  }

}
