import { Component } from '@angular/core';
import { ViewController, NavParams, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Persona } from '../../models/Persona';

@Component({
  selector: 'modal-info',
  templateUrl: 'info.html'
})
export class InfoModal {

  persona: Persona;
  guia: Persona;

  constructor(public navParams: NavParams,
    private callNumber: CallNumber,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {
    this.persona = navParams.data.persona;
    this.guia = navParams.data.guia;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  call(persona: Persona) {
    this.showMsg('Copiaste el número de ' + persona.nombre);
    this.callNumber.callNumber(persona.telefono, true)
    .then(() => {
      console.log('Launched dialer!');
    }).catch(() => {
      console.log('Error launching dialer');
    });
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
