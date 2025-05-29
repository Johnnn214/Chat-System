import { CanActivateFn } from '@angular/router';

export const superGuard: CanActivateFn = (route, state) => {
  return true;
};
