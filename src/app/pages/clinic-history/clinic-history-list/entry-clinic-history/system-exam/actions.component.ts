import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../../../business-controller/admissions.service';
import { BedService } from '../../../../../business-controller/bed.service';
import { FlatService } from '../../../../../business-controller/flat.service';
import { PavilionService } from '../../../../../business-controller/pavilion.service';
import { ProgramService } from '../../../../../business-controller/program.service';
import { ScopeOfAttentionService } from '../../../../../business-controller/scope-of-attention.service';
import { AdmissionRouteService } from '../../../../../business-controller/admission-route.service';
import { LocationService } from '../../../../../business-controller/location.service';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';
import { ChSystemExamService } from '../../../../../business-controller/ch_system_exam.service';

@Component({
  template: `
  <div class="d-flex justify-content-center" >
      <button nbTooltip="Editar" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="ConfirmAction(confirmAction)">
        <nb-icon icon="edit-outline"></nb-icon>
      </button>
  </div>

  
<ng-template #confirmAction>
  <div class="container-fluid" fullWidth>
    <nb-card style="width: 100%">
    <nb-card-header>Edición Examen por sistemas: {{this.value.data.type_ch_system_exam.name}}</nb-card-header>
    <nb-card-body>
    <form [formGroup]="form" (ngSubmit)="EditSystem()">
  <div class="row">


  <div class="col-md-12">
    <nb-radio-group formControlName="revision" revision id="revision" class="d-flex text" name="revision"
      status="{{ isSubmitted && form.controls.revision.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}">
      <nb-radio value="CON ALTERACIÓN">CON ALTERACIÓN</nb-radio>
      <nb-radio value="NORMAL">NORMAL</nb-radio>
    </nb-radio-group>
  </div>
  
  <div class="col-md-12">
    <label class="form-text text-muted font-weight-bold text ">OBSERVACIÓN:</label>
    <textarea [disabled]="this.disabled" id="observation"  nbInput fullWidth
      formControlName="observation" observation onpaste="return false" rows="4" cols="50"
      status="{{ isSubmitted && form.controls.observation.errors ? 'danger' : isSubmitted ? 'success' : 'basic' }}"> 
      {{this.value.data.observation}}</textarea>
  </div>
</div>

  <div class="row">
    <div class="col-md-12 mt-3">
      <div class="div-send">
        <button nbButton (click)="closeDialog()" type="button" class="button ml-1">Cancelar</button>
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
export class Actions7Component implements ViewCell {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
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
    private SystemExamS: ChSystemExamService,

  ) {
  }
  ngOnInit() {
    if (!this.data) {
      this.data = {
        revision: '',
        observation: '',
      };
    }

    this.form = this.formBuilder.group({
      revision: [this.value.data.revision, Validators.compose([Validators.required])],
      observation: [this.value.data.observation, Validators.compose([Validators.required])],
      
    });
  }



  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  close() {
    this.dialog.close();
  }
  closeDialog() {
    this.dialog.close();
  }
  RefreshData() {
    this.table.refresh();
  }

  EditSystem() {
    this.isSubmitted = true;
    this.SystemExamS.Update({
      id: this.value.data.id,
      revision: this.form.controls.revision.value,
      observation: this.form.controls.observation.value,
      type_ch_system_exam_id: this.value.data.type_ch_system_exam.id,
      type_record_id: this.value.data.type_record_id,
      ch_record_id: this.value.data.ch_record_id,
    })
      .then((x) => {
        this.toastService.success('', x.message);
        this.closeDialog();
        this.value.refresh();
        this.form.patchValue({
          observation: '',
          revision: ''
        });
        if (this.saved) {
          this.saved();
        }
      })
      .catch((x) => {
        this.isSubmitted = false;
        this.loading = false;
      });
  }


}
