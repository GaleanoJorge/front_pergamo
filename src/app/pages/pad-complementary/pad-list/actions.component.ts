import { Component, Input, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe, Time } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { DiagnosisService } from '../../../business-controller/diagnosis.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { time } from 'console';
import { PacMonitoringService } from '../../../business-controller/pac-monitoring.service';

@Component({
    template: `
  <div class="d-flex justify-content-center">
    <a *ngIf="this.edit==false" nbTooltip="Diligenciar seguimiento
    " nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="read" nbButton ghost (click)="value.confirm(value.data)">
      <nb-icon icon="checkmark-square-outline"></nb-icon>
    </a>
    <button *ngIf="this.edit==true" nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" ngxCheckPerms="update" nbButton ghost (click)="value.edit(value.data);">
        <nb-icon icon="edit-outline"></nb-icon>
    </button>
  </div>
  <!--  <ng-template #confirmAction>
  <div class="container-fluid">
      <nb-card style="width: 1100px;">
          <nb-card-header>SEGUIMIENTO Y CONTROL PLAN COMPLEMENTARIO </nb-card-header>
          <nb-card-body>
              <form [formGroup]="form" (ngSubmit)="saveGroup()" [nbSpinner]="loading">
                  <div class="row mt-3">
                      <div class="col-12">
                          <p class="text-muted subtitle" style="text-align: center;">Datos subjetivos</p>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <label for="symptoms" class="form-text text-muted font-weight-bold">Sintomas:</label>
                          <input oninput="this.value = this.value.toUpperCase()" minlength="10" nbInput fullWidth
                              size="auto" id="symptoms" formControlName="symptoms" symptoms
                              status="{{ isSubmitted && form.controls.symptoms.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                      </div>
                      <div class="col-md-6">
                          <label for="respiratory_issues" class="form-text text-muted font-weight-bold">Sintomas
                              respiratorios:</label>
                          <nb-card-body>
                              <nb-toggle formControlName="respiratory_issues" respiratory_issues></nb-toggle>
                          </nb-card-body>
                      </div>
                      <div class="col-md-6">
                          <label for="covid_contact" class="form-text text-muted font-weight-bold">Contacto estrecho con positivos para covid</label>
                          <nb-card-body>
                              <nb-toggle formControlName="covid_contact" covid_contact></nb-toggle>
                          </nb-card-body>
                      </div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-12">
                          <p class="text-muted subtitle" style="text-align: center;">Gestión y seguimiento del
                              servicio</p>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="application_date" class="form-text text-muted font-weight-bold">Fecha de
                                  solicitud:</label>
                              <input type="date" nbInput fullWidth id="application_date"
                                  formControlName="application_date" application_date
                                  status="{{ isSubmitted && form.controls.application_date.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  [max]="today" />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <label for="authorization_pin" class="form-text text-muted font-weight-bold">PIN -ID -
                              Autorización :</label>
                          <input nbInput fullWidth id="authorization_pin" formControlName="authorization_pin"
                              authorization_pin
                              status="{{ isSubmitted && form.controls.authorization_pin.errors ? 'danger' : isSubmitted ? 'success' : '' }}" />
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                              <label for="profesional_user_id"
                                  class="form-text text-muted font-weight-bold">Profesional asignado:</label>
                              <input fullWidth nbInput list="codes" (change)="saveCode($event.target.value, null) "
                                  id="profesional_user_id" formControlName="profesional_user_id" profesional_user_id
                                  type="text" required
                                  status="{{ isSubmitted && form.controls.profesional_user_id.errors ? 'danger' : isSubmitted ? 'success' : '' }}">
                              <datalist id="codes">
                                  <option *ngFor="let item of profesionals" [value]="item.nombre_completo">{{item.identification}} - {{item.user_role[0].role.name}}</option>
                              </datalist>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <label for="diagnosis_id" class="form-text text-muted font-weight-bold">CIE10:</label>
                          <input fullWidth nbInput list="diagnostic" (change)="saveCode($event.target.value, 1)"
                              id="diagnosis_id" formControlName="diagnosis_id" diagnosis_id type="text" required
                              status="{{ isSubmitted && form.controls.diagnosis_id.errors ? 'danger' : isSubmitted ? 'success' : '' }}">
                          <datalist id="diagnostic">
                              <option *ngFor="let item of diagnosis" [value]="item.name">{{ item.code }} -
                                  {{item.name}} </option>
                          </datalist>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="reception_hour" class="form-text text-muted font-weight-bold">Hora de recepción de la llamada y/o caso:</label>
                              <input type="time" nbInput fullWidth id="reception_hour"
                                  formControlName="reception_hour" reception_hour
                                  status="{{ isSubmitted && form.controls.reception_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="presentation_hour" class="form-text text-muted font-weight-bold">Hora de presentación del servicio:</label>
                              <input type="time" nbInput fullWidth id="presentation_hour"
                                  formControlName="presentation_hour" presentation_hour
                                  status="{{ isSubmitted && form.controls.presentation_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="acceptance_hour" class="form-text text-muted font-weight-bold">Hora de aceptación del servicio:</label>
                              <input type="time" nbInput fullWidth id="acceptance_hour"
                                  formControlName="acceptance_hour" acceptance_hour
                                  status="{{ isSubmitted && form.controls.acceptance_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="offer_hour" class="form-text text-muted font-weight-bold">Hora de ofrecida:</label>
                              <input type="time" nbInput fullWidth id="offer_hour"
                                  formControlName="offer_hour" offer_hour
                                  status="{{ isSubmitted && form.controls.offer_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="start_consult_hour" class="form-text text-muted font-weight-bold">Hora inicio de consulta:</label>
                              <input type="time" nbInput fullWidth id="start_consult_hour"
                                  formControlName="start_consult_hour" start_consult_hour
                                  status="{{ isSubmitted && form.controls.start_consult_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="finish_consult_hour" class="form-text text-muted font-weight-bold">Hora fin de consulta:</label>
                              <input type="time" nbInput fullWidth id="finish_consult_hour"
                                  formControlName="finish_consult_hour" finish_consult_hour
                                  status="{{ isSubmitted && form.controls.finish_consult_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="close_date" class="form-text text-muted font-weight-bold">Fecha de
                                  cierre:</label>
                              <input type="date" nbInput fullWidth id="close_date"
                                  formControlName="close_date" close_date
                                  status="{{ isSubmitted && form.controls.close_date.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  [max]="today" />
                          </div>
                      </div>
                      <div class="col-md-3">
                          <div class="form-group">
                              <label for="close_crm_hour" class="form-text text-muted font-weight-bold">Hora de cierre CRM:</label>
                              <input type="time" nbInput fullWidth id="close_crm_hour"
                                  formControlName="close_crm_hour" close_crm_hour
                                  status="{{ isSubmitted && form.controls.close_crm_hour.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                              <label for="copay_value" class="form-text text-muted font-weight-bold">Valor de copago:</label>
                              <input type="number" nbInput fullWidth id="copay_value"
                                  formControlName="copay_value" copay_value
                                  status="{{ isSubmitted && form.controls.copay_value.errors ? 'danger' : isSubmitted ? 'success' : '' }}"
                                  />
                          </div>
                      </div>
                  </div>
                  <div class="div-send">
                      <button type="submit" nbButton status="success">Agregar</button>
                  </div>
              </form>
          </nb-card-body>
      </nb-card>
  </div>
</ng-template>-->
  

  `,
    styleUrls: ['./pad-complementary-list.component.scss'],
})
export class Actions2Component implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object

    public form: FormGroup
    public dialog;
    public diagnosis: any[] = [];
    public profesionals: any[] = [];
    public diagnosis_id;
    public profesional_id;
    public loading: boolean = true;
    public isSubmitted: boolean = false;
    public saved: any = null;
    public monitorings: any[] = [];
    public edit: boolean = false;


    constructor(
        private route: ActivatedRoute,
        private toastService: NbToastrService,
        private formBuilder: FormBuilder,
        private dialogService: NbDialogService,
        private pacMonitoringService: PacMonitoringService,
        private DiagnosisS: DiagnosisService,
        private objetionResponseS: ObjetionResponseService,
        private UserBS: UserBusinessService,

    ) {
    }

    async ngOnInit() {
        if (this.rowData.admissions) {
            if (this.rowData.admissions[this.rowData.admissions.length - 1].discharge_date != "0000-00-00 00:00:00") {
                this.edit = true;
            } else {
                this.edit = false;
            }
        } else if (this.rowData.pac_monitoring) {
            this.edit = true
        } else {
            this.edit = false;
        }

    }

    ConfirmAction(dialog: TemplateRef<any>) {
        this.dialog = this.dialogService.open(dialog);
        this.GetResponseParam()
    }

    GetResponseParam() {

    }
   
}
