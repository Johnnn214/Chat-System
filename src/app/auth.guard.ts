import { Router, CanActivateFn,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const val = authService.isLoggedin();
  if (val==false){
    inject(Router).navigateByUrl('');
  }else{
    return true;
  }
return false;  
};

