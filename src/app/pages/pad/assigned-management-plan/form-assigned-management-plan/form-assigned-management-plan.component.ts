import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { ManagementPlanService } from '../../../../business-controller/management-plan.service';
import { AssignedManagementPlanService } from '../../../../business-controller/assigned-management-plan.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { RoleAttentionService } from '../../../../business-controller/role-attention.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';


@Component({
  selector: 'ngx-form-assigned-management-plan',
  templateUrl: './form-assigned-management-plan.component.html',
  styleUrls: ['./form-assigned-management-plan.component.scss'],
})
export class FormAssignedManagementPlanComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() medical: boolean = false;
  @Input() phone_consult;
  @Input() assigned: boolean;
  @Input() admissions_id: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public type_of_attention: any[];
  public frequency: any[];
  public special_field: any[];
  public assigned_user: any[];
  public roles;
  public procedure;
  public procedure_id: any;
  public isMedical: boolean = false;
  public type_auth = 1;
  public show = false;
  public product_gen: any[];
  public product_id;

  //   this.status = x;



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private managementPlanS: ManagementPlanService,
    private specialField: SpecialtyService,
    private userAssigned: UserBusinessService,
    private roleAttentionS: RoleAttentionService,
    private AssignedManagementPlanS: AssignedManagementPlanService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        id: '',
        type_of_attention_id: '',
        frequency_id: '',
        quantity: '',
        special_field_id: '',
        user_assigned_id: '',
        procedure_id: '',
      };
    } else {
      this.getRoleByAttention(this.data.management_plan.type_of_attention_id).then(x => {
        if (x) {
          this.GetMedical(this.roles, this.user.locality_id).then(x => {
            if (x) {
              var validator = this.assigned_user.find(item => item.id == this.data.user.id);
              if (!validator){
                this.assigned_user.push(this.data.user)
              }
            }
          }).catch(e => {
            // this.toastService.danger(e, 'Error');
            this.assigned_user.push(this.data.user)
          });
        }
      }).catch(e => {
        this.toastService.danger(e, 'Error');
      });
    }

    if (this.data.management_plan.type_of_attention_id == 17) {
      this.show = true;
      this.form = this.formBuilder.group({
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date],
        assigned_user_id: [this.data.user_id],
        start_hour: [this.data.start_hour, Validators.compose([Validators.required])],
      });
    } else if (this.data.management_plan.type_of_attention_id == 12) {
      this.show = true;
      this.form = this.formBuilder.group({
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date],
        assigned_user_id: [this.data.user_id],
        start_hour: [this.data.start_hour, Validators.compose([Validators.required])],
        finish_hour: [this.data.finish_hour, Validators.compose([Validators.required])],
      });
    } else {
      this.show = false;
      this.form = this.formBuilder.group({
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date],
        assigned_user_id: [this.data.user_id],
      });
    }

    this.specialField.GetCollection({
      type_professional: 1
    }).then(x => {
      this.special_field = x;
    });


    // if (this.assigned == true) {

    // }

  }

  onChanges() {

    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
        this.assigned_user = [];
      } else {
        this.getRoleByAttention(val).then(x => {
          if (x) {
            this.GetMedical(this.roles, this.user.locality_id).then(x => {
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

  async getRoleByAttention(type_of_attention_id) {
    if (!type_of_attention_id || type_of_attention_id === '') return Promise.resolve(false);

    return await this.roleAttentionS.GetCollection({
      type_of_attention_id: type_of_attention_id
    }).then(x => {
      this.roles = x;
      return Promise.resolve(true);
    });
  }

  async GetMedical(type_professional, locality_id) {
    if (!type_professional || type_professional === '') return Promise.resolve(false);

    return await this.userAssigned.UserByRoleLocation(locality_id, this.phone_consult == 1 ? 2 : 1, {
      roles: JSON.stringify(this.roles),
      type_of_attention: this.data.management_plan.type_of_attention_id,
    }).then(x => {
      this.assigned_user = x;
      return Promise.resolve(true);
    });
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
        if (this.medical == false) {
          var selectes_assistance_id;
          if (this.assigned_user.length > 0) {
            this.assigned_user.forEach(user => {
              if (user.id === this.form.value.assigned_user_id) {
                selectes_assistance_id = user.assistance_id;
              }
            });
          }
        }
      }
      if (this.data.id) {
        this.AssignedManagementPlanS.Update({
          id: this.data.id,
          type_of_attention_id: this.data.management_plan.type_of_attention_id,
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          user_id: this.form.controls.assigned_user_id.value,
          start_hour: (this.data.management_plan.type_of_attention_id == 17 || this.data.management_plan.type_of_attention_id == 12) ? this.form.controls.start_hour.value : null,
          finish_hour: this.data.management_plan.type_of_attention_id == 12 ? this.form.controls.finish_hour.value : null,
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
          procedure_id: this.procedure_id,
          assistance_id: selectes_assistance_id,
          locality_id: this.user.locality_id,
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          medical: this.isMedical,
          product_id: this.product_id,
          preparation: this.form.controls.preparation.value,
          route_of_administration: this.form.controls.route_of_administration.value,
          blend: this.form.controls.blend.value,
          administration_time: this.form.controls.administration_time.value,
          start_hour: this.form.controls.start_hour.value,
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
    } else {
      this.procedure_id = null;
      this.type_auth = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');

    }
  }

  saveCode1(e): void {
    var localidentify = this.product_gen.find(item => item.manual_price.name == e);

    if (localidentify) {
      this.product_id = localidentify.id;
    } else {
      this.product_id = null;
      this.toastService.warning('', 'Debe seleccionar un Medicamento de la lista');

    }
  }
}
