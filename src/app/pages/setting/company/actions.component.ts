import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button nbButton  nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ghost (click)="value.edit(value.data)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
      <button nbButton nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary"ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
      </button>
      <a nbTooltip="Emails de la compañia" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/setting/company-mail/' + value.data.id" >
        <nb-icon icon="list-outline"></nb-icon>
      </a>
      <a nbTooltip="Documentos de la compañia" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/setting/company-document/' + value.data.id" >
      <nb-icon icon="folder-add-outline"></nb-icon>
      </a>
      <a nbTooltip="Impuestos para la compañia" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/setting/company-document/' + value.data.id" >
      <nb-icon icon="book-outline"></nb-icon>
      </a>
    </div>
  `,
})
export class ActionsCompanyComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  
}
