import { Component } from '@angular/core';

import { BautizadosPage } from '../bautizados/bautizados';
import { AmigosPage } from '../amigos/amigos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AmigosPage;
  tab2Root = BautizadosPage;

  constructor() {

  }
}
