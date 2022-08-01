import { Component, Input, Optional, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ThumbSettings } from '@syncfusion/ej2/charts';
import { ViewCell } from 'ng2-smart-table';
import { HumanTalentRequestObservationService } from '../../../business-controller/human-talent-request-observation.service';
import { HumanTalentRequestService } from '../../../business-controller/human-talent-request.service';


@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="this.show" nbTooltip="Aprobar" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="ConfirmAction(accept)" nbButton ghost>
        <nb-icon icon="checkmark-outline"></nb-icon>
    </button>

    <button *ngIf="this.show" nbTooltip="Rechazar" nbTooltipPlacement="top" nbTooltipStatus="primary"
        (click)="ConfirmAction(confirmAction)" nbButton ghost>
        <nb-icon icon="close-outline"></nb-icon>
    </button>
  </div>

  <ng-template #confirmAction>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Rechazar solicitud de personal</nb-card-header>
            <nb-card-body>
                <form [formGroup]="Form" (ngSubmit)="saveGroup()">
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
                            <label for="observation" class="form-text text-muted font-weight-bold">OBSERVACIÓN:</label>
                            
                            <input type="text" nbInput fullWidth id="observation" formControlName="observation"
                                observation
                                status="{{ isSubmitted && Form.controls.observation.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}" />
                        </div>
                    </div>
                    <div class="div-send">
                        <button type="submit" nbButton status="danger">Agregar</button>
                    </div>
                </form>
            </nb-card-body>
        </nb-card>
    </div>
  </ng-template>

  <ng-template #accept>
    <div class="container-fluid">
        <nb-card style="width: 430px;">
            <nb-card-header>Aceptar solicitud de personal</nb-card-header>
            <nb-card-body>
                <div>
                    <div class="col-md-12">
                        <label for="observation" class="form-text text-muted font-weight-bold">¿Desea confirmar esta
                            solicitud?</label>
                    </div>
                </div>
                <div class="div-send">
                    <button type="submit" nbButton
                        (click)=" this.value.status == 0 ? this.update(value.data, 'Aprobada PAD') : this.new(value.data)"
                        status="success">Aceptar</button>
                </div>
            </nb-card-body>
        </nb-card>
    </div>
  </ng-template>
  `,
  styleUrls: ['./human-talent-request-list.component.scss'],
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
    private humanTalentRequestS: HumanTalentRequestService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastService: NbToastrService,
    private HumanTalentRequestObservationS: HumanTalentRequestObservationService,

  ) {
  }

  async ngOnInit() {
    this.show = this.value.role == 23 ?
      //PAD 
      this.value.status == 0 ? true : false :
      // TH 
      this.value.status == 1 ? true : false;

    this.Form = this.formBuilder.group({
      observation: [, Validators.compose([Validators.required])],
    });

    this.human_talent_request_observation = this.value.human_talent_request_observation;
    

  }


  ConfirmAction(dialog: TemplateRef<any>, status?, id?) {

    this.dialog = this.dialogService.open(dialog);

  }

  update(data: any, status: string) {
    this.dialog.close();
    this.value.update(data, status);
  }
  new(data: any) {
    this.dialog.close();
    this.value.new(data);
  }

  ChangeObservation($event) {
    this.Form.patchValue({ observation: $event });
  }

  saveGroup() {

    this.isSubmitted = true;
    if (!this.Form.invalid) {
      this.loading = true;
      this.humanTalentRequestS.Update({
        id: this.value.data.id,
        observation: this.Form.controls.observation.value,
        status: this.value.status == 0 ? 'Rechazada PAD' : 'Rechazada TH',
      }).then(x => {
        this.toastService.success('', x.message);
        this.dialog.close();
        this.value.saved();
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
    }
  }
}
