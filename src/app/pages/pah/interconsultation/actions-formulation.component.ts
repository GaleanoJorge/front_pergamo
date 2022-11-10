import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlossResponseService } from '../../../business-controller/gloss-response.service';
import { ObjetionCodeResponseService } from '../../../business-controller/objetion-code-response.service';
import { ObjetionResponseService } from '../../../business-controller/objetion-response.service';
import { CurrencyPipe } from '@angular/common';
import { GlossRadicationService } from '../../../business-controller/gloss-radication.service';
import { GlossService } from '../../../business-controller/gloss.service';
import { date } from '@rxweb/reactive-form-validators';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { timeStamp } from 'console';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { ManagementPlanService } from '../../../business-controller/management-plan.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <button *ngIf="!this.value.data.management_plan_id && (this.value.data.pharmacy_product_request.status != 'PATIENT')" nbTooltip="Programar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost
      (click)="showProgramming(programming)">
      <nb-icon icon="calendar-outline"></nb-icon>
    </button>

    <div nbTooltip="{{this.tooltip}}" nbTooltipStatus="primary" class = "cuadro" 
        [style]="this.semaphore == 0 ? 'background-color: #FF0000;' : 
        this.semaphore == 1 ? 'background-color: #FFFF00;' : 
        this.semaphore == 3 ? 'background-color: #FF7000;' : 
        'background-color: #28B463' "
        >
    </div>
  </div>

  <ng-template #programming>
    <form [formGroup]="form" (ngSubmit)="save()">
      <nb-card size="medium" style="max-width: 600px">
          <nb-card-header>PROGRAMACIÓN</nb-card-header>
          <nb-card-body>
              <div class="row">
                  <div class="col-md-12">
                      <label for="start_date" class="form-text text-muted font-weight-bold">Fecha de inicio:</label>
                      <input type="date" nbInput fullWidth id="start_date" formControlName="start_date" start_date
                          status="{{ isSubmitted && form.controls.start_date.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}" />
                  </div>

                  <div class="col-md-12">
                      <label for="start_hours" class="form-text text-muted font-weight-bold">Hora de inicio:</label>
      
                      <div class="row">
                          <div class="col-md-4">
                              <nb-select [selected]="militat_hour_id" id="militat_hour_id" fullWidth
                                  (selectedChange)="ChangeHour($event, 1)"
                                  status="{{ isSubmitted && form.controls.start_hours.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
                                  <nb-option value="">Seleccione...</nb-option>
                                  <nb-option selected="{{ item.id == this.militat_hour_id }}"
                                      *ngFor="let item of militat_hour" [value]="item.id">
                                      {{ item.name }}</nb-option>
                              </nb-select>
                          </div>
                          :
                          <div class="col-md-4">
                              <nb-select [selected]="militat_minut_id" id="militat_minut_id" fullWidth
                                  (selectedChange)="ChangeHour($event, 2)"
                                  status="{{ isSubmitted && form.controls.start_hours.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
                                  <nb-option value="">Seleccione...</nb-option>
                                  <nb-option selected="{{ item.id == this.militat_minut_id }}"
                                      *ngFor="let item of militat_minut" [value]="item.id">
                                      {{ item.name }}</nb-option>
                              </nb-select>
                          </div>
                      </div>
                  </div>
              </div>
          </nb-card-body>

          <nb-card-footer class="d-flex justify-content-end">
            <button nbButton status="success" disabled="{{ loading }}" (click)="save()" type="button">GUARDAR</button>
            <button nbButton disabled="{{ loading }}" (click)="closeDialog()" type="button">Cerrar</button>
          </nb-card-footer>
      </nb-card>
    </form>
  </ng-template>
  `,
  styleUrls: ['./interconsultation.component.scss'],
})
export class ActionsFormulationComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  @ViewChild('programming', { read: TemplateRef }) programming: TemplateRef<HTMLElement>;

  public form: FormGroup;
  public dialog;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public militat_hour: Array<any> = [];
  public militat_minut: Array<any> = [];
  public militat_hour_id: string = '00';
  public militat_minut_id: string = '00';
  public semaphore: any;
  public tooltip: any;

  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private managementPlanS: ManagementPlanService,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit() {
    if (this.value.data.management_plan_id) {
      this.semaphore = 2;
      this.tooltip = 'AGENDADO';
    } else if (this.value.data.pharmacy_product_request.many_pharmacy_request_shipping.length == 0) {
      this.semaphore = 0;
      this.tooltip = 'SIN DESPACHO';
    } else {
      var a = 0;
      this.value.data.pharmacy_product_request.many_pharmacy_request_shipping.forEach(x => {
        a += x.amount;
      });
      if (a < this.value.data.outpatient_formulation) {
        this.semaphore = 1;
        this.tooltip = 'DESPACHO PARCIAL';
      } else {
        this.semaphore = 3;
        this.tooltip = 'SIN AGENDAR';
      }
    }
    for (var i = 0; i < 24; i++) {
      var n = i < 10 ? '0' + i : i + '';
      this.militat_hour.push({
        id: n,
        name: n,
      });
    }

    for (var i = 0; i < 60; i++) {
      var n = i < 10 ? '0' + i : i + '';
      this.militat_minut.push({
        id: n,
        name: n,
      });
    }

    this.form = this.formBuilder.group({
      start_date: ['', Validators.compose([Validators.required])],
      start_hours: ['00:00', Validators.compose([Validators.required])],

    });
  }


  ChangeHour($event, id) {
    if (id == 1) {
      this.militat_hour_id = $event;
    } else if (id == 2) {
      this.militat_minut_id = $event;
    }
    this.form.patchValue({ start_hours: this.militat_hour_id + ":" + this.militat_minut_id });
  }

  showProgramming(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  closeDialog() {
    this.dialog.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.managementPlanS.Save({
        isnewrequest: 0,//
        ch_formulation_id: this.value.data.id,//
        hospital: true,//
        type_of_attention_id: 17,//
        frequency_id: null,
        quantity: this.value.data.hourly_frequency.value,
        hours: null,
        specialty_id: null,
        assigned_user_id: null,
        admissions_id: this.value.admissions_id,
        procedure_id: null,
        laboratories: null,
        assistance_id: null,
        locality_id: null,
        phone_consult: false,
        start_date: this.form.controls.start_date.value,
        finish_date: null,
        medical: false,
        product_id: this.value.data.services_briefcase_id,//
        preparation: '',
        route_of_administration: this.value.data.administration_route.name,
        blend: '',
        administration_time: '',
        start_hours: this.form.controls.start_hours.value,
        observation: this.value.data.observation,
        number_doses: this.value.data.outpatient_formulation,
        dosage_administer: this.value.data.dose,

      }).then(x => {
        this.toastService.success('', x.message);
        if (x['message_error']) {
          this.toastService.warning(x['message_error'], 'Error');
        }
        if (this.value.refresh) {
          this.value.refresh();
        }
        this.closeDialog();
      }).catch(x => {
        this.isSubmitted = false;
        this.loading = false;
      });
    }
  }
}
