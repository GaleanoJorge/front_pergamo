import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { MedicalDiaryService } from '../../../../business-controller/medical-diary.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { DaysService } from '../../../../business-controller/days.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { json } from '@rxweb/reactive-form-validators';
import { BedService } from '../../../../business-controller/bed.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProcedureService } from '../../../../business-controller/procedure.service';

@Component({
  selector: 'ngx-form-medical-diary',
  templateUrl: './form-medical-diary.component.html',
  styleUrls: ['./form-medical-diary.component.scss'],
})
export class FormMedicalDiaryComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() assistance_id: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public coverage: any[];
  public status_bed: any[];
  public days: any[] = [];
  public assistance_user: any[] = [];
  public offices: any[] = [];
  public procedure: any[] = [];
  public procedure_id: any = null;
  public filteredControlOptions$: Observable<string[]>;
  public inputFormControl: FormControl;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private PavilionS: PavilionService,
    private MedicalDiaryS: MedicalDiaryService,
    private toastService: NbToastrService,
    private DaysS: DaysService,
    private userBS: UserBusinessService,
    private bedS: BedService,
    private AuthS: AuthService,
    private procedureS: ProcedureService
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        days_id: [],
        office_id: '',
        procedure_id: '',
        start_date: '',
        finish_date: '',
        start_time: '',
        finish_time: '',
        interval: '',
        telemedicine: null,
        patients: null,
        patient_quantity: ''
      };
    }

    this.form = this.formBuilder.group({
      office_id: [this.data.office_id],
      days_id: [[this.data.days_id]],
      procedure_id: [[this.data.procedure_id]],
      start_date: [
        this.data.start_date,
        Validators.compose([Validators.required]),
      ],
      finish_date: [
        this.data.finish_date,
        Validators.compose([Validators.required]),
      ],
      start_time: [
        this.data.start_time,
        Validators.compose([Validators.required]),
      ],
      finish_time: [
        this.data.finish_time,
        Validators.compose([Validators.required]),
      ],
      interval: [
        this.data.finish_time,
        Validators.compose([Validators.required]),
      ],
      telemedicine: [this.data.telemedicine],
      patients: [this.data.patient_quantity != null ? true : null],
      patient_quantity: [this.data.patient_quantity],
    });

    this.DaysS.GetCollection().then((x) => {
      this.days = x;
    });

    this.bedS
      .GetOfficeBycampus({
        status_bed_id: 1,
        campus_id: +localStorage.getItem('campus'),
      })
      .then((x) => {
        this.offices = x;
      });

    this.procedureS.GetCollection({ assistance_id: this.assistance_id }).then((x) => {
        this.procedure = x;
        this.filteredControlOptions$ = of(this.procedure);
        this.onChanges();
      });

    this.inputFormControl = new FormControl();
  }

  private filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.procedure.filter(optionValue =>
      optionValue.code.includes(filterValue) || optionValue.equivalent.includes(filterValue) || optionValue.name.includes(filterValue)
    );
  }

  onChanges() {
    this.filteredControlOptions$ = this.inputFormControl.valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filter(filterString))
    );
  }

  onSelectionChange($event) {
    // console.log($event)
    var localidentify = this.procedure.find(item => item.name == $event);

    if (localidentify) {
      this.procedure_id = localidentify.id;
    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.MedicalDiaryS.Update({
          id: this.data.id,
          assistance_id: this.assistance_id,
          office_id: this.form.controls.office_id.value,
          weekdays: JSON.stringify(this.form.controls.days_id.value),
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          start_time: this.form.controls.start_time.value,
          finish_time: this.form.controls.finish_time.value,
          interval: this.form.controls.interval.value,
          telemedicine: this.form.controls.telemedicine.value,
          patient_quantity: this.form.controls.patient_quantity.value,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        this.MedicalDiaryS.Save({
          assistance_id: this.assistance_id,
          office_id: this.form.controls.office_id.value,
          weekdays: this.form.controls.days_id.value,
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          start_time: this.form.controls.start_time.value,
          finish_time: this.form.controls.finish_time.value,
          interval: this.form.controls.interval.value,
          telemedicine: this.form.controls.telemedicine.value,
          patient_quantity: this.form.controls.patient_quantity.value,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.close();
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
  }
}
