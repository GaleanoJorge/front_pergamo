import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { BedService } from '../../../../business-controller/bed.service';
import { FlatService } from '../../../../business-controller/flat.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { ProgramService } from '../../../../business-controller/program.service';
import { ScopeOfAttentionService } from '../../../../business-controller/scope-of-attention.service';
import { AdmissionRouteService } from '../../../../business-controller/admission-route.service';
import { LocationService } from '../../../../business-controller/location.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
    <a *ngIf="status" nbTooltip="Estado" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(templateRef)">
        <nb-icon icon="clock-outline"></nb-icon>
    </a>
    <button *ngIf="medical" nbTooltip="Medico" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(templateRef2)">
        <nb-icon icon="log-out-outline"></nb-icon>
    </button>
    <button nbTooltip="Agregar o modificar acompañantes" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/admissions/patient-data/' + value.data.id" >
      <nb-icon icon="person-add-outline"></nb-icon>
    </button>
    <button nbButton ghost [nbPopover]="templateRef" nbPopoverTrigger="hover">
        <nb-icon icon="info-outline"></nb-icon>
    </button>
  </div>
  <ng-template #templateRef>
    <nb-card size="tiny">
      <nb-card-header>
          <span class="h5">Salida de Paciente</span>
      </nb-card-header>
      <nb-card-body>
      Desea dar salida al paciente.
      </nb-card-body>

      <nb-card-footer class="d-flex justify-content-end">
          <button nbButton ghost type="button" (click)="close()">Cancelar</button>
          <button nbButton status="danger" class="ml-1" type="button" (click)="DeleteAction()" [disabled]="loading">Confirmar</button>
      </nb-card-footer>
    </nb-card>
  </ng-template>
  <ng-template #templateRef2>
  <nb-card size="tiny">
    <nb-card-header>
        <span class="h5">Reversión de salida</span>
    </nb-card-header>
    <nb-card-body>
        Esta seguro que desea revertir la salida?
    </nb-card-body>

    <nb-card-footer class="d-flex justify-content-end">
        <button nbButton ghost type="button" (click)="close()">Cancelar</button>
        <button nbButton status="danger" class="ml-1" type="button" (click)="DeleteAction2()" [disabled]="loading">Confirmar</button>
    </nb-card-footer>
  </nb-card>
</ng-template>
<ng-template #templateRef3>
<form [formGroup]="form" (ngSubmit)="save()">
  <nb-card size="small" style="max-width: 500px;height: auto;">
    <nb-card-header>{{ title }}</nb-card-header>
    <nb-card-body>
      <div class="row">
        <div class="col-md-12">
          <label for="admission_route" class="form-text text-muted font-weight-bold">Ruta de admisión:</label>
          <nb-select [selected]="this.data.admission_route_id" formControlName="admission_route_id" id="admission_route_id" fullWidth
          status="{{ isSubmitted && form.controls.admission_route_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
          <nb-option value="">Seleccione...</nb-option>
          <nb-option selected="{{ item.id == this.data.admission_route_id }}" *ngFor="let item of admission_route" [value]="item.id">
            {{ item.name }}</nb-option>
        </nb-select>
        </div>
        <div class="col-md-12">
          <label for="scope_of_attention" class="form-text text-muted font-weight-bold">Ambito de atención:</label>
          <nb-select [selected]="this.data.scope_of_attention_id" formControlName="scope_of_attention_id" id="scope_of_attention_id" fullWidth
          status="{{ isSubmitted && form.controls.scope_of_attention_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
          <nb-option value="">Seleccione...</nb-option>
          <nb-option selected="{{ item.id == this.data.scope_of_attention_id }}" *ngFor="let item of scope_of_attention" [value]="item.id">
            {{ item.name }}</nb-option>
        </nb-select>
        </div>
        <div class="col-md-12">
          <label for="program" class="form-text text-muted font-weight-bold">Programa:</label>
          <nb-select [selected]="this.data.program_id" formControlName="program_id" id="program_id" fullWidth
          status="{{ isSubmitted && form.controls.program_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
          <nb-option value="">Seleccione...</nb-option>
          <nb-option selected="{{ item.id == this.data.program_id }}" *ngFor="let item of program" [value]="item.id">
            {{ item.name }}</nb-option>
        </nb-select>
        </div>
        <div class="col-md-12">
          <label for="flat" class="form-text text-muted font-weight-bold">Piso:</label>
          <nb-select [selected]="this.data.flat_id" formControlName="flat_id" id="flat_id" fullWidth
          status="{{ isSubmitted && form.controls.flat_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
          <nb-option value="">Seleccione...</nb-option>
          <nb-option selected="{{ item.id == this.data.flat_id }}" *ngFor="let item of flat" [value]="item.id">
            {{ item.name }}</nb-option>
        </nb-select>
        </div>
        <div class="col-md-12">
          <label for="pavilion" class="form-text text-muted font-weight-bold">Pabellón:</label>
          <nb-select [selected]="this.data.pavilion_id" formControlName="pavilion_id" id="pavilion_id" fullWidth
          status="{{ isSubmitted && form.controls.pavilion_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
          <nb-option value="">Seleccione...</nb-option>
          <nb-option selected="{{ item.id == this.data.pavilion_id }}" *ngFor="let item of pavilion" [value]="item.id">
            {{ item.name }}</nb-option>
        </nb-select>
        </div>
        <div class="col-md-12">
          <label for="bed" class="form-text text-muted font-weight-bold">Cama / Consultorio:</label>
          <nb-select [selected]="this.data.bed_id" formControlName="bed_id" id="bed_id" fullWidth
          status="{{ isSubmitted && form.controls.bed_id.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
          <nb-option value="">Seleccione...</nb-option>
          <nb-option selected="{{ item.id == this.data.bed_id }}" *ngFor="let item of bed" [value]="item.id">
            {{ item.name }}</nb-option>
        </nb-select>
        </div>
    </div>
    </nb-card-body>
    <nb-card-footer class="d-flex justify-content-end">
      <button nbButton (click)="close()" type="button">Cancelar</button>
      <button nbButton status="danger" class="ml-1" disabled="{{ loading }}">Guardar</button>
    </nb-card-footer>
  </nb-card>
</form>
</ng-template>
  `,
})
export class Actions9Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  public dialog;
  public status: boolean;
  public medical: boolean;
  loading: boolean = false;
  @Input() rowData: any;  // This holds the entire row object
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

  @Input() title: string;


  constructor(
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
  ) {
  }
  ngOnInit() {
    if (this.value.data.medical_date == '0000-00-00 00:00:00' && this.value.data.discharge_date == '0000-00-00 00:00:00') {
      this.medical = false;
      this.status = false;
      this.service = true
      console.log(this.rowData.id);
    } else if (this.value.data.medical_date != '0000-00-00 00:00:00' && this.value.data.discharge_date == '0000-00-00 00:00:00') {
      this.status = true;
      this.medical = true;
    } else if (this.value.data.medical_date != '0000-00-00 00:00:00' && this.value.data.discharge_date != '0000-00-00 00:00:00') {
      this.medical = false;
      this.status = false;
      this.service = false;
    }

    if (!this.data) {
      this.data = {
        admission_route_id: '',
        scope_of_attention_id: '',
        program_id: '',
        flat_id: '',
        pavilion_id: '',
        bed_id: '',
      };
    }

    this.campus_id = localStorage.getItem('campus');
    this.AdmissionRouteS.GetCollection().then(x => {
      this.admission_route = x;
    });
    this.FlatS.GetFlatByCampus(this.campus_id, {
      bed_or_office: 1,
    }).then(x => {
      this.flat = x;
    });


    this.form = this.formBuilder.group({
      admission_route_id: [this.data.admission_route_id, Validators.compose([Validators.required])],
      scope_of_attention_id: [this.data.scope_of_attention_id, Validators.compose([Validators.required])],
      program_id: [this.data.program_id, Validators.compose([Validators.required])],
      flat_id: [this.data.flat_id, Validators.compose([Validators.required])],
      pavilion_id: [this.data.pavilion_id, Validators.compose([Validators.required])],
      bed_id: [this.data.bed_id, Validators.compose([Validators.required])],
    });

    this.onChanges();
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

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.value.data.id) {
        this.LocationS.ChangeService({
          id: this.value.data.id,
          admissions_id: this.value.data.id,
          admission_route_id: this.form.controls.admission_route_id.value,
          scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
          program_id: this.form.controls.program_id.value,
          flat_id: this.form.controls.flat_id.value,
          pavilion_id: this.form.controls.pavilion_id.value,
          bed_id: this.form.controls.bed_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }
  }

  onChanges() {
    this.form.get('admission_route_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.scope_of_attention = [];
      } else {
        this.GetScope(val).then();
      }
      this.form.patchValue({
        scope_of_attention_id: '',
      });
    });

    this.form.get('scope_of_attention_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.program = [];
      } else {
        this.ambit = val;
        this.GetProgram(val).then();
      }
      this.form.patchValue({
        program_id: '',
      });
    });

    this.form.get('flat_id').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.pavilion = [];
      } else {
        this.GetPavilion(val).then();
      }
      this.form.patchValue({
        pavilion_id: '',
      });
    });

    this.form.get('pavilion_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.bed = [];
      } else {
        this.GetBed(val, this.ambit).then();
      }
      this.form.patchValue({
        bed_id: '',
      });
    });
  }

  GetScope(admission_route_id, job = false) {
    if (!admission_route_id || admission_route_id === '') return Promise.resolve(false);

    return this.ScopeOfAttentionS.GetScopeByAdmission(admission_route_id).then(x => {

      this.scope_of_attention = x;

      return Promise.resolve(true);
    });
  }

  GetProgram(scope_of_attention_id, job = false) {
    if (!scope_of_attention_id || scope_of_attention_id === '') return Promise.resolve(false);
    return this.ProgramS.GetProgramByScope(scope_of_attention_id).then(x => {
      this.program = x;

      return Promise.resolve(true);
    });
  }

  GetPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);

    return this.PavilionS.GetPavilionByFlat(flat_id, {
      bed_or_office: 1,
    }).then(x => {

      this.pavilion = x;

      return Promise.resolve(true);
    });
  }

  GetBed(pavilion_id, ambit) {
    if (!pavilion_id || pavilion_id === '') return Promise.resolve(false);
    return this.BedS.GetBedByPavilion(pavilion_id, ambit).then(x => {
      this.bed = x;

      return Promise.resolve(true);
    });
  }
}

