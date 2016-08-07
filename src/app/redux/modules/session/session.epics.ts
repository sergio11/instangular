import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { Http } from '@angular/http';
import { SessionActions } from './session.actions';
import { IPayloadAction } from '../../app.types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';


@Injectable()
export class SessionEpics {

  public static SIGNIN_ENDPOINT: string = "/api/accounts/signin";

  constructor(private http: Http) {}

  login = (action$: Observable<IPayloadAction>): any => {
    return action$.filter(({ type }) => type === SessionActions.LOGIN_USER)
      .flatMap(({ payload }) => {
        return this.http.post(SessionEpics.SIGNIN_ENDPOINT, payload)
          .map(result => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: result.json().meta
          }))
          .catch(error => {
            return Observable.of({
              type: SessionActions.LOGIN_USER_ERROR
            });
          });
        });
  }
}