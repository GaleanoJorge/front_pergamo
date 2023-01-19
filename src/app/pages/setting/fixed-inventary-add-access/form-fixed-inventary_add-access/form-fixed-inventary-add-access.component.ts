import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedLocationCampusService } from '../../../../business-controller/fixed-location-campus.service';
import { UserRoleBusinessService } from '../../../../business-controller/user-role-business.service';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';

@Component({
  selector: 'ngx-form-fixed-inventary-add-access',
  templateUrl: './form-fixed-inventary-add-access.component.html',
  styleUrls: ['./form-fixed-inventary-add-access.component.scss']
})
export class FormFixedInventaryAddAccessComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public fixed_location_campus_id: any[];
  public responsible_user_id: any[];
  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>, 
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        observation: '',
        amount: '',
      };
    }
  }
}