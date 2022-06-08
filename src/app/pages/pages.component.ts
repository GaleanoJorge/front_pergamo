import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {ItemRolePermissionBusinessService} from '../business-controller/item-role-permission-business.service';
import {AuthService} from '../services/auth.service';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu *ngIf="menu" [items]="menu" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: any[];
  mainMenu: any[] = [];
  public role: number;
  public messageError: string = '';

  constructor(
    private itemBS: ItemRolePermissionBusinessService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('mainMenu'));
  }
  

}
