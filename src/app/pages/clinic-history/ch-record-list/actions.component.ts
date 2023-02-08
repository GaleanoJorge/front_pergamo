import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { BedService } from '../../../business-controller/bed.service';
import { FlatService } from '../../../business-controller/flat.service';
import { PavilionService } from '../../../business-controller/pavilion.service';
import { ProgramService } from '../../../business-controller/program.service';
import { ScopeOfAttentionService } from '../../../business-controller/scope-of-attention.service';
import { AdmissionRouteService } from '../../../business-controller/admission-route.service';
import { LocationService } from '../../../business-controller/location.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { AuthService } from '../../../services/auth.service';
import { DisclaimerService } from '../../../business-controller/disclaimer.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">

    <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && 
      (this.rowData.ch_type_id == 1)" 
      nbTooltip="Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" 
      nbButton ghost [routerLink]="'/pages/clinic-history/clinic-history-list/' + value.data.id + '/'+ value.assigned" >
      <nb-icon icon="file-add-outline"></nb-icon>
    </button>

    <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && 
      (this.rowData.ch_type_id == 2)"
      nbTooltip="Historia Clinica de enfermeria" nbTooltipPlacement="top" nbTooltipStatus="primary" 
      nbButton ghost [routerLink]="'/pages/clinic-history/clinic-history-nursing-list/' + value.data.id + '/'+ value.assigned" >
      <nb-icon icon="file-add-outline"></nb-icon>
    </button>

    <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 6)" nbTooltip="Historia Clinica Terapia Ocupacional" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/entry-clinic-history-occupational-therapy/' + value.data.id + '/'+ value.assigned" >
      <nb-icon icon="file-add-outline"></nb-icon>
    </button>

    <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && 
    (this.rowData.ch_type_id == 3)" nbTooltip="Historia Clinica de Nutrición" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-nutrition-list/' + value.data.id + '/'+ value.assigned" >
      <nb-icon icon="file-add-outline"></nb-icon>
    </button>

    <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 4)" nbTooltip="Historia Clinica de Terapia de Lenguaje" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/clinic-history-language-list/' + value.data.id + '/'+ value.assigned" >
      <nb-icon icon="file-add-outline"></nb-icon>
    </button>

    <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 5)" nbTooltip="Historia Clinica de Terapia de Respiratoria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/respiratory-therapy-list/' + value.data.id + '/'+ value.assigned" >
    <nb-icon icon="file-add-outline"></nb-icon>
  </button>

  <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 7)" nbTooltip="Historia Clinica de Terapia Física" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/clinic-history-physical-therapy-list/' + value.data.id + '/'+ value.assigned" >    <nb-icon icon="file-add-outline"></nb-icon>
  </button>

  <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 8)" nbTooltip="Historia Clinica de Trabajo Social" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-social-work/social-work-list/' + value.data.id + '/'+ value.assigned" >
    <nb-icon icon="file-add-outline"></nb-icon>
  </button>

  <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 9)" nbTooltip="Historia Clinica de Psicologia" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/ch-psychology/psychology-list/' + value.data.id + '/'+ value.assigned" >
    <nb-icon icon="file-add-outline"></nb-icon>
  </button>

  <button *ngIf="value.data.status=='ACTIVO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id == 10)" nbTooltip="Seguimiento" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/tracing-list/tracing-list/' + value.data.id + '/'+ value.assigned" >
    <nb-icon icon="file-add-outline"></nb-icon>
  </button>

    <button *ngIf="value.data.status=='CERRADO'" nbTooltip="Ver Registro Historia Clinica" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="viewHC()" >
      <nb-icon icon="file-add"></nb-icon>
    </button>

    <button *ngIf="value.data.status=='CERRADO' && value.data.user_id == this.own_user.id && (this.rowData.ch_type_id != 10)" nbTooltip="Generar Nota aclaratoria" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(confirmAction)"> 
      <nb-icon icon="attach-outline"></nb-icon>
    </button>

    <button nbTooltip="Documentos adjuntos" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost [routerLink]="'/pages/clinic-history/informed-consents/' + value.data.id"> 
      <nb-icon icon="archive-outline"></nb-icon>
    </button>
  </div>

  <ng-template #confirmAction>
  <div class="container-fluid" fullWidth>
  <nb-card style="width: 100%">
          <nb-card-header>Nota Aclaratoria</nb-card-header>
          <nb-card-body>
              <form [formGroup]="forms" (ngSubmit)="saveNote()">
              <div class="row">


  <div class="row justify-content-md-center">
    <div class="col-md-8 col-lg-8">
      <div class="form-group">      
       <textarea id="observation" nbInput fullWidth formControlName="observation" observation
         onpaste="return false" cols="100" rows="10"> </textarea>
     </div>
    </div>
  </div>
</div>


  <div class="row">
    <div class="col-md-12">
      <div class="div-send">
        <button nbButton (click)="close()" type="button" class="button ml-1">Cancelar</button>
        <button nbButton status="danger" class="button" [disabled]="disabled" type="submit">GUARDAR</button>
      </div>
    </div>
  </div>

</form>
</nb-card-body>
</nb-card>
</div>
</ng-template>
  
  `,
})
export class Actions5Component implements ViewCell {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  public dialog;
  public status: boolean;
  public medical: boolean;
  loading: boolean = false;
  public form: FormGroup;
  public forms: FormGroup;
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
  public own_user;
  tracingS: any;



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
    private viewHCS: ChRecordService,
    private authService: AuthService,
    private disclaimerS: DisclaimerService,
  ) {
  }
  ngOnInit() {

    // console.log(this.value);
    // console.log(this.rowData);
    this.own_user = this.authService.GetUser();
    console.log(this.value.data.status);
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

      this.forms = this.formBuilder.group({

        observation: ['', Validators.compose([Validators.required])]

      });
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

  viewHC() {
    this.viewHCS.ViewHC(this.value.data.id).then(x => {

      //this.loadingDownload = false;
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
      this.toastService.warning('', x);
      this.isSubmitted = false;
      this.loading = false;
    });
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

  saveNote() {
    this.isSubmitted = true;
    if (!this.forms.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.disclaimerS.Update({
          id: this.data.id,
          observation: this.forms.controls.observation.value,
          ch_record_id: this.value.data.id,
          // ch_record_id: this.record_id,
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
      } else {
        this.disclaimerS.Save({
          observation: this.forms.controls.observation.value,
          ch_record_id: this.value.data.id,
          // ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          this.forms.patchValue({
            observation: '',
          });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
    else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }
}
