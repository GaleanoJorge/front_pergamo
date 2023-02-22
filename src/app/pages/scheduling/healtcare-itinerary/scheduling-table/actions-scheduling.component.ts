import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
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
        *ngIf="this.rowData.medical_status_id == 4"
        nbTooltip="Recibo de caja"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="value.copayPDF(value.data)"
      >
        <nb-icon icon="file-text"></nb-icon>
      </button>

      <button
        *ngIf="this.rowData.medical_status_id == 3 && !complete"
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
        *ngIf="this.rowData.medical_status_id == 3"
        nbTooltip="Trasladar"
        nbTooltipPlacement="top"
        nbTooltipStatus="primary"
        nbButton
        ghost
        (click)="reschedule(re_scheduling)"
      >
        <nb-icon icon="calendar-outline"></nb-icon>
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
        *ngIf="this.rowData.medical_status_id != 5 && complete"
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



    <ng-template #re_scheduling>
      <nb-card style="width: 100%;height: 800px;overflow: auto;">
        <nb-card-header>
        </nb-card-header>
        <nb-card-body>
          <ngx-healthcare-itinerary [isRescheduling]="true" (messageEvent)="receiveMessage($event)" [medical_diary_id]="rowData.medical_diary_id" [medical_diary_day_id]="rowData.id" [campus_id]="rowData.medical_diary.campus_id"></ngx-healthcare-itinerary>
        </nb-card-body>

        <nb-card-footer class="d-flex justify-content-end">
          <div class ="col-12 col-sm-12 col-md-2">
            <button nbButton (click)="closeDialog()" type="button">Cerrar</button>
          </div>
        </nb-card-footer>
      </nb-card>
    </ng-template>
  `,
})
export class ActionsSchedulingComponent implements ViewCell {
  @Input() value: any; // This hold the cell value
  @Input() rowData: any; // This holds the entire row object

  public complete: boolean = false;
  public show_cc: boolean = false;
  public route: string = '';
  public dialog;

  constructor(
    private toastService: NbToastrService,
    private dialogFormService: NbDialogService,
    ) { }

  ngOnInit() {
    if (this.rowData.patient) {
      if (this.rowData.patient.email == null || this.rowData.patient.email == '') {
        this.complete = true;
        this.route =
          '/pages/admissions/patient/' + this.rowData.patient.id + '/edit';
      }
    }
    if (this.rowData.medical_status_id == 2) {
      this.show_cc == true;
    }
  }

  reschedule(dialog: TemplateRef<any>) {
    this.dialog = this.dialogFormService.open(dialog);
  }

  receiveMessage($event) {
    if ($event == true) {
      this.value.refreshTable();
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  // generatePdf() {
  //   this.BillingPadS.GeneratePdf({
  //     id: this.billing_id,
  //     billing_type: 'PREFACTURA',
  //     selected_procedures: JSON.stringify(this.selectedOptions)
  //   }).then(x => {
  //     this.toastS.success('Archivo generado con exito', 'Exito');
  //     window.open(x['url'], '_blank');
  //   }).catch(x => {
  //     this.toastS.danger('Error al generar archivo: ' + x, 'Error');
  //   });
  // }
}
