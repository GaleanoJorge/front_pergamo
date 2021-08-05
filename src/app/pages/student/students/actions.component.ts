import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a ngxCheckPerms="update" nbButton ghost [routerLink]="'../../student/students/' + value.data.id+ '/edit'">
        <nb-icon icon="edit-outline"></nb-icon>
      </a>
      <button ngxCheckPerms="delete" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <button ngxCheckPerms="update" nbButton ghost (click)="value.reset_password(value.data)" title="Forzar cambio de contraseña">
        <nb-icon [icon]="(value.data.force_reset_password ? 'shield-outline' : 'shield-off-outline')"></nb-icon>
      </button>
      <a nbButton nbButton ghost [routerLink]="'../../student/students/history-student/' + value.data.id" title="Historial Usuario">
      <nb-icon icon="list-outline"></nb-icon>
    </a>
    </div>
  `,
})
export class ActionsComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
}
