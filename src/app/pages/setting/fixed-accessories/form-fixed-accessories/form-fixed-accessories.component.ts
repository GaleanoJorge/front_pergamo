import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedPropertyService } from '../../../../business-controller/fixed-property.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
import { FixedClasificationService } from '../../../../business-controller/fixed-clasification.service';
import { FixedConditionService } from '../../../../business-controller/fixed-condition.service';
import { FixedAccessoriesService } from '../../../../business-controller/fixed-accessories.service';
import { CampusService } from '../../../../business-controller/campus.service';


@Component({
  selector: 'ngx-form-fixed-accessories',
  templateUrl: './form-fixed-accessories.component.html',
  styleUrls: ['./form-fixed-accessories.component.scss']
})
export class FormFixedAccessoriesComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public campus_id: any[];
  public fixed_type_id: any[];


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private FixedTypeS: FixedTypeService,
    private FixedAccessoriesS: FixedAccessoriesService,
    private toastService: NbToastrService,
    private CampusS: CampusService
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        name: '',
        amount_total: '',
        fixed_type_id: '',

      };
    }

    this.form = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      amount_total: [this.data.name, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
      fixed_type_id: [this.data.fixed_type_id, Validators.compose([Validators.required])],

    });

    await this.CampusS.GetCollection().then(x => {
      this.campus_id = x;
    });
    await this.FixedTypeS.GetCollection({}).then(x => {
      this.fixed_type_id = x;
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
        this.FixedAccessoriesS.Update({
          id: this.data.id,
          name: this.form.controls.name.value,
          amount_total: this.form.controls.amount_total.value,
          campus_id: this.form.controls.campus_id.value,
          fixed_type_id: this.form.controls.fixed_type_id.value,
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
      else {
        this.FixedAccessoriesS.Save({
          name: this.form.controls.name.value,
          amount_total: this.form.controls.amount_total.value,
          campus_id: this.form.controls.campus_id.value,
          fixed_type_id: this.form.controls.fixed_type_id.value,
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
