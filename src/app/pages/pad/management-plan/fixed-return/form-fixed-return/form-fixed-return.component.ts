import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { AdmissionsService } from '../../../../../business-controller/admissions.service';
import { FixedAddService } from '../../../../../business-controller/fixed-add.service';
import { FixedNomProductService } from '../../../../../business-controller/fixed-nom-product.service';
import { FixedStockService } from '../../../../../business-controller/fixed-stock.service';
import { PatientService } from '../../../../../business-controller/patient.service';
import { ServicesBriefcaseService } from '../../../../../business-controller/services-briefcase.service';
import { UserBusinessService } from '../../../../../business-controller/user-business.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'ngx-form-fixed-return',
  templateUrl: './form-fixed-return.component.html',
  styleUrls: ['./form-fixed-return.component.scss']
})
export class FormFixedReturnComponent implements OnInit {
  @Input() title: string;
  @Input() data2: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Input() status: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  // public close: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public label: string = '';

  public supplies_status: any[];
  public diagnosis_class: any[];
  public status_id;
  public user_id;
  public data;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private route: ActivatedRoute,
    private FixedAddService: FixedAddService,
    private authS: AuthService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        // quantity: '',
        observation: '',
      };
    } else {
    }

    this.form = this.formBuilder.group({
      // quantity: ['', Validators.compose([Validators.required])],
      observation: ['', Validators.compose([Validators.required])],
    });

    this.user_id = this.authS.GetUser().id;

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data2.id) {
        await this.FixedAddService.updateInventoryByLot({
          id: this.data2.id,
          observation: this.form.controls.observation.value,
          admissions_id: this.data2.admissions_id,
          request_fixed_user: this.user_id,
          status: 'DEVUELTO PACIENTE',
          fixed_assets_id:this.data2.fixed_assets_id,
        }).then((x) => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
            this.close();
          }
          // this.close();
        }).catch(x => {
          this.toastService.danger('', x);
          this.isSubmitted = false;
          this.loading = false;
        });

      } else {
        await this.FixedAddService.Save({
          status: 'DEVUELTO PACIENTE',
          observation: this.form.controls.observation.value,
          admissions_id: this.data2.admissions_id,
          request_fixed_user: this.user_id,
          fixed_assets_id:this.data.fixed_assets_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.close();
              this.saved();
            }
          })
          .catch((x) => {
            this.toastService.success('', x.message);
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }


}
