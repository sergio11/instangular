import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginActions } from './login.actions';
import { ICredentials } from './login.types';
import { SessionSelectors } from './login.selector';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public email: FormControl;
  public password: FormControl;

  isLoading$: Observable<boolean>;
  hasError$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private loginActions: LoginActions,
    private sessionSelectors: SessionSelectors
  ){
    
    this.isLoading$ = sessionSelectors.isLoading$();
    this.hasError$ = sessionSelectors.hasError$();

  }

  ngOnInit() {
    this.email = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.form = this.formBuilder.group({
      "email": this.email,
      "password": this.password
    });
  }

  public onSubmit(){
    const credentials : ICredentials = {
      email: this.email.value,
      password: this.password.value
    }
    this.loginActions.signin(credentials);
  }

}
