import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, ModalController, FabContainer } from 'ionic-angular';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as Clipboard from 'clipboard/dist/clipboard.min.js';

// native
import { CallNumber } from '@ionic-native/call-number';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Forms
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from '../../models/Persona';
import { InfoPage } from '../info/info';
import { ProcesosService } from '../../services/procesos/Procesos.service';

@Component({
  selector: 'page-personas',
  templateUrl: 'personas.html'
})
export class PersonasPage {
  celulaForm: FormGroup;

  amigos$: Observable<any[]>;
  celulaFilter$: BehaviorSubject<string|null>;
  procesoFilter$: BehaviorSubject<string|null>;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private callNumber: CallNumber,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public _procesos: ProcesosService) {
    this.celulaFilter$ = new BehaviorSubject(null);
    this.procesoFilter$ = new BehaviorSubject(null);
    this.amigos$ = combineLatest(
      this.celulaFilter$,
      this.procesoFilter$
    ).pipe(
      switchMap(([celula, proceso]) =>
        afs.collection('Personas', ref => {
          console.log(celula, proceso);
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (celula) {
            query = query.where('celula', '==', celula);
          }
          if (proceso) {
            query = query.where('proceso', '==', proceso);
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
    this.filterByProceso('ganar');

    let clipboard = new Clipboard('.clipboard');
  }

  filterByCelula(celula: string|null) {
    this.celulaFilter$.next(celula);
  }

  filterByProceso(proceso: string|null) {
    this.procesoFilter$.next(proceso);
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

  showInfoDialog(persona: Persona) {
    if (persona.guia) {
      this.afs.collection('Personas').doc(persona.guia).get().subscribe((doc) => {
        if (doc.exists) {
          let guia = doc.data();

          let data = {
            persona: persona,
            guia: guia
          };

          let myModal = this.modalCtrl.create(InfoPage, data);
          myModal.present();
        }
      })
    } else if (persona.proceso === 'discipular') {
      this.showMsg('Este discipulo no tiene PE u.u');
    } else {
      this.showMsg('Este amigo no recibe EP u.u');
    }
  }

  setProceso(procesoIndex, fab: FabContainer) {
    fab.close();
    this.filterByProceso(this._procesos.procesos[procesoIndex].title);
    this._procesos.setProceso(procesoIndex);
  }
}
