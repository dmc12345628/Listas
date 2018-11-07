import { Injectable } from '@angular/core';
import { Persona } from '../../models/Persona';
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionService {

  _user: Persona;

  constructor(private storage: Storage) {
    this.isUserLoggedIn().then(isUserLoggedIn => {
      if (isUserLoggedIn) {
        this.storage.get('user').then(user => {
          this.user = user;
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  isUserLoggedIn() {
    return this.storage.get('isUserLoggedIn');
  }

  loggout(then = () => {}) {
    this._user = null;
    this.storage.set('isUserLoggedIn', false);
    this.storage.remove('user');
    then();
  }

  // getters
  get user() {
    return this._user;
  }

  set user(user: any) {
    if (user != null) {
      this._user = user;

      this.storage.set('isUserLoggedIn', true);
      this.storage.set('user', this._user);
    } else {
      this.loggout();
    }
  }
}
