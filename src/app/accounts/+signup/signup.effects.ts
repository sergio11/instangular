import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SignupActions } from './signup.actions';
import { ISignupRequest } from './signup.types';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class SignupEffects {

  private options: RequestOptions;
  constructor(
     private actions$: Actions,
     private signupActions: SignupActions,
     private http: Http
   ) {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     this.options = new RequestOptions({ headers: headers });
   }

  @Effect() signin$ = this.actions$
    .ofType(SignupActions.SIGNUP)
    .map<ISignupRequest>(a => a.payload)
    .map<string>(user => JSON.stringify(user))
    .switchMap(user => this.http.post(`${environment.baseURL}accounts/signup`, user, this.options)
       // If successful, dispatch success action with result
      .map(res => ({ type: SignupActions.SIGNUP_SUCCESS, payload: res.json() }))
      // If request fails, dispatch failed action
      .catch(res => Observable.of({ type: SignupActions.SIGNUP_ERROR, payload: res.json() }))
    );
}
