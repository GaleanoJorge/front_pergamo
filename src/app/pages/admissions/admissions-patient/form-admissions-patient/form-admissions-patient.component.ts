import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { AdmissionRouteService } from '../../../../business-controller/admission-route.service';
import { ScopeOfAttentionService } from '../../../../business-controller/scope-of-attention.service';
import { ProgramService } from '../../../../business-controller/program.service';
import { PavilionService } from '../../../../business-controller/pavilion.service';
import { FlatService } from '../../../../business-controller/flat.service';
import { BedService } from '../../../../business-controller/bed.service';
import { ContractService } from '../../../../business-controller/contract.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { BriefcaseService } from '../../../../business-controller/briefcase.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { TypeBriefcaseService } from '../../../../business-controller/type-briefcase.service';
import { CopayCategoryComponent } from '../../../scheduling/copay_category/copay-category.component';
import { CopayParametersService } from '../../../../business-controller/copay-parameters.service';
import { CurrencyPipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ngx-form-admissions-patient',
  templateUrl: './form-admissions-patient.component.html',
  styleUrls: ['./form-admissions-patient.component.scss'],
})
export class FormAdmissionsPatientComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;
  @Input() ambolatory: boolean = false;
  @Input() admission_id: null;
  @Input() stored: any = null;
  @Input() ambit: any = null;
  @Input() campus_id: any = null;
  @Input() medical_diary: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public savedUser: any = null;
  public loading: boolean = false;
  public coverage: any[];
  public admission_route: any[];
  public scope_of_attention: any[];
  public program: any[];
  public pavilion: any[];
  public flat: any[];
  public bed: any[];
  public contract: any[];
  public eps: any[];
  public diagnosis: any[] = [];
  public briefcase: any[] = [];
  public categories: any[] = [];
  public procedures: any[] = [];
  public copay_value;
  public show_diagnostic: boolean = false;
  public show_inputs: boolean = false;
  public show_auth_inputs: boolean = false;
  public diagnosis_id;
  public showTable;
  public admissions_id: number = 0;
  public saveFromAdmission = null;
  public isOpen = null;
  public regime: any[];
  public route;
  public show_cats: boolean = false;
  readonly MAX_VALUE_FILE_SIZE: Number = 1000000;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private AdmissionsS: AdmissionsService,
    private AdmissionRouteS: AdmissionRouteService,
    private ScopeOfAttentionS: ScopeOfAttentionService,
    private ProgramS: ProgramService,
    private PavilionS: PavilionService,
    private FlatS: FlatService,
    private BedS: BedService,
    private DiagnosisS: DiagnosisService,
    private ContractS: ContractService,
    private toastService: NbToastrService,
    private BriefcaseS: BriefcaseService,
    private ServiceBriefcaseS: ServicesBriefcaseService,
    private companyS: CompanyService,
    private regimeS: TypeBriefcaseService,
    private copayCategoryS: CopayParametersService,
    private currency: CurrencyPipe
  ) {}

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        admission_route_id: '',
        scope_of_attention_id: '',
        program_id: '',
        flat_id: '',
        pavilion_id: '',
        bed_id: '',
        contract_id: '',
        regime_id: '',
        briefcase_id: '',
        procedure_id: '',
        has_caregiver: false,
      };
    } else {
      if (this.data.pavilion_id) {
        this.data.scope_of_attention_id = 1;
      }
    }

    this.form = this.formBuilder.group({
      diagnosis_id: [
        this.data.diagnosis_id,
        Validators.compose([Validators.required]),
      ],
      admission_route_id: [
        {
          value:
            this.data.admission_route_id == undefined
              ? ''
              : this.data.admission_route_id,
          disabled: this.ambolatory,
        },
        Validators.compose([Validators.required]),
      ],
      scope_of_attention_id: [
        this.data.scope_of_attention_id,
        Validators.compose([Validators.required]),
      ],
      program_id: [
        this.data.program_id,
        Validators.compose([Validators.required]),
      ],
      flat_id: [
        {
          value: this.data.flat_id ? this.data.flat_id : '',
          disabled: this.ambolatory,
        },
      ],
      pavilion_id: [
        { value: this.data.pavilion_id, disabled: this.ambolatory },
      ],
      bed_id: [{ value: this.ambolatory ? this.data.medical_diary.office_id : this.data.bed_id, disabled: this.ambolatory }],
      contract_id: [
        this.data.contract_id,
        Validators.compose([Validators.required]),
      ],
      briefcase_id: [
        this.data.briefcase_id,
        Validators.compose([Validators.required]),
      ],
      procedure_id: [this.data.procedure_id],
      auth_number: [this.data.auth_number],
      file_auth: [this.data.file_auth],
      has_caregiver: [this.data.has_caregiver, Validators.compose([Validators.required])],
      regime_id: [this.data.regime_id, Validators.compose([Validators.required])],
      category: [''],
      copay: [{value: '', disabled: true}],
      eps: [this.data.eps],
    });
    if (this.campus_id == null) {
      this.campus_id = localStorage.getItem('campus');
    }
    this.AdmissionRouteS.GetCollection().then(x => {
      this.admission_route = x;
    });
    this.FlatS.GetFlatByCampus(this.campus_id, {
      bed_or_office: 1,
    }).then((x) => {
      this.flat = x;
    });

    this.companyS
      .GetCollection({ eps: 1, company_category_id: 1 })
      .then((x) => {
        this.eps = x;
      });
    // this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    //   this.loading = false;
    // });

    this.regimeS.GetCollection().then((x) => {
      this.regime = x;
    });

    if (this.data.eps) {
      this.diagnosis_id = this.data.diagnosis;
      if (!this.data.diagnosis_id) {
        this.DiagnosisS.GetCollection({
          id: this.data.diagnosis,
        }).then((x) => {
          this.diagnosis = x;
          this.form.patchValue({
            diagnosis_id: this.diagnosis[0].name,
          });
        });
      }
      this.epsChanged(this.data.eps);
      this.admissionRouteChanged(this.data.admission_route_id);
      this.ShowDiagnostic(this.data.admission_route_id);
      if (this.data.flat_id) {
        this.GetPavilion(this.data.flat_id).then();
      }
      if (this.data.pavilion_id) {
        this.GetBed(this.data.pavilion_id, this.data.scope_of_attention_id).then();
      }
    }

    this.onChanges();
    if (this.ambolatory) {
      this.form.get('admission_route_id').setValue(1);
      this.form
        .get('flat_id')
        .setValue(this.data.medical_diary.office.pavilion.flat_id);
      this.form.get('eps').setValue(this.data.eps_id);
      this.ShowDiagnostic(1);
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id && !this.ambolatory) {
        this.AdmissionsS.Update({
          diagnosis_id: this.diagnosis_id,
          id: this.data.id,
          admission_route_id: this.form.controls.admission_route_id.value,
          scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
          program_id: this.form.controls.program_id.value,
          flat_id: this.form.controls.flat_id.value,
          pavilion_id: this.form.controls.pavilion_id.value,
          bed_id: this.form.controls.bed_id.value,
          contract_id: this.form.controls.contract_id.value,
          briefcase_id: this.form.controls.briefcase_id.value,
          regime_id: this.form.controls.regime_id.value,
          procedure_id: this.form.controls.procedure_id.value,
          auth_number: this.form.controls.procedure_id.value,
          file_auth: this.form.controls.procedure_id.value,
          campus_id: this.campus_id,
          patient_id: this.user_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.saved = true;
            if (this.form.controls.has_caregiver.value != true) {
              this.close();
            } else {
              this.showTable = true;
            }
            this.close();
            if (this.saved) {
              this.saved();
            }
            if (this.stored) {
              this.stored();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        if (this.admissions_id == 0) {
          this.AdmissionsS.Save({
            admission_id: this.admission_id,
            briefcase_id: this.form.controls.briefcase_id.value,
            diagnosis_id: this.diagnosis_id,
            procedure_id: this.form.controls.procedure_id.value,
            admission_route_id: this.form.controls.admission_route_id.value,
            scope_of_attention_id:
              this.form.controls.scope_of_attention_id.value,
            program_id: this.form.controls.program_id.value,
            flat_id: this.form.controls.flat_id.value,
            regime_id: this.form.controls.regime_id.value,
            pavilion_id: this.form.controls.pavilion_id.value,
            bed_id: this.form.controls.bed_id.value,
            contract_id: this.form.controls.contract_id.value,
            auth_number: this.form.controls.auth_number.value,
            file_auth: this.form.value.file_auth,
            campus_id: this.campus_id,
            patient_id: this.user_id,
            ambulatory_data: this.ambolatory ? this.data.id : null,
            copay_id: this.form.controls.category.value,
            copay_value: this.ambolatory ? this.form.value.copay : null,
          })
            .then((x) => {
              this.toastService.success('', x.message);
              if (this.form.controls.has_caregiver.value != true) {
                this.close();
              } else {
                this.showTable = true;
                this.isSubmitted = true;
                this.loading = false;
                this.admission_id = x.data.admissions
                  ? x.data.admissions.id
                  : 0;
                var loca = x.dataAux?.aux
                  ? x.dataAux?.aux.location_unique
                  : null;
                this.messageEvent.emit([false, true, this.admission_id, loca]);
              }

              if (this.saved) {
                this.saved();
              }
              if (this.stored) {
                this.stored();
              }
            })
            .catch((x) => {
              this.toastService.danger(
                null,
                'Ya se creó una admisión con el mismo programa'
              );
              this.isSubmitted = false;
              this.loading = false;
            });
        } else {
          this.showTable = true;
          this.isSubmitted = true;
          this.loading = false;
          this.messageEvent.emit([true, true]);
        }
      }
    } else {
      this.toastService.warning('', 'Debe diligenciar los campos obligatorios');
    }
  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.DiagnosisS.GetCollection({
          search: $event,
        }).then((x) => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then((x) => {
          this.diagnosis = x;
        });
      }
    }
  }
  // async save() {

  //   this.isSubmitted = true;
  //   this.showTable = false;
  //   if (!this.form.invalid) {
  //     this.loading = true;

  //     if (this.data.id) {
  //       await this.AdmissionsS.Update({
  //         diagnosis_id: this.diagnosis_id,
  //         id: this.data.id,
  //         admission_route_id: this.form.controls.admission_route_id.value,
  //         scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
  //         program_id: this.form.controls.program_id.value,
  //         flat_id: this.form.controls.flat_id.value,
  //         pavilion_id: this.form.controls.pavilion_id.value,
  //         bed_id: this.form.controls.bed_id.value,
  //         contract_id: this.form.controls.contract_id.value,
  //         campus_id: this.campus_id,
  //         user_id: this.user_id
  //       }).then(x => {
  //         this.toastService.success('', x.message);
  //         if (this.form.controls.has_caregiver.value != true) {
  //           this.close();
  //         } else {
  //           this.showTable = true;
  //         }
  //         if (this.saved) {
  //           this.saved();
  //         }
  //       }).catch(x => {
  //         this.isSubmitted = false;
  //         this.loading = false;
  //       });
  //     } else {
  //       await this.AdmissionsS.Save({
  //         briefcase_id: this.form.controls.briefcase_id.value,
  //         diagnosis_id: this.diagnosis_id,
  //         admission_route_id: this.form.controls.admission_route_id.value,
  //         scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
  //         program_id: this.form.controls.program_id.value,
  //         flat_id: this.form.controls.flat_id.value,
  //         pavilion_id: this.form.controls.pavilion_id.value,
  //         bed_id: this.form.controls.bed_id.value,
  //         contract_id: this.form.controls.contract_id.value,
  //         campus_id: this.campus_id,
  //         user_id: this.user_id,
  //       }).then(x => {
  //         this.toastService.success('', x.message);
  //         this.admission_id = x.data.admissions ? x.data.admissions.id : 0;
  //         if (this.form.controls.has_caregiver.value != true) {
  //           this.close();
  //         } else {
  //           this.showTable = true
  //           this.isSubmitted = true;
  //           this.loading = false;
  //         }
  //         if (this.saved) {
  //           this.saved();
  //         }
  //       }).catch(x => {
  //         // if (this.form.controls.has_caregiver.value == true) {
  //         //   this.isSubmitted = true;
  //         //   this.loading = true;
  //         // } else {
  //         //   this.isSubmitted = false;
  //         //   this.loading = false;
  //         // }
  //         this.isSubmitted = true;
  //         this.loading = false;
  //       });
  //       this.saveFromAdmission = null;
  //     }

  //   }
  // }
  async ShowDiagnostic(e) {
    if (e == 1) {
      this.show_diagnostic = true;
      this.show_inputs = true;
    } else {
      this.show_inputs = false;
      this.show_diagnostic = false;
    }
  }

  showCaregiver() {
    if (this.form.controls.has_caregiver.value == true) {
      this.toastService.warning(
        '',
        'Recuerde que antes de agregar acompañantes y/o responsable debe guardar la información de admisión'
      );
      this.showTable = true;
      // this.save();
    } else {
      this.showTable = false;
    }
  }

  onChanges() {
    this.form.get('eps').valueChanges.subscribe((val) => {
      this.epsChanged(val);
    });

    this.form.get('admission_route_id').valueChanges.subscribe((val) => {
      this.admissionRouteChanged(val);
    });

    this.form.get('scope_of_attention_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.program = [];
      } else {
        this.ambit = val;
        this.GetProgram(val).then();
      }
      this.form.patchValue({
        program_id: '',
      });
    });

    this.form.get('flat_id').valueChanges.subscribe((val) => {
      // console.log(val);
      if (val === '') {
        this.pavilion = [];
      } else {
        this.GetPavilion(val).then();
      }
      if (this.ambolatory) {
        this.form
          .get('pavilion_id')
          .setValue(this.data.medical_diary.office.pavilion_id);

        // this.form.patchValue({
        //   pavilion_id: this.data.medical_diary.office.pavilion_id,
        // });
      } else {
        this.form.patchValue({
          pavilion_id: '',
        });
      }
    });

    this.form.get('pavilion_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.bed = [];
      } else {
        this.GetBed(val, this.ambit).then();
      }
      if (this.ambolatory) {
        // this.form.get('bed_id').setValue(this.data.medical_diary.office_id);
        // this.form.patchValue({
        //   bed_id: this.data.medical_diary.office_id,
        // });
      } else {
        this.form.patchValue({
          bed_id: '',
        });
      }
    });

    this.form.get('contract_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.briefcase = [];
      } else {
        this.GetBriefcase(val).then();
        // if (this.ambolatory) {
        //   this.GetCategories(val).then();
        // }
      }
      // if (val == (this.data.contract_id == '' ? null : this.data.contract_id) && this.ambolatory) {
      //   this.form.patchValue({ briefcase_id: this.data.briefcase_id });
      // } else {
      //   this.form.patchValue({
      //     briefcase_id: '',
      //   });
      // }
      if (
        val != (this.data.contract_id == '' ? null : this.data.contract_id) &&
        !this.ambolatory
      ) {
        this.form.patchValue({
          briefcase_id: '',
        });
      }
    });

    this.form.get('briefcase_id').valueChanges.subscribe((val) => {
      if (val === '') {
        this.procedures = [];
      } else if (this.form.value.admission_route_id == 1) {
        this.Getprocedures(val).then();
      } else {
        this.Getprocedures(val).then();
      }
      if (
        val == (this.data.briefcase_id == '' ? null : this.data.briefcase_id)
      ) {
        // this.form
        //   .get('procedure_id')
        //   .patchValue(this.data.services_briefcase.manual_price.procedure_id);
        // this.form.patchValue({
        //   procedures: this.data.medical_diary.procedure_id,
        // });
      } else {
        this.form.patchValue({
          procedures: '',
        });
      }
    });

    this.form.get('procedure_id').valueChanges.subscribe((val) => {
      // var aux = this.categories.find((item) => item.id == val);
      if (val != '' && this.ambolatory) {
        this.getCategories(val);

        this.form
        .get('category')
        .setValue(this.data.copay_id);

        // this.form
        // .get('copay')
        // .setValue(this.data.copay_value);
      }
    });


  }

  async getCategories(procedure_id){
    this.toastService.info('','Calculando posible tarifa')
    await this.copayCategoryS.GetCollection({
      procedure_id: procedure_id,
      status_id: 1,
    }).then((x) => {
      if(x.length > 0){
        this.show_cats = true;
        this.categories = x;
      } else {
        this.show_cats = false;
      }
    });

    this.form.get('category').valueChanges.subscribe((val) => {
      if(val != ''){
        var localCat  = this.categories.find(item => item.id == val);
        if(localCat.payment_type == 2){
          
          var localproc = this.procedures.find(
            (item) => item.manual_price.procedure.id == this.form.value.procedure_id
          );
          if(localproc){
            this.copay_value = localproc.value*localCat.value;
            this.form.patchValue({
              copay: this.currency.transform(this.copay_value),
            })
          }
        }else {
          this.copay_value = localCat.value;
          this.form.patchValue({
            copay: this.currency.transform(this.copay_value),
          })
        }
      }
    });

    this.form
    .get('category')
    .setValue(this.data.copay_id);
  }

  admissionRouteChanged(val) {
    // console.log(val);
    this.route = val;
    if (val === '') {
      this.scope_of_attention = [];
    } else if (val == 2) {
      this.form.controls.has_caregiver.setValue(true);
      this.form.controls.has_caregiver.disable();
      this.form.controls.procedure_id.clearValidators();
      this.form.controls.procedure_id.setErrors(null);
      this.form.controls.flat_id.setValidators([]);
      this.form.controls.flat_id.updateValueAndValidity();
      this.form.controls.pavilion_id.setValidators([]);
      this.form.controls.pavilion_id.updateValueAndValidity();
      this.form.controls.bed_id.setValidators([]);
      this.form.controls.bed_id.updateValueAndValidity();


    } else {
      if (val == 1) {
        this.show_auth_inputs = true;
        this.form.controls.procedure_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.flat_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.pavilion_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.auth_number.setValidators(Validators.compose([Validators.required]));
        // this.form.controls.file_auth.setValidators(Validators.compose([Validators.required]));
        this.form.controls.bed_id.setValidators(Validators.compose([Validators.required]));
        this.form.controls.has_caregiver.setValue(false);
        this.form.controls.has_caregiver.enable();
      } else {
        this.show_auth_inputs = false;
        this.form.controls.procedure_id.clearValidators();
        this.form.controls.procedure_id.setErrors(null);
        this.form.controls.flat_id.setValidators([]);
        this.form.controls.flat_id.updateValueAndValidity();
        this.form.controls.pavilion_id.setValidators([]);
        this.form.controls.pavilion_id.updateValueAndValidity();
        this.form.controls.bed_id.setValidators([]);
        this.form.controls.bed_id.updateValueAndValidity();
        this.form.controls.auth_number.setValidators([]);
        this.form.controls.auth_number.updateValueAndValidity();
        this.form.controls.file_auth.setValidators([]);
        this.form.controls.file_auth.updateValueAndValidity();
      }
    }
    this.GetScope(val).then();
    if (!this.ambolatory) {
      this.form.patchValue({
        scope_of_attention_id: '',
      });
    }
  }

  epsChanged(val) {
    if (val === '') {
      this.contract = [];
    } else {
      this.ContractS.GetCollection({ company_id: val }).then((x) => {
        this.contract = x;
        if (this.ambolatory) {
          if (val == this.data.eps_id) {
            this.form.get('contract_id').setValue(this.data.contract_id);
          }
        }
      });
    }
    if (!this.ambolatory) {
      this.form.patchValue({
        contract_id: '',
      });
    }
  }

  saveCode(e): void {
    var localidentify = this.diagnosis.find((item) => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning(
        '',
        'Debe seleccionar un diagnostico de la lista'
      );
      this.form.controls.diagnosis_id.setErrors({ incorrect: true });
    }
  }

  async GetScope(admission_route_id, job = false) {
    if (!admission_route_id || admission_route_id === '')
      return Promise.resolve(false);

    this.form.get('scope_of_attention_id').setValue(2);
    return await this.ScopeOfAttentionS.GetScopeByAdmission(
      admission_route_id
    ).then((x) => {
      this.scope_of_attention = x;
      if (admission_route_id == 1 && !this.ambolatory) {
        this.scope_of_attention.shift();
      }

      return Promise.resolve(true);
    });
  }

  GetProgram(scope_of_attention_id, job = false) {
    if (!scope_of_attention_id || scope_of_attention_id === '')
      return Promise.resolve(false);
    return this.ProgramS.GetProgramByScope(scope_of_attention_id).then((x) => {
      this.program = x;

      return Promise.resolve(true);
    });
  }

  GetPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);

    return this.PavilionS.GetPavilionByFlat(flat_id, {
      bed_or_office: 1,
    }).then((x) => {
      this.pavilion = x;

      return Promise.resolve(true);
    });
  }

  GetBed(pavilion_id, ambit) {
    if(this.ambolatory){
      return this.BedS.GetBedByPavilion(pavilion_id, ambit, proc, this.ambolatory ? { office: this.data.medical_diary.office_id, patient_id: this.user_id, } : {
        patient_id: this.user_id,
      }).then(x => {
        if (x.length > 0) {
          this.bed = x;
          this.form.patchValue({
            bed_id: this.data.medical_diary.office_id
          });
        } else {
          this.toastService.warning('', 'No se encontraron camas disponibles para la localización y el procedimiento seleccionado')
        }
  
        return Promise.resolve(true);
      });
    }
    if ((!pavilion_id || pavilion_id === '') || (!this.data.eps ? (!this.form.controls.procedure_id.value || this.form.controls.procedure_id.value === '') : false) || (!ambit || ambit === '')) return Promise.resolve(false);
    var proc =  this.data.eps ? 0 : this.procedures.find(item => item.id == this.form.controls.procedure_id.value).manual_price.procedure_id;
    return this.BedS.GetBedByPavilion(pavilion_id, ambit, proc, this.ambolatory ? { office: this.data.medical_diary.office_id, patient_id: this.user_id, } : {
      patient_id: this.user_id,
    }).then(x => {
      if (x.length > 0) {
        this.bed = x;
      } else {
        this.toastService.warning('', 'No se encontraron camas disponibles para la localización y el procedimiento seleccionado')
      }

      return Promise.resolve(true);
    });
  }

  async GetBriefcase(contract_id) {
    if (!contract_id || contract_id === '') return Promise.resolve(false);
    return await this.BriefcaseS.GetBriefcaseByContract(contract_id).then(
      (x) => {
        this.briefcase = x;
        if (
          contract_id ==
            (this.data.contract_id == '' ? null : this.data.contract_id) &&
          this.ambolatory
        ) {
          this.form.get('briefcase_id').patchValue(this.data.briefcase_id);
        }
        return Promise.resolve(true);
      }
    );
  }

  async GetCategories(contract_id) {
    if (!contract_id || contract_id === '') return Promise.resolve(false);
    return await this.copayCategoryS
      .GetCollection({
        contract_id: contract_id,
        status_id: 1,
      })
      .then((x) => {
        this.categories = x;
        if (this.categories.length == 0) {
          this.toastService.danger(
            '',
            'Tipo de contrato sin categorias asociadas'
          );
          this.show_cats = false;
        } else {
          this.show_cats = true;
        }
        return Promise.resolve(true);
      });
  }

  Getprocedures(briefcase_id) {
    if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
    return this.ServiceBriefcaseS.GetProcedureByBriefcase(briefcase_id, {
      cups_selected_id: this.ambolatory
        ? this.data.services_briefcase.manual_price.procedure_id
        : null,
    }).then((x) => {
      this.procedures = x;
      if (
        briefcase_id ==
          (this.data.briefcase_id == '' ? null : this.data.briefcase_id) &&
        this.ambolatory
      ) {
        // this.form
        //   .get('procedure_id')
        //   .patchValue(this.data.services_briefcase.id);
      }
      return Promise.resolve(true);
    });
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          file_auth: file,
        });
        break;
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

}
