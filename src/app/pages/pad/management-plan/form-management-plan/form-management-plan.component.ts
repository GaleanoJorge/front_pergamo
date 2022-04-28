import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../business-controller/company.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { ManagementPlanService } from '../../../../business-controller/management-plan.service';
import { TypeOfAttentionService } from '../../../../business-controller/type-of-attention.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { RoleAttentionService } from '../../../../business-controller/role-attention.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';


@Component({
  selector: 'ngx-form-management-plan',
  templateUrl: './form-management-plan.component.html',
  styleUrls: ['./form-management-plan.component.scss'],
})
export class FormManagementPlanComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() medical: boolean = false;
  @Input() assigned: boolean;
  @Input() admissions_id: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public type_of_attention: any[];
  public frequency: any[];
  public specialty: any[];
  public assigned_user: any[];
  public roles;
  public procedure;
  public procedure_id: any;
  public isMedical: boolean = false;
  public type_auth = 1;
  public phone_consult = false;


  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private managementPlanS: ManagementPlanService,
    private typeOfAttentionS: TypeOfAttentionService,
    private frequencyS: FrequencyService,
    private specialField: SpecialtyService,
    private userAssigned: UserBusinessService,
    private roleAttentionS: RoleAttentionService,
    private serviceBriefcaseS: ServicesBriefcaseService
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
        specialty_id: '',
        user_assigned_id: '',
        procedure_id: '',
      };
    } else {
      this.getRoleByAttention(this.data.type_of_attention_id).then(x => {
        if (x) {
          this.GetMedical(this.user.locality_id).then(x => {
            if (x) {
              this.assigned_user = this.assigned_user.filter(x => x.id !== this.user.id);
            }
          }).catch(e => {
            this.toastService.danger(e, 'Error');
          });
        }
      }).catch(e => {
        this.toastService.danger(e, 'Error');
      });
    }

    this.typeOfAttentionS.GetCollection().then(x => {
      this.type_of_attention = x;
    });
    this.frequencyS.GetCollection().then(x => {
      this.frequency = x;
    });
    this.serviceBriefcaseS.GetByBriefcase(this.user.admissions[this.user.admissions.length - 1].briefcase_id).then(x => {
      this.procedure = x;
    });
    this.specialField.GetCollection({
      type_professional: 1
    }).then(x => {
      this.specialty = x;
    });
    if (this.medical == false) {
      this.form = this.formBuilder.group({
        type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
        frequency_id: [this.data.frequency_id, Validators.compose([Validators.required])],
        quantity: [this.data.quantity, Validators.compose([Validators.required])],
        specialty_id: [this.data.specialty_id],
        assigned_user_id: [this.data.assigned_user_id, Validators.compose([Validators.required])],
        procedure_id: [this.data.procedure_id, Validators.compose([Validators.required])],
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date]

      });
      this.onChanges();
    } else {
      this.form = this.formBuilder.group({
        type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
        frequency_id: [this.data.frequency_id, Validators.compose([Validators.required])],
        quantity: [this.data.quantity, Validators.compose([Validators.required])],
        specialty_id: [this.data.specialty_id],
        assigned_user_id: [this.data.assigned_user_id],
        procedure_id: [this.data.procedure_id, Validators.compose([Validators.required])],
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date]

      });
      this.isMedical = true;
    }

    // if (this.assigned == true) {

    // }

  }

  onChanges() {

    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
        this.assigned_user = [];
      } else if (val != "2") {
        this.getRoleByAttention(val).then(x => {
          if (x) {
            this.GetMedical(this.user.locality_id).then(x => {
              if (x) {
                this.assigned_user = this.assigned_user.filter(x => x.id !== this.user.id);
              }
            }).catch(e => {
              this.toastService.danger(e, 'Error');
            });
          }
        }).catch(e => {
          this.toastService.danger(e, 'Error');
        });
      } else {
        this.form.get('specialty_id').valueChanges.subscribe(val => {
          if (val != "") {
            this.getRoleByAttention(val).then(x => {
              if (x) {
                this.GetMedical(this.user.locality_id, val).then(x => {
                  if (x) {
                    this.assigned_user = this.assigned_user.filter(x => x.id !== this.user.id);
                  }
                }).catch(e => {
                  this.toastService.danger(e, 'Error');
                });
              }
            }).catch(e => {
              this.toastService.danger(e, 'Error');
            });
          }
        });
      }
    });


  }

  async getRoleByAttention(type_of_attention_id) {
    if (!type_of_attention_id || type_of_attention_id === '') return Promise.resolve(false);

    return await this.roleAttentionS.GetCollection({
      type_of_attention_id: type_of_attention_id
    }).then(x => {
      this.roles = x;
      return Promise.resolve(true);
    });
  }

  async GetMedical(locality_id, specualty?) {
    // if (!type_professional || type_professional === '') return Promise.resolve(false);

    return await this.userAssigned.UserByRoleLocation(locality_id, this.phone_consult ? 2 : 1, {
      roles: JSON.stringify(this.roles),
    }).then(x => {
      this.assigned_user = x;
      return Promise.resolve(true);
    });
  }

  phoneConsultChange(event) {
    this.assigned_user = [];
    this.phone_consult = event.target.checked;
    if (this.roles) {
      this.GetMedical(this.user.locality_id).then(x => {
        if (x) {
          this.assigned_user = this.assigned_user.filter(x => x.id !== this.user.id);
        }
      }).catch(e => {
        this.toastService.danger(e, 'Error');
      });
    }
  }

  // async GetSpeciality(type_professional, locality_id) {
  //   if (!type_professional || type_professional === '') return Promise.resolve(false);

  //   return await this.userAssigned.UserByRoleLocation(locality_id,7).then(x => {
  //     this.assigned_user = x;    
  //       return Promise.resolve(true);
  //   });
  // }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.medical == false) {
        var selectes_assistance_id;
        this.assigned_user.forEach(user => {
          if (user.id === this.form.value.assigned_user_id) {
            selectes_assistance_id = user.assistance_id;
          }
        });
      }
      if (this.data.id) {
        this.managementPlanS.Update({
          id: this.data.id,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          frequency_id: this.form.controls.frequency_id.value,
          quantity: this.form.controls.quantity.value,
          specialty_id: this.form.controls.specialty_id.value,
          assigned_user_id: this.form.controls.assigned_user_id.value,
          admissions_id: this.admissions_id,
          procedure_id: this.procedure_id,
          type_auth: this.type_auth,
          assistance_id: selectes_assistance_id,
          locality_id: this.user.locality_id,
          phone_consult: this.phone_consult,
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          authorized_amount: this.data.authorization.authorized_amount,
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
          specialty_id: this.form.controls.specialty_id.value,
          assigned_user_id: this.form.controls.assigned_user_id.value,
          admissions_id: this.admissions_id,
          procedure_id: this.procedure_id,
          assistance_id: selectes_assistance_id,
          locality_id: this.user.locality_id,
          phone_consult: this.phone_consult,
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          medical: this.isMedical,
          type_auth: this.type_auth,
        }).then(x => {
          this.toastService.success('', x.message);
          if (x['message_error']) {
            this.toastService.danger(x['message_error'], 'Error');
          }
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

  saveCode(e): void {
    var localidentify = this.procedure.find(item => item.manual_price.name == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.type_auth = localidentify.briefcase.type_auth;
      if (this.type_auth == 0) {
        this.form.controls.assigned_user_id.clearValidators();
        this.form.controls.assigned_user_id.setErrors(null);
      }
    } else {
      this.procedure_id = null;
      this.type_auth = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');

    }
  }
}
