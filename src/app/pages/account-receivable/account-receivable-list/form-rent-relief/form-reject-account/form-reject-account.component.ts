import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountReceivableService } from '../../../../../business-controller/account-receivable.service';
import { HumanTalentRequestObservationService } from '../../../../../business-controller/human-talent-request-observation.service';


@Component({
  selector: 'ngx-form-reject-account',
  templateUrl: './form-reject-account.component.html',
  styleUrls: ['./form-reject-account.component.scss']
})
export class FormRejectAccountComponent implements OnInit {

  @Input() title: string;
  @Input() data:any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public closeP: any = null;
  public loading: boolean = false;
  public human_talent_request_observation: any = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private AccountReceivableS: AccountReceivableService,
    private toastService: NbToastrService,
    private HumanTalentRequestObservationS: HumanTalentRequestObservationService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        observation: '',
      };
    }
    
    this.form = this.formBuilder.group({      
      observation: ['', Validators.compose([Validators.required])],
    });

    this.HumanTalentRequestObservationS.GetCollection({
      category: 2,
    }).then(x => {
      this.human_talent_request_observation = x;
    });
  }
  
  ChangeObservation($event: string) {
    this.form.patchValue({ observation: (this.form.controls.observation.value == "" ? "" : this.form.controls.observation.value + ", ") + $event });
  }

  close() {
    this.dialogRef.close();
    
  }

  save() {

    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.AccountReceivableS.Update({
          id: this.data.id,
          observation: this.form.controls.observation.value,
          file_payment: this.data.file_payment,
          gross_value_activities: this.data.gross_value_activities,
          net_value_activities: this.data.net_value_activities,
          user_id: this.data.user_id,
          status_bill_id: 5,
          minimum_salary_id: this.data.minimum_salary_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
          if (this.closeP) {
            this.closeP();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.AccountReceivableS.Save({
          observation: this.form.controls.observation.value,
          file_payment: this.data.file_payment,
          gross_value_activities: this.data.gross_value_activities,
          net_value_activities: this.data.net_value_activities,
          user_id: this.data.user_id,
          status_bill_id: this.data.status_bill_id,
          minimum_salary_id: this.data.minimum_salary_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
          if (this.closeP) {
            this.closeP();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

}
