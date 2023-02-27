import { Component, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <button
        *ngIf="this.rowData.medical_status_id == 4 && this.rowData.exist_ch_record == 0"
        nbTooltip="No atendida"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="value.cancelScheduling(value.data)">
        <nb-icon icon="person-delete-outline"></nb-icon>
      </button>
      <button
      *ngIf="this.rowData.medical_status_id == 4 && (this.rowData.exist_ch_record == 0 || this.rowData.exist_finalized_ch_record == 0)"
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

  public colors = {
    amarillo: '#FFFF00',
    pergamo: '#54BCC1',
    naranja: '#FF7000',
    azul: '#0000FF',
    verde: '#28B463',
    rojo: '#FF0000',
    morado: '#7A39BB',
  };

  public color;
  public color2;
  public tooltip = "Con historia clínica";
  public tooltip2 = "Sin historia clínica";

  constructor(private toastService: NbToastrService) { }

  ngOnInit() {
    this.color = this.colors.naranja;
    this.color2 = this.colors.verde;

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
