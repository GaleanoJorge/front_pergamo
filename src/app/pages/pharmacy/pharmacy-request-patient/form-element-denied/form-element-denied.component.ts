import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PharmacyProductRequestService } from '../../../../business-controller/pharmacy-product-request.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-element-denied',
  templateUrl: './form-element-denied.component.html',
  styleUrls: ['./form-element-denied.component.scss']
})
export class FormElementDeniedComponent implements OnInit {
  @Input() title: string;
  @Input() data2: any = null;
  @Input() status: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
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
    private PharmacyProductRequestS: PharmacyProductRequestService,
    private authS: AuthService,
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        observation: '',
      };
    } else {
    }

    this.form = this.formBuilder.group({
      observation: ['', Validators.compose([Validators.required])],
    });
    this.user_id = this.authS.GetUser().id;
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data2.id) {
        await this.PharmacyProductRequestS.updateInventoryByLot({
          id: this.data2.id,
          observation: this.form.controls.observation.value,
          admissions_id: this.data2.admissions_id,
          status: 'RECHAZADO',
          user_request_id: this.user_id,
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
        await this.PharmacyProductRequestS.Save({
          id: this.data2.id,
          status: 'RECHAZADO',
          observation: this.form.controls.observation.value,
          admissions_id: this.data2.admissions_id,
          user_request_id: this.user_id,
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
