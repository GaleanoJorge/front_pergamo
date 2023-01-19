import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-fixed-denied',
  templateUrl: './form-fixed-denied.component.html',
  styleUrls: ['./form-fixed-denied.component.scss']
})
export class FormFixedDeniedComponent implements OnInit {
  @Input() title: string;
  @Input() data2: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
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
    private FixedAddService: FixedAddService,
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
        await this.FixedAddService.updateInventoryByLot({
          id: this.data2.id,
          observation: this.form.controls.observation.value,
          admissions_id: this.data2.admissions_id,
          status: 'RECHAZADO',
          fixed_nom_product:this.data2.fixed_nom_product_id,
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
          id: this.data2.id,
          status: 'RECHAZADO',
          observation: this.form.controls.observation.value,
          admissions_id: this.data2.admissions_id,
          request_fixed_user: this.user_id,
          fixed_nom_product:this.data2.fixed_nom_product_id,

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
