import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="this.show && (this.value.data.reference_status_id == 1)" nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="value.edit(value.data, 1)" nbButton ghost>
        <nb-icon icon="edit-outline"></nb-icon>
    </button>

    <button *ngIf="this.show && (this.value.data.reference_status_id == 1)" nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="value.edit(value.data, 2)" nbButton ghost>
        <nb-icon icon="checkmark-outline"></nb-icon>
    </button>

    <button *ngIf="this.show && (this.value.data.reference_status_id == 1)" nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="value.edit(value.data, 3)" nbButton ghost>
        <nb-icon icon="close-outline"></nb-icon>
    </button>

    <button *ngIf="this.value.data.reference_status_id != 1" nbButton ghost [nbPopover]="templateRef" nbPopoverTrigger="hover">
        <nb-icon icon="info-outline"></nb-icon>
    </button>

    <button *ngIf="this.show && (this.value.data.reference_status_id == 3 && !this.value.data.admissions_id && this.value.data.patient_id)" nbTooltip="Admitir" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="value.admission(value.data)" nbButton ghost>
        <nb-icon icon="log-in-outline"></nb-icon>
    </button>

    <button *ngIf="this.show && (this.value.data.reference_status_id == 3 && !this.value.data.patient_id)" nbTooltip="Crear Paciente" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="value.patient(value.data)" nbButton ghost>
        <nb-icon icon="person-add-outline"></nb-icon>
    </button>
  </div>

  <ng-template #templateRef>
      <div class="p-3">
          <p *ngIf="this.value.data.reference_status_id == 2"><strong>TIPO DE RECHAZO:</strong> {{ this.value.data.denied_type.name }}</p>
          
          <p *ngIf="this.value.data.reference_status_id == 2"><strong>RAZÓN DE RECHAZO:</strong> {{ this.value.data.denied_reason.name }}</p>
          
          <p *ngIf="this.value.data.reference_status_id == 2"><strong>OBSERVACIÓN:</strong> {{ this.value.data.denied_observation }}</p>
          
          <p *ngIf="this.value.data.reference_status_id == 2"><strong>RECHAZADO POR:</strong> {{ (this.value.data.denied_user.firstname ? this.value.data.denied_user.firstname : '') + ' ' + (this.value.data.denied_user.middlefirstname ? this.value.data.denied_user.middlefirstname : '') + ' ' + (this.value.data.denied_user.lastname ? this.value.data.denied_user.lastname : '') + ' ' + (this.value.data.denied_user.middlelastname ? this.value.data.denied_user.middlelastname : '') }}</p>
          

          <p *ngIf="this.value.data.reference_status_id == 3"><strong>OBSERVACIÓN:</strong> {{ this.value.data.acceptance_observation }}</p>

          <p *ngIf="this.value.data.reference_status_id == 3"><strong>CONFIRMADO POR:</strong> {{ (this.value.data.acceptance_user.firstname ? this.value.data.acceptance_user.firstname : '') + ' ' + (this.value.data.acceptance_user.middlefirstname ? this.value.data.acceptance_user.middlefirstname : '') + ' ' + (this.value.data.acceptance_user.lastname ? this.value.data.acceptance_user.lastname : '') + ' ' + (this.value.data.acceptance_user.middlelastname ? this.value.data.acceptance_user.middlelastname : '') }}</p>

          
      </div>
  </ng-template>
  `,
  styleUrls: ['./reference-list.component.scss'],
})
export class Actions2Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public Form: FormGroup;
  public loading: boolean = true;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public dialog;
  public show: boolean = false;
  public human_talent_request_observation: any = [];




  constructor(

  ) {
  }

  async ngOnInit() {
    var c = (this.value.data.acceptance_date != null ? new Date(this.value.data.acceptance_date).getTime() :  new Date().getTime());
    var d = new Date().getTime();

    var e =(d - c) / (60 * 60 * 1000);

    this.show = e <= 6 ? true : false;
  }
}
