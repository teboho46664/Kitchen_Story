import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  _isUserLoggedIn:boolean = false;

  constructor() { }

  @Input()
  get isUserLoggedIn(){
    return this._isUserLoggedIn;
  }

  login(username: string, password: string):boolean{
    if(username === "niakelley" && password === "abc123")
      this._isUserLoggedIn = true;
    else
      this._isUserLoggedIn = false;

    return this._isUserLoggedIn;
  }

  logout():boolean{
    this._isUserLoggedIn=false;
    return this._isUserLoggedIn;
  }
}
