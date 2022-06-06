import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';
import { FixedAssetsService } from '../../../../business-controller/fixed-assets.service';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { FixedTypeService } from '../../../../business-controller/fixed-type.service';
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
  public user;
  public selectedOptions: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    protected dialogRef: NbDialogRef<any>,
    private authService: AuthService,
    
    private FixedLocationCampusS: FixedLocationCampusService,
    private UserRoleBusinessS: UserBusinessService,
    private FixedAddS: FixedAddService,

  ) {
  }

  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.parentData = {
      selectedOptions: [],
      entity: 'fixed_assets',
      customData: 'fixed_assets',
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

  close() {
    this.dialogRef.close();
  }

  receiveMessage($event) {
    this.selectedOptions = $event;
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.FixedAddS.Update({
          id: this.data.id,
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          observation: this.form.controls.observation.value,
          status: 'ENVIADO',
        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.FixedAddS.Save({
          fixed_location_campus_id: this.form.controls.fixed_location_campus_id.value,
          responsible_user_id: this.form.controls.responsible_user_id.value,
          observation: this.form.controls.observation.value,
          status: 'ENVIADO',
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ fixed_location_campus_id: '', responsible_user_id: '', observation: '' });
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
