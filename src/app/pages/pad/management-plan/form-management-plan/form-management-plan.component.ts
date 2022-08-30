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
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-form-management-plan',
  templateUrl: './form-management-plan.component.html',
  styleUrls: ['./form-management-plan.component.scss'],
})
export class FormManagementPlanComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() medical: number = 0;
  @Input() assigned: boolean;
  @Input() edit: any;
  @Input() admissions_id: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public type_of_attention: any[];
  public frequency: any[];
  public specialty: any[];
  public assigned_user: any[] = [];
  public roles;
  public procedure;
  public procedure_id: any;
  public isMedical: boolean = false;
  public phone_consult = false;
  public show = false;
  public showTemp = false;
  public product_gen: any[];
  public militat_hour: Array<any> = [];
  public militat_minut: Array<any> = [];
  public militat_hour_id: string = '00';
  public militat_minut_id: string = '00';
  public product_id;
  public configForm;
  public route_of_administration;
  public localidentify;
  public showUser = true;
  public admissions;
  public tipo_de_atencion;
  public showassigned;
  //   this.status = x;



  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
    private managementPlanS: ManagementPlanService,
    private typeOfAttentionS: TypeOfAttentionService,
    private frequencyS: FrequencyService,
    private specialField: SpecialtyService,
    private userAssigned: UserBusinessService,
    private roleAttentionS: RoleAttentionService,
    private ProductGenS: ProductGenericService,
    private AdministrationRouteS: AdministrationRouteService,
    private serviceBriefcaseS: ServicesBriefcaseService,
    private admissionsS: AdmissionsService,
  ) {
  }

  ngOnInit(): void {
    // console.log(this.user);
    if (!this.data) {
      this.data = {
        id: '',
        type_of_attention_id: '',
        frequency_id: '',
        quantity: '',
        specialty_id: '',
        user_assigned_id: '',
        procedure_id: '',
        preparation: '',
        route_of_administration: '',
        blend: '',
        administration_time: '',
        start_hours: '',
      };
      this.militat_hour_id = '00';
      this.militat_minut_id = '00';
    } else {
      if (this.data.start_hours != null) {
        var spli = this.data.start_hours.split(':');
        this.militat_hour_id = spli[0];
        this.militat_minut_id = spli[1];

      }
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

      if(this.data.type_of_attention_id==17){
        this.show=true;
      }
    }

    for (var i = 0; i < 24; i++) {
      var n = i < 10 ? '0' + i : i + '';
      this.militat_hour.push({
        id: n,
        name: n,
      });
    }

    for (var i = 0; i < 60; i++) {
      var n = i < 10 ? '0' + i : i + '';
      this.militat_minut.push({
        id: n,
        name: n,
      });
    }

    this.AdministrationRouteS.GetCollection().then(x => {
      this.route_of_administration = x;
    });
    this.serviceBriefcaseS.GetByBriefcase({ type: '2',patient:this.user.id }, this.user.admissions[this.user.admissions.length - 1].briefcase_id).then(x => {
      this.product_gen = x;
    });
    this.typeOfAttentionS.GetCollection().then(x => {
      this.type_of_attention = x;
    });
    this.admissionsS.GetByPacient(this.user.id, 1).then(x => {
      this.admissions = x;
    });
    this.frequencyS.GetCollection().then(x => {
      this.frequency = x;
    });
    this.serviceBriefcaseS.GetByBriefcase({ type: '4',patient:this.user.id }, this.user.admissions[this.user.admissions.length - 1].briefcase_id).then(x => {
      this.procedure = x;
    });
    this.specialField.GetCollection({
      type_professional: 1
    }).then(x => {
      this.specialty = x;
    });
    if (this.medical == 0) {
      this.configForm = {
        type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
        frequency_id: [this.data.frequency_id,],
        quantity: [this.data.quantity, Validators.compose([Validators.required])],
        specialty_id: [this.data.specialty_id],
        assigned_user_id: [this.data.assigned_user_id, Validators.compose([Validators.required])],
        procedure_id: ['', Validators.compose([Validators.required])],
        product_id: [this.data.product_id],
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date],
        preparation: [this.data.preparation],
        route_of_administration: [this.data.route_of_administration],
        blend: [this.data.blend],
        observation: [!this.data.observation ? " • TENER EN CUENTA LOS 10 CORRECTOS DE LA ADMINISTRACION DE MEDICAMENTOS \n • TENER EN CUENTA LOS 5 MOMENTOS DEL LAVADO DE MANOS (SEGÚN PROTOCOLO DE LA OMS) \n• ESTABLECER MEDIANTE ENTREVISTA ANTECEDENTES Y SINTOMATOLOGIA ACTUAL DEL PACIENTE EN CASA \n• CONTROLAR SIGNOS VITALES ANTES Y DESPUES DE LA ADMINISTRACION DEL MEDICAMENTO (TENER EN CUENTA TAQUICARDIA, HIPOTENSION O DISTERMIAS PERSISTENTES) \n• VALORACION DIARIA DEL ESTADO DE CONCIENCIA (ESCALA DE GLASGOW) \n• EVALUAR LA INGESTA Y PERDIDA DE LIQUIDOS DEL PACIENTE CON ANAMNESIS (SED PERMANETE, DISMINUCION O AUMENTO DE LA DIURESIS,    CANSANCION Y ALTERACION DEL ESTADO DE CONCIENCIA) \n• REALIZAR SEGUIMIENTO A CULTIVOS Y EXAMENES DE LABORATORIO  \n• INFORMAR SOBRE LOS MEDIOS DE COMUNICACION DEL PACIENTE CON LA IPS O PERSONAL LAS 24 HORAS":this.data.observation],
        administration_time: [this.data.administration_time,],
        start_hours: [this.data.start_hours],
        number_doses: [this.data.number_doses],
        dosage_administer: [this.data.dosage_administer],
        product_gen: [this.data.product_gen],
      }
      this.form = this.formBuilder.group(this.configForm);
      this.onChanges();
    } else {
      this.form = this.formBuilder.group({
        type_of_attention_id: [this.data.type_of_attention_id, Validators.compose([Validators.required])],
        frequency_id: [this.data.frequency_id, Validators.compose([Validators.required])],
        quantity: [this.data.quantity, Validators.compose([Validators.required])],
        specialty_id: [this.data.specialty_id],
        assigned_user_id: [this.data.assigned_user_id],
        observation: [this.data.observation],
        procedure_id: [this.data.procedure_id, Validators.compose([Validators.required])],
        product_id: [this.data.product_id],
        start_date: [this.data.start_date],
        finish_date: [this.data.finish_date],
        preparation: [this.data.preparation],
        administration_time: [this.data.administration_time,],
        route_of_administration: [this.data.route_of_administration],
        blend: [this.data.blend],
        start_hours: [this.data.start_hours],
        number_doses: [this.data.number_doses],
        dosage_administer: [this.data.dosage_administer],
        product_gen: [this.data.product_gen],
      });
      this.isMedical = true;
      this.onChanges2();
    }
    this.form.patchValue({ start_hours: this.militat_hour_id + ":" + this.militat_minut_id });

    // if (this.assigned == true) {

    // }

  }

  ChangeHour($event, id) {
    if (id == 1) {
      this.militat_hour_id = $event;
    } else if (id == 2) {
      this.militat_minut_id = $event;
    }
    this.form.patchValue({ start_hours: this.militat_hour_id + ":" + this.militat_minut_id });
  }

  onChanges2() {

    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {

      if (val == 17) {
        this.show = true;
        this.form.controls.start_date.setValidators(Validators.compose([Validators.required]));
        this.form.controls.preparation.setValidators(Validators.compose([Validators.required]));
        this.form.controls.route_of_administration.setValidators(Validators.compose([Validators.required]));
        this.form.controls.blend.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation.setValidators(Validators.compose([Validators.required]));
        this.form.controls.administration_time.setValidators(Validators.compose([Validators.required]));
        this.form.controls.start_hours.setValidators(Validators.compose([Validators.required]));
        this.form.controls.number_doses.setValidators(Validators.compose([Validators.required]));
        this.form.controls.dosage_administer.setValidators(Validators.compose([Validators.required]));
        this.form.controls.frequency_id.clearValidators();
        this.form.controls.frequency_id.setErrors(null);


      } else if (val == 13 || val == 12) {
        this.showTemp = true;
        this.show = false;
        this.form.controls.start_date.setValidators(null);
        this.form.controls.preparation.setValidators(null);
        this.form.controls.route_of_administration.setValidators(null);
        this.form.controls.blend.setValidators(null);
        this.form.controls.observation.setValidators(null);
        this.form.controls.administration_time.setValidators(null);
        this.form.controls.start_hours.setValidators(null);
        this.form.controls.number_doses.setValidators(null);
        this.form.controls.dosage_administer.setValidators(null);
      }
      else {
        this.show = false;
        this.showTemp = false;

        this.form.controls.start_date.setValidators(null);
        this.form.controls.preparation.setValidators(null);
        this.form.controls.route_of_administration.setValidators(null);
        this.form.controls.blend.setValidators(null);
        this.form.controls.observation.setValidators(null);
        this.form.controls.administration_time.setValidators(null);
        this.form.controls.start_hours.setValidators(null);
        this.form.controls.number_doses.setValidators(null);
        this.form.controls.dosage_administer.setValidators(null);
      }
    });
  }
  onChanges() {

    this.form.get('type_of_attention_id').valueChanges.subscribe(val => {
      this.form.controls.assigned_user_id.setValue(null);
      this.assigned_user = [];
      // console.log(val);
      if (val === '') {
        this.assigned_user = [];
      } else if (val != "2") {
        this.getRoleByAttention(val).then(x => {
          if (x) {
            this.GetMedical(this.user.locality_id).then(x => {
              if (x) {
                this.assigned_user = this.assigned_user.filter(x => x.id !== this.user.id);
                this.showUser = true;
              }
            }).catch(e => {
              this.showUser = false;
              this.form.controls.assigned_user_id.setErrors(null);
              this.toastService.danger(e, 'Error');

            });
          }
        }).catch(e => {
          this.toastService.danger(e, 'Error');
        });
        
        if(this.assigned==false){
          this.showassigned=true;
        }

        if (val == 17) {
          this.show = true;
          this.form.controls.start_date.setValidators(Validators.compose([Validators.required]));
          this.form.controls.preparation.setValidators(Validators.compose([Validators.required]));
          this.form.controls.route_of_administration.setValidators(Validators.compose([Validators.required]));
          this.form.controls.blend.setValidators(Validators.compose([Validators.required]));
          this.form.controls.observation.setValidators(Validators.compose([Validators.required]));
          this.form.controls.administration_time.setValidators(Validators.compose([Validators.required]));
          this.form.controls.start_hours.setValidators(Validators.compose([Validators.required]));
          this.form.controls.number_doses.setValidators(Validators.compose([Validators.required]));
          this.form.controls.dosage_administer.setValidators(Validators.compose([Validators.required]));


        } else if (val == 13 || val == 12) {
          this.showTemp = true;
          this.show = false;
          this.form.controls.start_date.setValidators(null);
          this.form.controls.preparation.setValidators(null);
          this.form.controls.route_of_administration.setValidators(null);
          this.form.controls.blend.setValidators(null);
          this.form.controls.observation.setValidators(null);
          this.form.controls.administration_time.setValidators(null);
          this.form.controls.start_hours.setValidators(null);
          this.form.controls.number_doses.setValidators(null);
          this.form.controls.dosage_administer.setValidators(null);
        }
        else {
          this.show = false;
          this.showTemp = false;

          this.form.controls.start_date.setValidators(null);
          this.form.controls.preparation.setValidators(null);
          this.form.controls.route_of_administration.setValidators(null);
          this.form.controls.blend.setValidators(null);
          this.form.controls.observation.setValidators(null);
          this.form.controls.administration_time.setValidators(null);
          this.form.controls.start_hours.setValidators(null);
          this.form.controls.number_doses.setValidators(null);
          this.form.controls.dosage_administer.setValidators(null);
        }
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
    this.tipo_de_atencion = type_of_attention_id;
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
      type_of_attention: this.tipo_de_atencion,
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
        this.toastService.warning(e, 'AVISO');
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
      if (this.medical == 0 && this.assigned_user) {
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
          edit: this.edit,
          type_of_attention_id: this.form.controls.type_of_attention_id.value,
          frequency_id: this.form.controls.frequency_id.value,
          quantity: this.form.controls.quantity.value,
          specialty_id: this.form.controls.specialty_id.value,
          assigned_user_id: this.form.controls.assigned_user_id.value,
          admissions_id: this.admissions_id,
          procedure_id: this.procedure_id,
          product_id: this.product_id,
          assistance_id: selectes_assistance_id,
          locality_id: this.user.locality_id,
          phone_consult: this.phone_consult,
          start_date: this.form.controls.start_date.value,
          finish_date: this.form.controls.finish_date.value,
          preparation: this.form.controls.preparation.value,
          route_of_administration: this.form.controls.route_of_administration.value,
          blend: this.form.controls.blend.value,
          administration_time: this.form.controls.administration_time.value,
          start_hours: this.form.controls.start_hours.value,
          observation: this.form.controls.observation.value,
          number_doses: this.form.controls.number_doses.value,
          dosage_administer: this.form.controls.dosage_administer.value,
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
      } else if (this.form.controls.assigned_user_id.value == null) {
        this.managementPlanS.Save({
          isnewrequest: 1,
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
          product_id: this.product_id,
          preparation: this.form.controls.preparation.value,
          route_of_administration: this.form.controls.route_of_administration.value,
          blend: this.form.controls.blend.value,
          administration_time: this.form.controls.administration_time.value,
          start_hours: this.form.controls.start_hours.value,
          observation: this.form.controls.observation.value,
          number_doses: this.form.controls.number_doses.value,
          dosage_administer: this.form.controls.dosage_administer.value,

        }).then(x => {
          this.toastService.success('', x.message);
          if (x['message_error']) {
            this.toastService.warning(x['message_error'], 'Error');
          }
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
          product_id: this.product_id,
          preparation: this.form.controls.preparation.value,
          route_of_administration: this.form.controls.route_of_administration.value,
          blend: this.form.controls.blend.value,
          administration_time: this.form.controls.administration_time.value,
          start_hours: this.form.controls.start_hours.value,
          observation: this.form.controls.observation.value,
          number_doses: this.form.controls.number_doses.value,
          dosage_administer: this.form.controls.dosage_administer.value,

        }).then(x => {
          this.toastService.success('', x.message);
          if (x['message_error']) {
            this.toastService.warning(x['message_error'], 'Error');
          }
          this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false
        });
      }
    }
  }

  getConcentration(value: string) {
    var rr = 0;
    if (value.includes('/')) {
      var spl = value.split('/');
      var num = spl[0];
      var den = +spl[1];
      rr = this.numWithPlus(num) / den;

    } else {
      rr = this.numWithPlus(value);
    }
    return rr;
  }

  numWithPlus(num: string): number {
    if (num.includes('(') || num.includes(')')) {
      num = num.slice(0, 1);
      num = num.slice(num.length - 1, num.length);
      if (num.includes('+')) {
        var spl2 = num.split('+');
        var r = 0;
        spl2.forEach(element => {
          r += +element;
        });
        return r;
      }
    } else {
      if (num.includes('+')) {
        var spl2 = num.split('+');
        var r = 0;
        spl2.forEach(element => {
          r += +element;
        });
        return r;
      } else {
        return +num;
      }
    }
  }

  saveCode(e): void {
    var localidentify = this.procedure.find(item => item.manual_price.name == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.controls.procedure_id.setErrors(null);

    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
    }
  }

  saveCode1(e): void {
    this.localidentify = this.product_gen.find(item => item.manual_price.name == e);

    if (this.localidentify) {
      this.product_id = this.localidentify.id;
      this.form.controls.product_gen.setErrors(null);
    } else {
      this.product_id = null;
      this.toastService.warning('', 'Debe seleccionar un Medicamento de la lista');
      this.form.controls.product_gen.setErrors({ 'incorrect': true });

    }
  }
}
