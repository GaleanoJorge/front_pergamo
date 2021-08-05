import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent implements OnInit {
  @Input() routes = null;
  @Input() messageError = null;
  @Input() title = '';
  @Input() subtitle = null;
  @Input() routeBack = null;
  @Input() actionSave = null;
  @Input() showActionsHeaders = true;
  @Input() textButtonSave = 'Guardar';
  public loading = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  async Save() {
    try {
      this.loading = true;
      await this.actionSave();
    } catch (e) {
    }
    this.loading = false;
  }

}
