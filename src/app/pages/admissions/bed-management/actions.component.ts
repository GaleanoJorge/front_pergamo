import { Component, Input,TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { BedService } from '../../../business-controller/bed.service';
import {PavilionService} from '../../../business-controller/pavilion.service';
import {FlatService} from '../../../business-controller/flat.service';
import {LocationService} from '../../../business-controller/location.service';



@Component({
  template: `
    <div class="d-flex justify-content-center">
      <a *ngIf="state" nbTooltip="Estado" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(templateRef)">
        <nb-icon icon="more-vertical-outline"></nb-icon>
      </a>
      <button *ngIf="traslate" nbTooltip="Traslado" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(templateRef2)">
        <nb-icon icon="corner-down-left-outline"></nb-icon>
      </button>
    </div>
    <ng-template #templateRef>
<form [formGroup]="form" (ngSubmit)="save()">
  <nb-card size="small" style="max-width: 500px;height: auto;">
    <nb-card-header>Cambio de estado</nb-card-header>
    <nb-card-body>
      <div class="row">
        <div class="col-md-12">
          <label for="status_bed_id" class="form-text text-muted font-weight-bold">Estados:</label>
          <nb-select [selected]="this.data.status_bed_id" formControlName="status_bed_id" id="status_bed_id" fullWidth
          status="{{ isSubmitted && form.controls.status_bed_id.errors ? 'danger' : isSubmitted ? 'success' : '' }}">
          <nb-option value="">Seleccione...</nb-option>
            <nb-option value="1">
            Libre</nb-option>
          <nb-option  value="3">
            En mantenimiento</nb-option>
          <nb-option  value="4">
            En desinfección</nb-option>
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
<ng-template #templateRef2>
<form [formGroup]="form2" (ngSubmit)="save2()">
  <nb-card size="small" style="max-width: 500px;height: auto;">
    <nb-card-header>Traslado de cama</nb-card-header>
    <nb-card-body>
      <div class="row">
      <div class="col-md-12">
      <label for="flat" class="form-text text-muted font-weight-bold">Piso:</label>
      <nb-select [selected]="this.data.flat_id" formControlName="flat_id" id="flat_id" fullWidth
      status="{{ isSubmitted && form2.controls.flat_id.errors ? 'danger' : isSubmitted ? 'success' : '' }}">
      <nb-option value="">Seleccione...</nb-option>
      <nb-option selected="{{ item.id == this.data.flat_id }}" *ngFor="let item of flat" [value]="item.id">
        {{ item.name }}</nb-option>
    </nb-select>
    </div>
    <div class="col-md-12">
      <label for="pavilion" class="form-text text-muted font-weight-bold">Pabellón:</label>
      <nb-select [selected]="this.data.pavilion_id" formControlName="pavilion_id" id="pavilion_id" fullWidth
      status="{{ isSubmitted && form2.controls.pavilion_id.errors ? 'danger' : isSubmitted ? 'success' : '' }}">
      <nb-option value="">Seleccione...</nb-option>
      <nb-option selected="{{ item.id == this.data.pavilion_id }}" *ngFor="let item of pavilion" [value]="item.id">
        {{ item.name }}</nb-option>
    </nb-select>
    </div>
    <div class="col-md-12">
      <label for="bed" class="form-text text-muted font-weight-bold">Cama:</label>
      <nb-select [selected]="this.data.bed_id" formControlName="bed_id" id="bed_id" fullWidth
      status="{{ isSubmitted && form2.controls.bed_id.errors ? 'danger' : isSubmitted ? 'success' : '' }}">
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
export class Actions3Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  public state;
  public traslate;
  loading: boolean = false;
  public form: FormGroup;
  public form2: FormGroup;
  public saved: any = null;
  public dialog;
  public isSubmitted: boolean = false;
  public data;
  public data2;
  public campus_id;
  public flat:any[];
  public pavilion:any[];
  public bed:any[];

  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private AdmissionsS: AdmissionsService,
    private BedS: BedService,
    private PavilionS: PavilionService,
    private FlatS: FlatService,
    private LocationS: LocationService,
  ) {
  }
  ngOnInit(){

    if(this.value.data.status_bed_id==1 || this.value.data.status_bed_id==3 || this.value.data.status_bed_id==4 ){
      this.state=true;
      this.traslate=false;
    }else{
      this.state=false;
      this.traslate=true;
    }

    if (!this.data) {
      this.data = {
        status_bed_id: '',
      };
    }
    if (!this.data2) {
      this.data2 = {
        flat_id: '',
        bed_id: '',
        pavilion_id: '',
      };
    }

    this.form = this.formBuilder.group({      
      status_bed_id: [ Validators.compose([Validators.required])],
    });

    this.form2 = this.formBuilder.group({      
      flat_id: [ Validators.compose([Validators.required])],
      pavilion_id: [ Validators.compose([Validators.required])],
      bed_id: [ Validators.compose([Validators.required])],
    });

    this.campus_id = localStorage.getItem('campus');
    this.FlatS.GetFlatByCampus(this.campus_id).then(x => {
      this.flat = x;
    });

    this.onChanges();
  }


  onChanges() {
    this.form2.get('flat_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
        this.pavilion = [];
      } else {
        this.GetPavilion(val).then();
      }
      this.form2.patchValue({
        pavilion_id: '',
      });
    });

    this.form2.get('pavilion_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.bed = [];
      } else {
        this.GetBed(val,1).then();
      }
      this.form2.patchValue({
        bed_id: '',
      });
    });
  }

  GetPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);

    return this.PavilionS.GetPavilionByFlat(flat_id).then(x => {

        this.pavilion = x;

      return Promise.resolve(true);
    });
  }

  GetBed(pavilion_id, ambit) {
    if (!pavilion_id || pavilion_id === '') return Promise.resolve(false);
    return this.BedS.GetBedByPavilion(pavilion_id,ambit).then(x => {
        this.bed = x;

      return Promise.resolve(true);
    });
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  close() {
    this.dialog.close();
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.value.data.id) {
        this.BedS.Update({
          id: this.value.data.id,
          status_bed_id: this.form.controls.status_bed_id.value,
          update:true
        }).then(x => {
          this.toastService.success('', x.message);
          this.value.refresh();
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

  save2() {
    var location=this.value.data.location[this.value.data.location.length - 1];
    this.isSubmitted = true;
    if (!this.form2.invalid) {
      this.loading = true;

      if (location.admissions_id) {
        this.LocationS.ChangeService({
          id:location.admissions_id,
          admissions_id: location.admissions_id,
          admission_route_id: location.admission_route_id,
          scope_of_attention_id: location.scope_of_attention_id,
          program_id: location.program_id,
          flat_id: this.form2.controls.flat_id.value,
          pavilion_id: this.form2.controls.pavilion_id.value,
          bed_id: this.form2.controls.bed_id.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.value.refresh();
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
}
