import { Component, Input, TemplateRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { LocationService } from '../../../../business-controller/location.service';
import { ScopeOfAttentionService } from '../../../../business-controller/scope-of-attention.service';
import { ProgramService } from '../../../../business-controller/program.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { FlatService } from '../../../../business-controller/flat.service';
import { AdmissionRouteService } from '../../../../business-controller/admission-route.service';
import { BedService } from '../../../../business-controller/bed.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';

@Component({
  template: `
  <div class="d-flex justify-content-center">
  
    <button nbTooltip="Incapacidad" nbTooltipPlacement="top" nbTooltipStatus="primary" nbButton ghost (click)="viewInability()" >
      <nb-icon icon="file-add"></nb-icon>
    </button>

  </div>
  `,
})
export class ActionsInabilityComponent implements ViewCell {
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
    private inabilityS: ChRecordService,
  ) {
  }
  ngOnInit() {

    // console.log(this.value);
    // console.log(this.rowData);

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

  viewInability() {
    this.inabilityS.ViewInability(this.value.data.id).then(x => {

      //this.loadingDownload = false;
      this.toastService.success('', x.message);
      window.open(x.url, '_blank');

    }).catch(x => {
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
}
