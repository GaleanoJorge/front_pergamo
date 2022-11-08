import { Component, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button
        *ngIf="!complete && this.rowData.medical_status_id == 2"
        nbTooltip="Confirmar"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="value.confirmScheduling(value.data)"
      >
        <nb-icon icon="checkmark-outline"></nb-icon>
      </button>

      <button
        *ngIf="this.rowData.medical_status_id == 3"
        nbTooltip="Facturar"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="value.check_in(rowData)"
      >
        <nb-icon icon="arrow-forward-outline"></nb-icon>
      </button>

      <button
        *ngIf="this.rowData.medical_status_id == 2 || this.rowData.medical_status_id == 3"
        nbTooltip="Cancelar cita"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="value.cancelScheduling(rowData)"
      >
        <nb-icon icon="close-outline"></nb-icon>
      </button>

      <button
        *ngIf="complete"
        nbTooltip="Completar datos de paciente"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="this.value.editP(rowData)"
      >
        <nb-icon icon="alert-triangle-outline"></nb-icon>
      </button>
    </div>
  `,
})
export class ActionsSchedulingComponent implements ViewCell {
  @Input() value: any; // This hold the cell value
  @Input() rowData: any; // This holds the entire row object

  public complete: boolean = false;
  public show_cc: boolean = false;
  public route: string = '';

  constructor(private toastService: NbToastrService) {}

  ngOnInit() {
    if (this.rowData.patient) {
      if (this.rowData.patient.email == null) {
        this.complete = true;
        this.route =
          '/pages/admissions/patient/' + this.rowData.patient.id + '/edit';
      }
    }
    if (this.rowData.medical_status_id == 2) {
      this.show_cc == true;
    }
  }
}
