import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { LocationService } from '../../../business-controller/location.service';
import { ScopeOfAttentionService } from '../../../business-controller/scope-of-attention.service';
import { ProgramService } from '../../../business-controller/program.service';
import { PavilionService } from '../../../business-controller/pavilion.service';
import { FlatService } from '../../../business-controller/flat.service';
import { AdmissionRouteService } from '../../../business-controller/admission-route.service';
import { BedService } from '../../../business-controller/bed.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { AuthService } from '../../../services/auth.service';
import { ChFormulationService } from '../../../business-controller/ch-formulation.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
  
    <button nbTooltip="Formula médica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="viewFormulation()" >
      <nb-icon icon="file-add"></nb-icon>
    </button>
    <button nbTooltip="Eliminar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="value.delete(value.data)">
        <nb-icon icon="trash-2-outline"></nb-icon>
    </button>
    <button *ngIf="this.value.data.product_generic || this.value.data.product_supplies" nbTooltip="Duplicar Formulación" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="showFormulations(formulations)">
        <nb-icon icon="copy-outline"></nb-icon>
    </button>

  </div>

  <ng-template #formulations>
    <form [formGroup]="form" (ngSubmit)="duplicate()">
      <nb-card style="width: 100%; max;height: 300px;overflow: auto;">
        <nb-card-header>DUPLICAR FORMULACIÓN DE {{this.value.data.product_generic ?
          this.value.data.product_generic.description :
          this.value.data.product_supplies.description }}</nb-card-header>
        <nb-card-body>
          <div class="col-md-12">

            <label for="send_formulation" class="form-text text-muted font-weight-bold">ENVIAR SOLICITUD A
              FARMACIA</label>
            <nb-toggle formControlName="send_formulation" is_disability>
            </nb-toggle>

          </div>

        </nb-card-body>

        <nb-card-footer class="d-flex justify-content-end">
          <button nbButton (click)="closeDialog()" type="button">Cerrar</button>
          <button nbButton status="danger" class="ml-1" disabled="{{ loading }}">Guardar</button>
        </nb-card-footer>
      </nb-card>
    </form>
  </ng-template>
  `,
})
export class ActionsFormulationComponent implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  
  public dialog;
  public status: boolean;
  public medical: boolean;
  loading: boolean = false;
  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public coverage: any[];
  public admission_route: any[];
  public scope_of_attention: any[];
  public program: any[];
  public pavilion: any[];
  public flat: any[];
  public bed: any[];
  public campus_id;
  public ambit;
  public data;
  public service;
  public role_user;


  constructor(
    private ChFormulationS: ChFormulationService,
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private AdmissionsS: AdmissionsService,
    private LocationS: LocationService,
    private ScopeOfAttentionS: ScopeOfAttentionService,
    private ProgramS: ProgramService,
    private PavilionS: PavilionService,
    private FlatS: FlatService,
    private AdmissionRouteS: AdmissionRouteService,
    private BedS: BedService,
    private viewFormulationS: ChRecordService,
  ) {
  }
  ngOnInit() {

    this.form = this.formBuilder.group({
      send_formulation: [false, Validators.compose([Validators.required])],
    });
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  close() {
    this.dialog.close();
  }

  DeleteAction() {
    if (this.value.data.medical_date == '0000-00-00 00:00:00') {
      this.toastService.success('', 'Debe tener una salida asistencial');
    } else
      if (this.value.data.id) {
        this.loading = true;

        this.AdmissionsS.Update({
          id: this.value.data.id,
          medical_date: true,
          bed_id: this.value.data.location[this.value.data.location.length - 1].bed_id
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          this.value.refresh();
        }).catch(x => {
          this.loading = false;
        });
      }
  }
  DeleteAction2() {
    if (this.value.data.discharge_date == '0000-00-00 00:00:00') {
      if (this.value.data.id) {
        this.loading = true;
        this.AdmissionsS.Update({
          id: this.value.data.id,
          reversion: true,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          this.value.refresh();
        }).catch(x => {
          this.loading = false;
        });
      }

    } else
      this.toastService.success('', 'Debe tener una salida asistencial');
  }

  viewFormulation() {
    this.viewFormulationS.ViewFormulation(this.value.data.id).then(x => {

      //this.loadingDownload = false;
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  showFormulations(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  closeDialog() {
    this.dialog.close();
  }

  duplicate() {

    this.loading = true;

    this.ChFormulationS.Save({
      required: this.value.data.required,
      administration_route_id: this.value.data.administration_route_id,
      dose: this.value.data.dose,
      hourly_frequency_id: this.value.data.hourly_frequency_id,
      medical_formula: this.value.data.medical_formula,
      number_mipres: this.value.data.number_mipres,
      observation: this.value.data.observation,
      outpatient_formulation: this.value.data.outpatient_formulation,
      product_generic_id: this.value.data.product_generic_id,
      treatment_days: this.value.data.treatment_days,
      type_record_id: 5,
      ch_record_id: this.value.data.ch_record_id,
      services_briefcase_id: this.value.data.services_briefcase_id,
      product_supplies_id: this.value.data.product_supplies_id,
      num_supplies: this.value.data.num_supplies,
      pharmacy_product_request_id: this.form.controls.send_formulation.value == false ? this.value.data.pharmacy_product_request_id : false,
    })
      .then((x) => {
        this.loading = false;
        this.toastService.success('', x.message);
        this.closeDialog();
        if (this.value.refresh) {
          this.value.refresh();
        }
      })
      .catch((x) => {
        this.loading = false;
        this.toastService.danger('', x);
      });
  }
}
