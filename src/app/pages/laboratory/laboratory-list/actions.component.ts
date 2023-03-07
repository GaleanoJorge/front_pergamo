import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormChangeLaboratoryStatus } from '../form-change-laboratory-status/form-change-laboratory-status.component';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button *ngIf="value.data.laboratory_status_id == 1" ngxCheckPerms="update" nbTooltip="Tomar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="this.openDialog()">
        <nb-icon icon="clipboard-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.laboratory_status_id == 2 && value.currentRole.role_type_id == 1" nbTooltip="Enviar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="this.openDialog()">
        <nb-icon icon="paper-plane-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.laboratory_status_id == 3 && value.currentRole.role_type_id == 1" nbTooltip="Recibir" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="this.openDialog()">
        <nb-icon icon="edit-2-outline"></nb-icon>
      </button>
      <button *ngIf="value.data.laboratory_status_id == 4 && value.id == 3" nbTooltip="Interpretar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="this.openDialog()">
        <nb-icon icon="eye-outline"></nb-icon>
      </button>
    </div>
  `,
})

export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  constructor(private dialogFormService: NbDialogService,){

  }

  public openDialog(){
    let title = "";

    switch(this.value.data.laboratory_status_id){
      case 1:
        title = "Toma de laboratorio";
        break;
      case 2:
        title = "Envío de laboratorio";
        break;
      case 3:
        title = "Recepción de laboratorio";
        break;
      case 4:
        title = "Interpretación de laboratorio";
        break;
    }

    this.dialogFormService.open(FormChangeLaboratoryStatus, {
      context: {
        id: this.value.data.id,
        status: this.value.data.laboratory_status_id,
        title: title,
        refreshData: this.value.refreshData.bind(this)
      },
    });
  }

}
