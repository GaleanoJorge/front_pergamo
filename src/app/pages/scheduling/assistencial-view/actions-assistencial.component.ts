import { Component, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button
        *ngIf="this.rowData.medical_status_id == 4"
        nbTooltip="No atendida"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="value.cancelScheduling(value.data)">
        <nb-icon icon="person-delete-outline"></nb-icon>
      </button>
      <button
      *ngIf="this.rowData.medical_status_id == 4"
      nbTooltip="Registrar historia clínica"
      nbTooltipPlacement="top"
      nbTooltipStatus="primary"
      nbButton
      [routerLink]="'/pages/clinic-history/ch-record-list/' + rowData.admissions_id + '/' + rowData.id "
      [queryParams]="{ext_con: true}"
      ghost
      >
      <nb-icon icon="file-add-outline"></nb-icon>
    </button>
    <a *ngIf="value.data.url_teams" nbTooltip="TeleConsulta" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost href='{{value.data.url_teams}}' target="_blank">
    <nb-icon icon="video-outline"></nb-icon>
</a>
    </div>
  `,
})
export class ActionsAssistencialComponent implements ViewCell {
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
