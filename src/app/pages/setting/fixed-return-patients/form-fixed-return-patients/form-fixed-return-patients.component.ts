import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-fixed-return-patients',
  templateUrl: './form-fixed-return-patients.component.html',
  styleUrls: ['./form-fixed-return-patients.component.scss']
})
export class FormFixedReturnPatientsComponent implements OnInit {

  @Input() title: string;
  @Input() data2: any = null;
  @Input() parentData: any;
  @Input() status: any = null;
  @Input() type: boolean = null;
  @Input() my_fixed_id: boolean = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public selectedOptions: any[] = [];
  public user;
  public show: boolean = false;
  public data;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private authService: AuthService,
    private FixedAddService: FixedAddService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    if (!this.data) {
      this.data = {
        observation: '',
      };
    }
    this.form = this.formBuilder.group({
      observation: ['', Validators.compose([Validators.required])],
    });
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data2.id) {
        await this.FixedAddService.updateInventoryByLot({
          id: this.data2.id,
          observation: this.form.controls.observation.value,
          status: 'ACEPTADO PACIENTE',
          fixed_assets_id: this.data2.fixed_assets_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.toastService.danger('', x);
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.FixedAddService.Save({
          observation: this.form.controls.observation.value,
          status: 'ACEPTADO PACIENTE',
          fixed_assets_id: this.data.fixed_assets_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          this.saved();
        }).catch(x => {
          this.toastService.success('', x.message);
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }
}
