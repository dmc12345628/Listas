import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BautizadosPage } from '../pages/bautizados/bautizados';
import { ContactPage } from '../pages/contact/contact';
import { AmigosPage } from '../pages/amigos/amigos';
import { TabsPage } from '../pages/tabs/tabs';
import { MotivarPage } from '../pages/motivar/motivar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// native
import { CallNumber } from '@ionic-native/call-number';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    MyApp,
    BautizadosPage,
    ContactPage,
    AmigosPage,
    TabsPage,
    MotivarPage
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
    BautizadosPage,
    ContactPage,
    AmigosPage,
    TabsPage,
    MotivarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
