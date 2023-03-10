import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedLoanService } from '../../../../business-controller/fixed-loan.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-fixed-assets-requests-patient',
  templateUrl: './form-fixed-assets-requests-patient.component.html',
  styleUrls: ['./form-fixed-assets-requests-patient.component.scss']
})
export class FormFixedAssetsRequestsPatientComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public responsible_user_id: any[];
  public fixed_assets_id: any[];
  public user;
  public selectedOptions: any[] = [];
  public product_id;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private authService: AuthService,
    private toastS: NbToastrService,
    private UserRoleBusinessS: UserBusinessService,
    private FixedAddS: FixedAddService,
    // private FixedLoanS: FixedLoanService,
  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      data: this.data,
    };
    if (!this.data) {
      this.data = {
        observation: '',
      };
    }

    this.form = this.formBuilder.group({
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
      observation: [this.data.observation],
    });
    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.responsible_user_id = x;
    });
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }
  close() {
    this.dialogRef.close();
  }

  saveCode(e): void {
    var localidentify = this.responsible_user_id.find(item => item.nombre_completo == e);
    if (localidentify) {
      this.product_id = localidentify.id;
    } else {
      this.product_id = null;
      this.form.controls.responsible_user_id.setErrors({ 'incorrect': true });
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
    }
  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un activo', 'Error');
      }
      if (valid_values) {
        this.loading = true;

        if (this.data.id) {
          this.FixedAddS.updateInventoryByLot({
            id: this.data.id,
            fixed_assets_id: this.selectedOptions,
            responsible_user_id: this.product_id,
            // responsible_user_id: this.form.controls.responsible_user_id.value,
            amount: 1,
            status: 'ENVIADO PATIENT',
            observation: this.form.controls.observation.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.fixed_add.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
            contador++;
            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elementos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elementos');
            }
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {
          await this.FixedAddS.updateInventoryByLot({
            id: -1,
            amount: 1,
            status: 'ENVIADO PATIENT', 
            fixed_assets_id: this.selectedOptions,
            observation: this.form.controls.observation.value,
            responsible_user_id: this.product_id,
            // responsible_user_id: this.form.controls.responsible_user_id.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.fixed_add.id;
            var contador = 0;
            var err = 0;
            contador++;
            if (contador > 0) {
              this.toastS.success(null, 'Se actualizaron ' + contador + ' elementos');
            } else if (err > 0) {
              this.toastS.danger(null, 'No se actualizaron ' + contador + ' elementos');
            }
            this.selectedOptions = [];
            if (this.saved) {
              this.saved();
            }
          }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });
        }
      }
    }else{
      this.toastService.danger('DEBE LLENAR TODOS LOS CAMPOS');
    }
  }
}
