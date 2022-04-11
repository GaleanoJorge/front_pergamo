import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BriefcaseService } from '../../../../business-controller/briefcase.service';
import { environment } from '../../../../../environments/environment.prod';
import { TypeBriefcaseService } from '../../../../business-controller/type-briefcase.service';
import { CoverageService } from '../../../../business-controller/coverage.service';
import { ModalityService } from '../../../../business-controller/modality.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { CampusBriefcaseService } from '../../../../business-controller/campus-briefcase.service';

@Component({
  selector: 'ngx-form-briefcase',
  templateUrl: './form-briefcase.component.html',
  styleUrls: ['./form-briefcase.component.scss']
})
export class FormBriefcaseComponent implements OnInit {

  @Input() title: string;
  @Input() contract_id: any;
  @Input() data: any = null;
  @Input() campus_id: any = null;

  public form: FormGroup;
  public status: any[];
  public messageError = null;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public previewFile = null;
  public type_briefcase: any[];
  public coverage: any[];
  public modality: any[];
  public campus_briefcase: any[];
  public campus: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private statusBS: StatusBusinessService,
    private BriefcaseS: BriefcaseService,
    private TypeBriefcaseS: TypeBriefcaseService,
    private CoverageS: CoverageService,
    private ModalityS: ModalityService,
    private CampusS: CampusService,
    private CampusBriefcaseS: CampusBriefcaseService,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        contract_id: '',
        coverage_id: '',
        modality_id: '',
        campus_id: [],
        status_id: '',
        type_auth: '',
      };

    }

    this.CoverageS.GetCollection().then(x => {
      this.coverage = x;
    });
    this.ModalityS.GetCollection().then(x => {
      this.modality = x;
    });
    this.statusBS.GetCollection().then(x => {
      this.status = x;
    });
    this.CampusS.GetCollection().then(x => {
      this.campus = x;
    });

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      coverage_id: [this.data.coverage_id, Validators.compose([Validators.required])],
      modality_id: [this.data.modality_id, Validators.compose([Validators.required])],
      campus_id: [[this.getcampus()]],
      status_id: [this.data.status_id, Validators.compose([Validators.required])],
      contract_id: [this.data.contract_id],
      type_auth: [this.data.type_auth, Validators.compose([Validators.required])],
    });

  }

  async getcampus() {
    if (this.data.id) {
      await this.CampusBriefcaseS.GetByBriefcase(this.data.id).then(x => {
        var arrdta = [];
        this.campus_briefcase = x.data;
        this.campus_briefcase.forEach(element => {
          arrdta.push(element.campus_id);
        });
        this.form.controls.campus_id.setValue(arrdta);
      });
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
        this.BriefcaseS.Update({
          id: this.data.id,
          contract_id: this.contract_id,
          name: this.form.controls.name.value,
          coverage_id: this.form.controls.coverage_id.value,
          modality_id: this.form.controls.modality_id.value,
          campus_id: this.form.controls.campus_id.value,
          status_id: this.form.controls.status_id.value,
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
        this.BriefcaseS.Save({
          contract_id: this.contract_id,
          name: this.form.controls.name.value,
          coverage_id: this.form.controls.coverage_id.value,
          modality_id: this.form.controls.modality_id.value,
          campus_id: this.form.controls.campus_id.value,
          status_id: this.form.controls.status_id.value,
          type_auth: this.form.controls.type_auth.value,
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
