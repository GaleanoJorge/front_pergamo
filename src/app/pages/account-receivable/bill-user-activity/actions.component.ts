import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { BillUserActivityService } from '../../../business-controller/bill-user-activity.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="this.value.data.account_receivable.status_bill_id == 1 && value.role_type == 1 && !(value.data.status == 'APROBADO' || value.data.status == 'RECHAZADO')" nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
        ghost (click)="ConfirmAction(aprobar)">
        <nb-icon icon="checkmark-outline"></nb-icon>
    </button>

    <button *ngIf="this.value.data.account_receivable.status_bill_id == 1 && value.role_type == 1 && !(value.data.status == 'APROBADO' || value.data.status == 'RECHAZADO')" nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
        ghost (click)="ConfirmAction(rechazar)">
        <nb-icon icon="close-outline"></nb-icon>
    </button>
    <button nbTooltip="Ver Registro Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost
        (click)="viewHC()">
        <nb-icon icon="file-add"></nb-icon>
    </button>
    <button *ngIf="this.value.data.account_receivable.status_bill_id == 1" nbTooltip="Recalcular valor" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost
        (click)="ConfirmAction(recalcular)">
        <nb-icon icon="repeat-outline"></nb-icon>
    </button>
  </div>

  <ng-template #rechazar>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Rechazar Servicio</nb-card-header>
            <nb-card-body>
                <form [formGroup]="Form" (ngSubmit)="ChangeAccountReceivable(1)">
                    <div>
                        <div class="col-12 col-sm-12 col-md-12">
                            <label for="human_talent_request_observation" class="form-text text-muted font-weight-bold">SELECCIONE OBSERVACIÓN:</label>
                            <nb-select
                                id="human_talent_request_observation_id" fullWidth (selectedChange)="ChangeObservation($event)">
                                <nb-option>Seleccione...</nb-option>
                                <nb-option *ngFor="let item of human_talent_request_observation" [value]="item.name">
                                    {{ item.name }}</nb-option>
                            </nb-select>
                        </div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Observación:</label>
                            <textarea cols="80" rows="4" nbInput formControlName="observation" id="observation" observation fullWidth placeholder="Observación"
                              status="{{ isSubmitted && Form.controls.observation.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}"></textarea>
                        </div>
                    </div>
                    <div class="div-send">
                        <button type="submit" nbButton status="danger">Rechazar</button>
                    </div>
                </form>
            </nb-card-body>
        </nb-card>
    </div>
  </ng-template>


  <ng-template #aprobar>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Aprobar Servicio</nb-card-header>
            <nb-card-body>
                <div>
                    <div class="col-md-12">
                        <label for="observation" class="form-text text-muted font-weight-bold">¿Desea aprobar este servicio?</label>
                    </div>
                </div>
                <div class="div-send">
                    <button type="submit" (click)="ChangeAccountReceivable(0)" nbButton status="success">Aprobar</button>
                </div>
            </nb-card-body>
        </nb-card>
    </div>
  </ng-template>
  


  <ng-template #recalcular>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Recalcular Valor Del Servicio</nb-card-header>
            <nb-card-body>
                <div>
                    <div class="col-md-12">
                        <label for="observation" class="form-text text-muted font-weight-bold">¿Desea recalcular el valor de este servicio?</label>
                    </div>
                </div>
                <div class="div-send">
                    <button type="submit" (click)="Recalculate()" nbButton status="success">Aprobar</button>
                </div>
            </nb-card-body>
        </nb-card>
    </div>
  </ng-template>
  
  `,
  styleUrls: ['./bill-user-activity.component.scss'],
})
export class ActionsBillComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public dialog: any = null;
  public Form: FormGroup;
  public human_talent_request_observation: any = [];


  constructor(
    private toastService: NbToastrService,
    private billUserActivityS: BillUserActivityService,
    private viewHCS: ChRecordService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
  ) {
  }

  async ngOnInit() {
    this.Form = this.formBuilder.group({
      observation: ['', Validators.compose([Validators.required])],
    });

    this.human_talent_request_observation = this.value.human_talent_request_observation;
  }




  viewHC() {
    this.viewHCS.ViewHC(this.value.data.ch_record_id).then(x => {

      //this.loadingDownload = false;
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  ChangeObservation($event: string) {
    this.Form.patchValue({ observation: (this.Form.controls.observation.value == "" ? "" : this.Form.controls.observation.value + ", ") + $event });
  }

  ConfirmAction(dialog: TemplateRef<any>, status?, id?) {

    this.dialog = this.dialogService.open(dialog);

  }

  ChangeAccountReceivable(dta: any) {
    if (dta == 0) {
      var status2 = 'APROBADO'
      this.save(status2);
    } else {
      var status2 = 'RECHAZADO'
      this.isSubmitted = true;
      if (!this.Form.invalid) {
        this.save(status2);
      }
    }


  }

  Recalculate() {
    this.billUserActivityS.Recalculate({
      id: this.value.data.id
    }).then(x => {
      this.dialog.close();
      this.toastService.success('', x.message);
      this.value.refresh();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.toastService.warning('', x);
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  async save(status2: string) {
    await this.billUserActivityS.Update({
      id: this.value.data.id,
      status: status2,
      observation: this.Form.controls.observation.value,
    }).then(x => {
      this.dialog.close();
      this.toastService.success('', x.message);
      this.value.refresh();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }


}
