import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedLoanService } from '../../../../business-controller/fixed-loan.service';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-fixed-access-requests',
  templateUrl: './form-fixed-access-requests.component.html',
  styleUrls: ['./form-fixed-access-requests.component.scss']
})
export class FormFixedAccessRequestsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public user;
  public selectedOptions: any[] = [];

  public fixed_location_campus_id: any[];
  public responsible_user_id: any[];


  constructor(
    private formBuilder: FormBuilder,
    private FixedAddS: FixedAddService,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private authService: AuthService,
    private toastS: NbToastrService,
    private FixedLocationCampusS: FixedLocationCampusService,
    private UserRoleBusinessS: UserBusinessService,
    private FixedLoanS: FixedLoanService

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'fixed_accessories',
      customData: 'fixed_accessories',
    };
    if (!this.data) {
      this.data = {
        amount: '',
      };
    }

    this.form = this.formBuilder.group({
      fixed_location_campus_id: [this.data.fixed_location_campus_id, Validators.compose([Validators.required])],
      responsible_user_id: [this.data.responsible_user_id, Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
    });

    await this.FixedLocationCampusS.GetCollection({}).then(x => {
      this.fixed_location_campus_id = x;
    });

    await this.UserRoleBusinessS.GetCollection().then(x => {
      this.responsible_user_id = x;
    });
  }

  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  async save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      var valid_values = true;
      var total_sent = 0;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un activo', 'Error');
      } else {
        this.selectedOptions.forEach(element => {
          if (element.amount == null || element.amount <= 0) {
            valid_values = false;
          } else {
            total_sent += element.amount
          }
        });
        if (!valid_values) {
          this.toastS.danger('Debe ingresar una cantidad valida', 'Error');
        }
      }
      if (valid_values) {
        this.loading = true;
        if (this.data.id) {
          await this.FixedAddS.updateInventoryByLot({
            id: this.data.id,
            amount: total_sent,
            status: 'ENVIADO',
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            responsible_user_id: this.form.controls.responsible_user_id.value,
            observation: this.form.controls.observation.value,
            fixed_loan_id: JSON.stringify(this.selectedOptions),
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
          await this.FixedAddS.Save({
            amount: this.form.controls.amount.value,
            status: 'ENVIADO',
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            responsible_user_id: this.form.controls.responsible_user_id.value,
            observation: this.form.controls.observation.value,
            // fixed_accessories_id: JSON.stringify(this.selectedOptions),
            fixed_loan_id: JSON.stringify(this.selectedOptions),
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.fixed_add.id;
            var contador = 0;
            var err = 0;
            this.FixedLoanS.Save({
              fixed_add_id: id,
              fixed_loan_id: JSON.stringify(this.selectedOptions),
            }).then(x => {
            }).catch(x => {
              err++;
            });
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
    }
  }
}
