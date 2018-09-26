import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

// native
import { CallNumber } from '@ionic-native/call-number';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  amigos: Observable<any[]>;

  constructor(public navCtrl: NavController,
    afs: AngularFirestore,
    private callNumber: CallNumber) {
    this.amigos = afs.collection('Amigos').valueChanges();
  }

  launchDialer(n: string) {
    this.callNumber.callNumber(n, true)
    .then(() => {
      console.log('Launched dialer!');
    }).catch(() => {
      console.log('Error launching dialer');
    });
  }
}
