import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Origin} from '../../../models/origin';
import {Router} from '@angular/router';
import {Role} from '../../../models/role';
import {Campus} from '../../../models/campus';
import { UserCampusBusinessService } from '../../../business-controller/user-campus.service';
import {User} from '../../../models/user';
import {ItemRolePermissionBusinessService} from '../../../business-controller/item-role-permission-business.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  userMain: User;
  currentOrigin: number;
  currentRole: number;
  currentCampus: number;
  origins: Origin[] = [];
  roles: Role[] = [];
  campus: any[]=[];

  themes = [
    {
      value: 'default',
      name: 'Default',
    },
    {
      value: 'cosmic',
      name: 'Cosmic Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'corporate';

  userMenu = [{title: 'Perfil', link: './pages/personal-information'}, {title: 'Cerrar Sesión', link: '/auth/logout'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService,
              private router: Router,
              private userCampusBS: UserCampusBusinessService,
              private itemsBS: ItemRolePermissionBusinessService,) {
  }

  async ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
   
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.user = users.alan
      });
    this.userMain = this.authService.GetUser();

    if (this.userMain)
      this.user.name = this.userMain.firstname + ' ' + this.userMain.lastname;

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    if (this.userMain) {
      this.currentOrigin = this.authService.GetUserOrigin().origin_id;
      this.currentRole = this.authService.GetRole();
      this.currentCampus= this.GetCampus();
      this.origins = this.authService.GetOrigins();
      this.roles = this.authService.GetUser().roles;
      this.campus= await this.userCampusBS.GetCollection(this.userMain.id);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  GetCampus(): number {
    var campus = +localStorage.getItem('campus');
    return campus;
  }
  changeOrigin(origin: string) {
    this.authService.ChangeOrigin(origin);
    this.router.navigateByUrl('/pages');
  }

  async changeRole(role: string) {
    this.authService.ChangeRole(role);
    await this.itemsBS.GetCollection(this.authService.GetRole());
    window.location.reload();
  }
  async changeCampus(campus: number) {
    localStorage.setItem('campus', campus.toString());
    window.location.reload();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
