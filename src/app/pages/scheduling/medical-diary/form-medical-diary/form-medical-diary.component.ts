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
import { FlatService } from '../../../../business-controller/flat.service';
import { setOptions , localeEs } from '@mobiscroll/angular';
import { itemHighlight } from '@syncfusion/ej2/maps';

setOptions({
  locale: localeEs,
  theme: 'auto',
  themeVariant: 'light'
});

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
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public status_bed: any[];
  public days: any[] = [];
  public assistance_user: any[] = [];
  public flats: any[] = [];
  public offices: any[] = [];
  public procedure: any[] = [];
  public procedure_id: any = null;
  public filteredControlOptions$: Observable<string[]>;
  public inputFormControl: FormControl;
  public campus_id: number;
  public pavilions: any[] = [];
  public min: any = new Date();
  public max: any;
  public min_time: any;
  public min_time_1: any;
  public max_time: any;
  public calendar_array: string[] = [];

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
    private flatS: FlatService,
    private procedureS: ProcedureService
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        days_id: [],
        office_id: '',
        procedure_id: '',
        start_date: null,
        finish_date: null,
        start_time: null,
        finish_time: null,
        interval: '',
        telemedicine: null,
        patients: null,
        patient_quantity: null,
      };
    }

    this.min = new Date();
    this.min = this.min.toISOString().split('T')[0];

    this.form = this.formBuilder.group({
      // days_id: [[this.data.days_id], Validators.compose([Validators.required])],
      flat_id: [this.data.flat_id, Validators.compose([Validators.required])],
      pavilion_id: [
        this.data.pavilion_id,
        Validators.compose([Validators.required]),
      ],
      office_id: [
        this.data.office_id,
        Validators.compose([Validators.required]),
      ],
      procedure_id: [null, Validators.compose([Validators.required])],
      // start_date: [
      //   this.data.start_date,
      //   Validators.compose([Validators.required]),
      // ],
      // finish_date: [
      //   this.data.finish_date,
      //   Validators.compose([Validators.required]),
      // ],
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
      calendar_id: [''],
    });

    // this.DaysS.GetCollection().then((x) => {
    //   this.days = x;
    // });

    // this.campus_id = localStorage.getItem('campus');
    this.flatS.GetFlatByCampus(+localStorage.getItem('campus')).then((x) => {
      this.flats = x;
    });

    // this.bedS
    //   .GetOfficeBycampus({
    //     status_bed_id: 1,
    //     campus_id: +localStorage.getItem('campus'),
    //     assistance_id: this.assistance_id,
    //   })
    //   .then((x) => {
    //     this.offices = x;
    //   });

    this.procedureS
      .GetCollection({ assistance_id: this.assistance_id })
      .then((x) => {
        this.procedure = x;
        this.filteredControlOptions$ = of(this.procedure);
        this.onFilter();
      });

    // this.inputFormControl = new FormControl();
    this.onChanges();
  }

  private filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.procedure.filter(
      (optionValue) =>
        optionValue.code.includes(filterValue) ||
        optionValue.equivalent.includes(filterValue) ||
        optionValue.name.includes(filterValue)
    );
  }

  onChange(event: any): void { 
    //this.calendar_array = event.valueText.replaceAll('/','-').split(', ').sort();
    this.calendar_array = event.map((date) => {return date.replaceAll('/','-')});
    this.calendar_array = event.map((date) => {
      return date.split('-').reverse().join('-');
    });
  }

  onFilter() {
    this.filteredControlOptions$ = this.form
      .get('procedure_id')
      .valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filter(filterString))
      );
  }

  receiveMessage($event){
    this.onChange($event);
  }

  onChanges() {
    this.form.get('patients').valueChanges.subscribe((val) => {
      if (val) {
        this.form.controls.patient_quantity.setValidators(
          Validators.compose([Validators.required])
        );
      } else {
        this.form.controls.patient_quantity.clearValidators();
        this.form.controls.patient_quantity.setErrors(null);
      }
    });

    // this.form.get('start_date').valueChanges.subscribe((val) => {
    //   if (val === '') {
    //     this.min = new Date();
    //     this.min = this.min.toISOString().split('T')[0];
    //   } else {
    //     // this.min = new Date(val);
    //     // this.min = this.min.toISOString().split('T')[0];
    //   }
    // });

    // this.form.get('finish_date').valueChanges.subscribe((val) => {
    //   if (val != '') {
    //     // this.pavilions = [];
    //     this.max = new Date(val);
    //     this.max = this.max.toISOString().split('T')[0];
    //   } else {
    //     // this.max = new Date(val);
    //   }
    // });

    this.form.get('start_time').valueChanges.subscribe((val) => {
      if (val != '') {
        this.min_time = val;
      } else {
        // this.min_time = new Date(this.min.toISOString().substring(0, 10) + val);
      }
    });

    this.form.get('finish_time').valueChanges.subscribe((val) => {
      if (val !== '') {
        // this.pavilions = [];
        this.min_time_1 = new Date(this.min+'T'+this.min_time).getTime();
        this.max_time = new Date(this.min+'T'+val).getTime();
        if(this.max_time <= this.min_time_1){
          this.form.controls.finish_time.setErrors({'incorrect': true });
        }else{
          this.form.controls.finish_time.setErrors(null);
        }
      } else {
        // this.max_time = new Date(this.min.toISOString().substring(0, 10) + val);
        // if( this.max_time.getTime() > this.min_time.getTime()){
        // }else {
        //   this.form.controls.finish_hour.setErrors({incorrect: true});
        //   this.toastService.warning('','Horas invalidas');
        // }
      }
    });

    this.form.get('flat_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.pavilions = [];
      } else {
        this.GetPavilion(val).then();
      }
      this.form.patchValue({
        pavilion_id: '',
      });
    });

    this.form.get('pavilion_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.offices = [];
      } else {
        this.GetOffice(val).then();
      }
      this.form.patchValue({
        office_id: '',
      });
    });
  }

  GetPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);

    return this.PavilionS.GetPavilionByFlat(flat_id).then((x) => {
      this.pavilions = x;

      return Promise.resolve(true);
    });
  }

  GetOffice(pavilion_id) {
    if (!pavilion_id || pavilion_id === '') return Promise.resolve(false);
    return this.bedS
      .GetOfficeByPavilion({
        status_bed_id: 1,
        pavilion_id: pavilion_id,
        assistance_id: this.assistance_id,
      })
      .then((x) => {
        this.offices = x;

        return Promise.resolve(true);
      });
  }

  onSelectionChange($event) {
    // console.log($event)
    var localidentify = this.procedure.find((item) => item.name == $event);

    if (localidentify) {
      this.procedure_id = localidentify.id;
    } else {
      this.procedure_id = null;
      this.toastService.warning(
        '',
        'Debe seleccionar un procedimiento de la lista'
      );
      this.form.controls.procedure_id.setErrors({ incorrect: true });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;

    if (!this.form.invalid && this.calendar_array.length > 0) {
      this.loading = true;
      console.log(this.calendar_array);
      if (this.data.id) {
        this.MedicalDiaryS.Update({
          id: this.data.id,
          assistance_id: this.assistance_id,
          // weekdays: this.form.controls.days_id.value,
          office_id: this.form.controls.office_id.value,
          procedure_id: this.procedure_id,
          // start_date: this.form.controls.start_date.value,
          // finish_date: this.form.controls.finish_date.value,
          start_time: this.form.controls.start_time.value,
          finish_time: this.form.controls.finish_time.value,
          interval: this.form.controls.interval.value,
          telemedicine: this.form.controls.telemedicine.value,
          patient_quantity: this.form.controls.patient_quantity.value,
          calendar_array: JSON.stringify(this.calendar_array),
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
            this.toastService.warning('', x);
          });
      } else {
        this.MedicalDiaryS.Save({
          assistance_id: this.assistance_id,
          // weekdays: this.form.controls.days_id.value,
          campus_id: +localStorage.getItem('campus'),
          flat_id: this.form.controls.flat_id.value,
          pavilion_id: this.form.controls.pavilion_id.value,
          office_id: this.form.controls.office_id.value,
          procedure_id: this.procedure_id,
          // start_date: this.form.controls.start_date.value,
          // finish_date: this.form.controls.finish_date.value,
          start_time: this.form.controls.start_time.value,
          finish_time: this.form.controls.finish_time.value,
          interval: this.form.controls.interval.value,
          telemedicine: this.form.controls.telemedicine.value,
          patient_quantity: this.form.controls.patient_quantity.value,
          calendar_array: JSON.stringify(this.calendar_array),
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
            this.toastService.warning('', x);
          });
      }
    }
  }
}
