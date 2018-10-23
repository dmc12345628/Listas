import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProcesosService } from '../services/procesos/Procesos.service';
import { PersonasPage } from '../pages/personas/personas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  personasPage:any = PersonasPage;
  rootPage:any = PersonasPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public _procesos: ProcesosService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: any) {
    this.rootPage = page;
  }
}
