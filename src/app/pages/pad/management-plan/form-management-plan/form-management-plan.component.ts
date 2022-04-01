import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../business-controller/company.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { ManagementPlanService } from '../../../../business-controller/management-plan.service';
import { TypeOfAttentionService } from '../../../../business-controller/type-of-attention.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';


@Component({
  selector: 'ngx-form-management-plan',
  templateUrl: './form-management-plan.component.html',
  styleUrls: ['./form-management-plan.component.scss'],
})
export class FormManagementPlanComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() admissions_id: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public type_of_attention: any[];
  public frequency: any[];
  public special_field: any[];
  public assigned_user: any[];
  

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private managementPlanS: ManagementPlanService,
    private typeOfAttentionS: TypeOfAttentionService,
    private frequencyS: FrequencyService,
    private specialField: SpecialtyService,
    private userAssigned: UserBusinessService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.user);
    if (!this.data) {
      this.data = {
        id: '',
        type_of_attention_id: '',
        frequency_id: '',
        quantity: '',
        special_field_id: '',
        user_assigned_id: '',
      };
    }

    this.typeOfAttentionS.GetCollection().then(x => {
      this.type_of_attention = x;
    });
    this.frequencyS.GetCollection().then(x => {
      this.frequency = x;
    });
    this.specialField.GetCollection({
      type_professional: 1
    }).then(x => {
      this.special_field = x;
    });

   

    this.form = this.formBuilder.group({
      type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
      frequency_id: [this.data.frequency_id, Validators.compose([Validators.required])],
      quantity: [this.data.quantity, Validators.compose([Validators.required])],
      special_field_id: [this.data.special_field_id],
      assigned_user_id: [this.data.assigned_user_id, Validators.compose([Validators.required])],
    });
this.onChanges();

  }

  onChanges() {
    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
        this.assigned_user = [];
      } else if(val==1){
        this.GetMedical(val,this.user.locality_id).then();
      } else if(val==2){
        this.GetSpeciality(val,this.user.locality_id).then();
      }
    });

  }

  async GetMedical(type_professional, locality_id) {
    if (!type_professional || type_professional === '') return Promise.resolve(false);

    return await this.userAssigned.UserByRoleLocation(locality_id,3).then(x => {
      this.assigned_user = x;    
        return Promise.resolve(true);
    });
  }
  async GetSpeciality(type_professional, locality_id) {
    if (!type_professional || type_professional === '') return Promise.resolve(false);

    return await this.userAssigned.UserByRoleLocation(locality_id,7).then(x => {
      this.assigned_user = x;    
        return Promise.resolve(true);
    });
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.managementPlanS.Update({
          id: this.data.id,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          frequency_id: this.form.controls.frequency_id.value,
          quantity: this.form.controls.quantity.value,
          special_field_id: this.form.controls.special_field_id.value,
          assigned_user_id: this.form.controls.assigned_user_id.value,
          admissions_id: this.admissions_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.managementPlanS.Save({
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          frequency_id: this.form.controls.frequency_id.value,
          quantity: this.form.controls.quantity.value,
          special_field_id: this.form.controls.special_field_id.value,
          assigned_user_id: this.form.controls.assigned_user_id.value,
          admissions_id: this.admissions_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
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