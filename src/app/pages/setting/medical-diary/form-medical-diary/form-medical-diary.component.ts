import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { MedicalDiaryService } from '../../../../business-controller/medical-diary.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { DaysService } from '../../../../business-controller/days.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { json } from '@rxweb/reactive-form-validators';
import { BedService } from '../../../../business-controller/bed.service';
import { AuthService } from '../../../../services/auth.service';





@Component({
  selector: 'ngx-form-medical-diary',
  templateUrl: './form-medical-diary.component.html',
  styleUrls: ['./form-medical-diary.component.scss']
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

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private PavilionS: PavilionService,
    private MedicalDiaryS: MedicalDiaryService,
    private toastService: NbToastrService,
    private DaysS: DaysService,
    private userBS: UserBusinessService,
    private bedS: BedService,
    private AuthS: AuthService
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        days_id: [],
        office_id: '',
        start_date: '',
        finish_date: '',
        start_time: '',
        finish_time: '',
        interval: '',
        telemedicine: null,
      };
    }

    this.form = this.formBuilder.group({
      office_id: [
        this.data.office_id
      ],
      days_id: [
        [this.data.days_id]
      ],
      start_date: [
        this.data.start_date,
        Validators.compose([Validators.required])
      ],
      finish_date: [
        this.data.finish_date,
        Validators.compose([Validators.required])
      ],
      start_time: [
        this.data.start_time,
        Validators.compose([Validators.required])
      ],
      finish_time: [
        this.data.finish_time,
        Validators.compose([Validators.required])
      ],
      interval: [
        this.data.finish_time,
        Validators.compose([Validators.required])
      ],
      telemedicine: [
        this.data.telemedicine,
      ],
    });

    this.DaysS.GetCollection().then(x => {
      this.days = x;
    });

    this.bedS.GetOfficeBycampus({
      status_bed_id: 1,
      campus_id: +localStorage.getItem('campus')
    }).then(x =>{
      this.offices = x;
    }) 

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
        this.MedicalDiaryS.Save({
          assistance_id: this.assistance_id,
          office_id: this.form.controls.office_id.value,
          weekdays: JSON.stringify(this.form.controls.days_id.value),
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          start_time: this.form.controls.start_time.value,
          finish_time: this.form.controls.finish_time.value,
          interval: this.form.controls.interval.value,
          telemedicine: this.form.controls.telemedicine.value,
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

}
