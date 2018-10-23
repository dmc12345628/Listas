import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { InfoPage } from '../pages/info/info';
import { PersonasPage } from '../pages/personas/personas';
import { MotivarPage } from '../pages/procesos/ganar/encuentro/motivar/motivar';
import { IntegrarPage } from '../pages/procesos/ganar/encuentro/integrar/integrar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// native
import { CallNumber } from '@ionic-native/call-number';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// services
import { ProcesosService } from '../services/procesos/Procesos.service';

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    PersonasPage,
    // procesos
    // encuentro
    MotivarPage,
    IntegrarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    PersonasPage,
    // procesos
    // encuentro
    MotivarPage,
    IntegrarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // services
    ProcesosService
  ]
})
export class AppModule {}
