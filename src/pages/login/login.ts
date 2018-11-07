import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionService } from '../../services/session/Session.service';
import { NavController, ToastController } from 'ionic-angular';
import { PersonasPage } from '../personas/personas';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  messages = ['Te equivocaste de nombre? .-.',
    'Este usuario no existe :p',
    'Creo que te equivocaste :/',
    'No conozco ese nombre T-T'];

  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private _session: SessionService,
    private afs: AngularFirestore,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nickname: ['', Validators.required],
    });
  }

  login() {
    let nickname = this.loginForm.get('nickname').value;

    if (!nickname) {
      this.showMsg(this.messages[Math.floor(Math.random() * 3)]);
    } else {
      this.afs.collection('Personas').doc(nickname).get().subscribe(
        user => {
        if (user.exists) {
          this._session.user = user.data();
          this.navCtrl.setRoot(PersonasPage);
        } else {
          this.showMsg(this.messages[Math.floor(Math.random() * 3)]);
        }
      });
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
}
