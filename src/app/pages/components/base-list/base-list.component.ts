import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss'],
})
export class BaseListComponent implements OnInit {

  @Input() routes: any[] = [];
  @Input() messageError: any;
  @Input() toErrorScroll = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  get errors() {
    const e = [];
    if (this.messageError && this.messageError.error
      && this.messageError.error.data && this.messageError.error.data.errors) {
      const errors = this.messageError.error.data.errors;
      const errorKeys = Object.keys(errors);

      errorKeys.map(key => {
        errors[key].map(er => {
          e.push(er);
        });
      });
    }

    return e;
  }

}
