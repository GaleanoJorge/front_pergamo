import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { FlatService } from '../../../../business-controller/flat.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { FixedAreaCampusService } from '../../../../business-controller/fixed-area-campus.service';

@Component({
  selector: 'ngx-form-fixed-location-campus',
  templateUrl: './form-fixed-location-campus.component.html',
  styleUrls: ['./form-fixed-location-campus.component.scss']
})
export class FormFixedLocationCampusComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public flat: any[];
  public campus: any[];
  public fixed_area_campus: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FlatS: FlatService,
    private CampusS: CampusService,
    private FixedAreaCampusS: FixedAreaCampusService,
    private FixedLocationCampusS: FixedLocationCampusService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        flat_id: '',
        campus_id: '',
        fixed_area_campus_id: '',
      };
    }

    this.form = this.formBuilder.group({
      flat_id: [this.data.flat_id, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      fixed_area_campus_id: [this.data.fixed_area_campus_id, Validators.compose([Validators.required])],
    });

    this.FlatS.GetCollection().then(x => {
      this.flat = x;
    });
    this.CampusS.GetCollection().then(x => {
      this.campus = x;
    });
    this.FixedAreaCampusS.GetCollection().then(x => {
      this.fixed_area_campus = x;
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.FixedLocationCampusS.Update({
          id: this.data.id,
          flat_id: this.form.controls.flat_id.value,
          campus_id: this.form.controls.campus_id.value,
          fixed_area_campus_id: this.form.controls.fixed_area_campus_id.value,
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
        this.FixedLocationCampusS.Save({
          flat_id: this.form.controls.flat_id.value,
          campus_id: this.form.controls.campus_id.value,
          fixed_area_campus_id: this.form.controls.fixed_area_campus_id.value,
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
