import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { BillUserActivityService } from '../../../business-controller/bill-user-activity.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="value.role_type == 1 && !(value.data.status == 'APROBADO')" nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
        ghost (click)="ConfirmAction(aprobar)">
        <nb-icon icon="checkmark-outline"></nb-icon>
    </button>

    <button *ngIf="value.role_type == 1 && !(value.data.status == 'APROBADO')" nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton
        ghost (click)="ConfirmAction(rechazar)">
        <nb-icon icon="close-outline"></nb-icon>
    </button>
    <button nbTooltip="Ver Registro Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost
        (click)="viewHC()">
        <nb-icon icon="file-add"></nb-icon>
    </button>
  </div>

  <ng-template #rechazar>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Rechazar Servicio</nb-card-header>
            <nb-card-body>
                <form [formGroup]="Form" (ngSubmit)="ChangeAccountReceivable(1)">
                    <div>
                        <div class="col-md-12">
                            <label for="observation" class="form-text text-muted font-weight-bold">Observación:</label>
                            <textarea cols="80" rows="4" nbInput formControlName="observation" id="observation" observation fullWidth placeholder="Observación"
                status="{{ isSubmitted && form.controls.observation.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}"></textarea>
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
                        <label for="observation" class="form-text text-muted font-weight-bold">¿Desea arpobar este servicio?</label>
                    </div>
                </div>
                <div class="div-send">
                    <button type="submit" (click)="ChangeAccountReceivable(0)" nbButton status="success">Aprobar</button>
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
      observation: [, Validators.compose([Validators.required])],
    });
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

  ConfirmAction(dialog: TemplateRef<any>, status?, id?) {

    this.dialog = this.dialogService.open(dialog);

  }

  async ChangeAccountReceivable(dta: any) {
    if (dta == 0) {
      var status2 = 'APROBADO'
    } else {
      var status2 = 'RECHAZADO'

    }
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
