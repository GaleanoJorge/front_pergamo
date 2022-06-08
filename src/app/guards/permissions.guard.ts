import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserBusinessService} from '../business-controller/user-business.service';
import {NbToastrService} from '@nebular/theme';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private userBS: UserBusinessService,
    private toasS: NbToastrService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot) {
    if (!this.userBS.CheckPermission(route.data.permission)) {

      const firstMenu = JSON.parse(localStorage.getItem('firstMenu'));
      this.router.navigate([firstMenu.link]);
      return false;
    }
    return true;
  }
}
