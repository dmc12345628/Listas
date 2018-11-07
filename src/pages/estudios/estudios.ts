import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, FabContainer } from 'ionic-angular';
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
import { InfoModal } from '../../modals/info/info';
import { ProcesosService } from '../../services/procesos/Procesos.service';

@Component({
  selector: 'page-estudios',
  templateUrl: 'estudios.html'
})
export class EstudiosPage {
  celulaForm: FormGroup;

  amigos$: Observable<any[]>;
  weekDayFilter$: BehaviorSubject<string|null>;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private callNumber: CallNumber,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    public _procesos: ProcesosService) {
    this.weekDayFilter$ = new BehaviorSubject(null);

    this.amigos$ = combineLatest(
      this.weekDayFilter$
    ).pipe(
      switchMap(([weekDay]) =>
        afs.collection('Personas', ref => {
          console.log(weekDay);
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (weekDay) {
            query = query.where('ep', 'array-contains', weekDay);
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
    this.filterByWeekDay(null);

    let clipboard = new Clipboard('.clipboard');
  }

  filterByWeekDay(weekDay: string|null) {
    this.weekDayFilter$.next(weekDay);
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

          let myModal = this.modalCtrl.create(InfoModal, data);
          myModal.present();
        }
      })
    } else if (persona.proceso === 'discipular') {
      this.showMsg('Este discipulo no tiene PE u.u');
    } else {
      this.showMsg('Este amigo no recibe EP u.u');
    }
  }
}
