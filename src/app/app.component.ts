import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Verbo } from '../models/Verbo';
import { MotivarPage } from '../pages/motivar/motivar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  etapaFiesta: Verbo[] = [
    // {
    //   title: 'Orar',
    //   page: MotivarPage
    // }
  ];
  etapaEncuentro: Verbo[] = [
    {
      title: 'Motivar',
      page: MotivarPage
    },
    // {
    //   title: 'Integrar',
    //   page: MotivarPage
    // },
    // {
    //   title: 'Consolidar',
    //   page: MotivarPage
    // },
    // {
    //   title: 'Preparar',
    //   page: MotivarPage
    // },
    // {
    //   title: 'Santificar',
    //   page: MotivarPage
    // },
  ];
  tabsPage:any = TabsPage;

  rootPage:any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
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
