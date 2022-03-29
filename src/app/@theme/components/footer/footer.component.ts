import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <b><a href="https://healthlifeips.com/" target="_blank">HEALTH & LIFE IPS</a></b>
    </span>
    <div *ngIf="!environmentInt" class="socials">
      <a>{{app_version}}</a>
      <!--<a href="" target="_blank" class="ion ion-social-facebook"></a>
      <a href="" target="_blank" class="ion ion-social-linkedin"></a>-->
    </div>
  `,
})
export class FooterComponent implements OnInit {
  environmentInt: boolean;
  app_version: string;
  constructor() { }
  ngOnInit(): void {
    this.environmentInt = environment.production;
    this.app_version = environment.app_version;
  }
}
