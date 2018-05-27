import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) { }

  public canActivate(): boolean {
   if(localStorage.getItem('token') !== null) {
      return true;
   }
   this.router.navigate(['login']);
   return false;
  } 
}
