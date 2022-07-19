import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedLoanService } from '../../../../business-controller/fixed-loan.service';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-form-fixed-assets-requests',
  templateUrl: './form-fixed-assets-requests.component.html',
  styleUrls: ['./form-fixed-assets-requests.component.scss']
})
export class FormFixedAssetsRequestsComponent implements OnInit {


  @Input() title: string;
  @Input() data: any = null;
  @Input() parentData: any;
  //@Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public fixed_location_campus_id: any[];
  public responsible_user_id: any[];
  public fixed_assets_id: any[];
  public user;
  public selectedOptions: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private authService: AuthService,
    private toastS: NbToastrService,
    private FixedLocationCampusS: FixedLocationCampusService,
    private UserRoleBusinessS: UserBusinessService,
    private FixedAddS: FixedAddService,
    private FixedLoanS: FixedLoanService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
    };
    if (!this.data) {
      this.data = {
        observation: '',
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

  receiveMessage($event) {
    this.selectedOptions = $event;
  }
  close() {
    this.dialogRef.close();
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      var valid_values = true;
      var total_sent = 1;
      if (!this.selectedOptions || this.selectedOptions.length == 0) {
        valid_values = false;
        this.toastS.danger('Debe seleccionar al menos un medicamento', 'Error');
      }
      if (valid_values) {
        this.loading = true;

        if (this.data.id) {
          this.FixedAddS.updateInventoryByLot({
            fixed_assets_id: this.data.id,
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            responsible_user_id: this.form.controls.responsible_user_id.value,
            request_amount : 1,
            status: 'ENVIADO',
            observation: this.form.controls.observation.value,
            // fixed_assets_id: JSON.stringify(this.selectedOptions),
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.fixed_add.id;
            var contador = 0;
            var err = 0;
            if (this.saved) {
              this.saved();
            }
            this.FixedLoanS.Update({
              fixed_add_id: id,
              fixed_assets_id: JSON.stringify(this.selectedOptions),
            }, id).then(x => {
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
        } else {
          await this.FixedAddS.updateInventoryByLot({
            fixed_assets_id: this.data.id,
            fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
            responsible_user_id: this.form.controls.responsible_user_id.value,
            request_amount : 1,
            status: 'ENVIADO',
            observation: this.form.controls.observation.value,
          }).then(x => {
            this.toastService.success('', x.message);
            this.close();
            var id = x.data.fixed_add.id;
            var contador = 0;
            var err = 0;
            this.FixedLoanS.Save({
              fixed_add_id: id,
              fixed_assets_id: JSON.stringify(this.selectedOptions),
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
