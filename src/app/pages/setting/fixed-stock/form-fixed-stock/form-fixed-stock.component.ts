import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampusService } from '../../../../business-controller/campus.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
import { FixedStockService } from '../../../../business-controller/fixed-stock.service';

@Component({
  selector: 'ngx-form-fixed-stock',
  templateUrl: './form-fixed-stock.component.html',
  styleUrls: ['./form-fixed-stock.component.scss']
})
export class FormFixedStockComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public region_id: number;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public campus_id: any[];
  public fixed_type_id: any[];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private sedesS: CampusService,
    private FixedTypeS: FixedTypeService,
    private FixedStockS: FixedStockService,
    private toastService: NbToastrService,
    private UserRoleBusinessS: UserBusinessService,

  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        fixed_type_id: '',
        campus_id: '',

      };
    }

    this.form = this.formBuilder.group({
      fixed_type_id: [this.data.fixed_type_id, Validators.compose([Validators.required])],
      campus_id: [this.data.campus_id, Validators.compose([Validators.required])],
    });

    await this.sedesS.GetCollection({status_id: 1,}).then(x => {
      this.campus_id = x;
    });
    await this.FixedTypeS.GetCollection().then(x => {
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
        this.FixedStockS.Update({
          id: this.data.id,
          fixed_type_id: this.form.controls.fixed_type_id.value,
          campus_id: this.form.controls.campus_id.value,
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

        this.FixedStockS.Save({
          fixed_type_id: this.form.controls.fixed_type_id.value,
          campus_id: this.form.controls.campus_id.value,
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
