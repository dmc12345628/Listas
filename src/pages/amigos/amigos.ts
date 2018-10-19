import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as Clipboard from 'clipboard/dist/clipboard.min.js';

// native
import { CallNumber } from '@ionic-native/call-number';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Forms
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Amigo } from '../../models/Amigo';

@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html'
})
export class AmigosPage {
  celulaForm: FormGroup;

  amigos$: Observable<any[]>;
  celulaFilter$: BehaviorSubject<string|null>;

  constructor(public navCtrl: NavController,
    afs: AngularFirestore,
    private callNumber: CallNumber,
    private fb: FormBuilder,
    public toastCtrl: ToastController) {
    this.celulaFilter$ = new BehaviorSubject(null);
    this.amigos$ = combineLatest(
      this.celulaFilter$
    ).pipe(
      switchMap(([celula]) =>
        afs.collection('Amigos', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (celula) {
            query = query.where('celula', '==', celula);
          }
          return query;
        }).valueChanges()
      )
    );
  }

  ngOnInit(): void {
    this.celulaForm = this.fb.group({
      celulas: ['', Validators.required],
    });
    this.celulaForm.get('celulas').setValue('41-1');
    this.filterByCelula('41-1');

    let clipboard = new Clipboard('.clipboard');
  }

  filterByCelula(celula: string|null) {
    this.celulaFilter$.next(celula);
  }

  call(amigo: Amigo) {
    this.showMsg(amigo.nombre);
    this.callNumber.callNumber(amigo.telefono, true)
    .then(() => {
      console.log('Launched dialer!');
    }).catch(() => {
      console.log('Error launching dialer');
    });
  }

  showMsg(nombre: string) {
    let toast = this.toastCtrl.create({
      message: 'Copiaste el número de ' + nombre,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
