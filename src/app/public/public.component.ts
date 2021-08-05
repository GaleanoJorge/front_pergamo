import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-public',
  styleUrls: ['public.component.scss'],
  template: `
    <ngx-one-column-layout [showSideBar]="false">
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PublicComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

}
