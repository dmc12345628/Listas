import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProcesosService } from '../services/procesos/Procesos.service';
import { PersonasPage } from '../pages/personas/personas';
import { EstudiosPage } from '../pages/estudios/estudios';
import { LoginPage } from '../pages/login/login';
import { SessionService } from '../services/session/Session.service';
import { InfoModal } from '../modals/info/info';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public loginPage:any = LoginPage;
  public personasPage:any = PersonasPage;
  public estudiosPage:any = EstudiosPage;
  public infoPage:any = InfoModal;
  public rootPage:any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private afs: AngularFirestore,
    public toastCtrl: ToastController,
    public _procesos: ProcesosService,
    public _session: SessionService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this._session.isUserLoggedIn().then(isUserLoggedIn => {
        console.log(isUserLoggedIn);
        if (!isUserLoggedIn || isUserLoggedIn == null) {
          this.nav.setRoot(this.loginPage);
        } else {
          this.nav.setRoot(this.personasPage);
        }
      }).catch(err => {
        this.nav.setRoot(this.loginPage);
        console.log(err);
      });
    });
  }

  openPage(page: any) {
    this.nav.setRoot(page);
  }

  openProfile() {
    let persona = this._session.user;
    if (this._session.user.guia) {
      this.afs.collection('Personas').doc(persona.guia).get().subscribe((doc) => {
        if (doc.exists) {
          let guia = doc.data();

          let data = {
            persona: persona,
            guia: guia
          };

          this.nav.push(this.infoPage, data);
        }
      })
    } else if (persona.proceso === 'discipular') {
      this.showMsg('No tienes PE u.u');
    } else {
      this.showMsg('Tu no recibes EP u.u');
    }
  }

  showMsg(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  loggout() {
    this._session.loggout(() => {
      this.nav.setRoot(this.loginPage);
    });
  }
}
