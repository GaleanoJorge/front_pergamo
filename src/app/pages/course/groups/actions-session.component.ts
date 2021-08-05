import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <button nbButton ghost (click)="value.roomSession(value.data)" *ngIf="!value.data.teams_url" title="Crear reunión">
        <nb-icon icon="people-outline"></nb-icon>
      </button>
      <a nbButton ghost *ngIf="value.data.teams_url" title="Ir a la reunión" [href]="value.data.teams_url" target="_blank">
        <nb-icon icon="people-outline"></nb-icon>
      </a>
      <a nbButton ghost title="Llamado a lista" routerLink="../../../assistance-session/main/{{value.data.id}}">
        <nb-icon icon="file-text-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class ActionsSessionComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
