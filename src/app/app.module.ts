import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// modals
import { InfoModal } from '../modals/info/info';
// pages
import { LoginPage } from '../pages/login/login';
import { EstudiosPage } from '../pages/estudios/estudios';
import { PersonasPage } from '../pages/personas/personas';
// procesos
// encuentro
import { MotivarPage } from '../pages/procesos/ganar/encuentro/motivar/motivar';
import { IntegrarPage } from '../pages/procesos/ganar/encuentro/integrar/integrar';
import { ConsolidarPage } from '../pages/procesos/ganar/encuentro/consolidar/consolidar';
import { PrepararPage } from '../pages/procesos/ganar/encuentro/preparar/preparar';
import { SantificarPage } from '../pages/procesos/ganar/encuentro/santificar/santificar';

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
import { SessionService } from '../services/session/Session.service';

@NgModule({
  declarations: [
    MyApp,
    // modals
    InfoModal,
    // pages
    LoginPage,
    EstudiosPage,
    PersonasPage,
    // procesos
    // encuentro
    MotivarPage,
    IntegrarPage,
    ConsolidarPage,
    PrepararPage,
    SantificarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // modal
    InfoModal,
    // pages
    LoginPage,
    EstudiosPage,
    PersonasPage,
    // procesos
    // encuentro
    MotivarPage,
    IntegrarPage,
    ConsolidarPage,
    PrepararPage,
    SantificarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // services
    ProcesosService,
    SessionService
  ]
})
export class AppModule {}
