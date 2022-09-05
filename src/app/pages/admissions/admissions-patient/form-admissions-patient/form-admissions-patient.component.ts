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



@Component({
  selector: 'ngx-form-admissions-patient',
  templateUrl: './form-admissions-patient.component.html',
  styleUrls: ['./form-admissions-patient.component.scss']
})
export class FormAdmissionsPatientComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;
  @Input() admission_id: null;
  @Input() stored: any = null;
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
  public procedures: any[] = [];
  public campus_id;
  public ambit;
  public show_diagnostic: boolean = false;
  public show_inputs: boolean = false;
  public diagnosis_id;
  public showTable;
  public admissions_id: number = 0;
  public saveFromAdmission = null;
  public isOpen = null;
  public regime: any[];
  public route;


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
  ) {
  }

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
    }






    this.form = this.formBuilder.group({
      diagnosis_id: [this.data.diagnosis_id, Validators.compose([Validators.required])],
      admission_route_id: [this.data.admission_route_id, Validators.compose([Validators.required])],
      scope_of_attention_id: [this.data.scope_of_attention_id, Validators.compose([Validators.required])],
      program_id: [this.data.program_id, Validators.compose([Validators.required])],
      flat_id: [this.data.flat_id,],
      pavilion_id: [this.data.pavilion_id,],
      bed_id: [this.data.bed_id,],
      contract_id: [this.data.contract_id, Validators.compose([Validators.required])],
      briefcase_id: [this.data.briefcase_id, Validators.compose([Validators.required])],
      procedure_id: [this.data.procedure_id],
      has_caregiver: [this.data.has_caregiver, Validators.compose([Validators.required])],
      regime_id: [this.data.regime_id, Validators.compose([Validators.required])],
      eps: [this.data.eps],
    });

    this.campus_id = localStorage.getItem('campus');
    this.AdmissionRouteS.GetCollection().then(x => {
      this.admission_route = x;
    });
    this.FlatS.GetFlatByCampus(this.campus_id).then(x => {
      this.flat = x;
    });

    this.companyS.GetCollection({ eps: 1, company_category_id: 1 }).then(x => {
      this.eps = x;
    });
    // this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    //   this.loading = false;
    // });

    this.regimeS.GetCollection().then(x => {
      this.regime = x;
    });

    this.onChanges();
  }


  close() {
    this.dialogRef.close();
  }


  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
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
          campus_id: this.campus_id,
          patient_id: this.user_id
        }).then(x => {
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
        }).catch(x => {
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
            scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
            program_id: this.form.controls.program_id.value,
            flat_id: this.form.controls.flat_id.value,
            regime_id: this.form.controls.regime_id.value,
            pavilion_id: this.form.controls.pavilion_id.value,
            bed_id: this.form.controls.bed_id.value,
            contract_id: this.form.controls.contract_id.value,
            campus_id: this.campus_id,
            patient_id: this.user_id,
          }).then(x => {
            this.toastService.success('', x.message);
            if (this.form.controls.has_caregiver.value != true) {
              this.close();
            } else {
              this.showTable = true
              this.isSubmitted = true;
              this.loading = false;
              this.admission_id = x.data.admissions ? x.data.admissions.id : 0;
              var loca = x.dataAux?.aux ? x.dataAux?.aux.location_unique : null;
              this.messageEvent.emit([false, true, this.admission_id, loca]);
            }

            if (this.saved) {
              this.saved();
            }
            if (this.stored) {
              this.stored();
            }
          }).catch(x => {
            this.toastService.danger(null, "Ya se creo una admisión con el mismo programa");
            this.isSubmitted = false;
            this.loading = false;
          });
        } else {
          this.showTable = true
          this.isSubmitted = true;
          this.loading = false;
          this.messageEvent.emit([true, true]);

        }
      }
    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
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
        }).then(x => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then(x => {
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
      this.toastService.warning('', "Recuerde que antes de agregar acompañantes y/o responsable debe guardar la información de admisión");
      this.showTable = true;
      // this.save();
    } else {
      this.showTable = false;

    }

  }

  onChanges() {

    this.form.get('eps').valueChanges.subscribe(val => {
      if (val === '') {
        this.contract = [];
      } else {
        this.ContractS.GetCollection({ company_id: val }).then(x => {
          this.contract = x;
        });
      }
      this.form.patchValue({
        contract_id: '',
      });
    });



    this.form.get('admission_route_id').valueChanges.subscribe(val => {
      // console.log(val);
      this.route = val;
      if (val === '') {
        this.scope_of_attention = [];
      } else if (val == 2) {
        this.form.controls.has_caregiver.setValue(true);
        this.form.controls.has_caregiver.disable();
        this.form.controls.procedure_id.clearValidators();
        this.form.controls.procedure_id.setErrors(null);


      } else {
        if (val == 1) {
          this.form.controls.procedure_id.setValidators(Validators.compose([Validators.required]));
          this.form.controls.has_caregiver.setValue(false);
          this.form.controls.has_caregiver.enable();
        } else {
          this.form.controls.procedure_id.clearValidators();
          this.form.controls.procedure_id.setErrors(null);
        }

      }
      this.GetScope(val).then();
      this.form.patchValue({
        scope_of_attention_id: '',
      });
    });

    this.form.get('scope_of_attention_id').valueChanges.subscribe(val => {
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

    this.form.get('flat_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
        this.pavilion = [];
      } else {
        this.GetPavilion(val).then();
      }
      this.form.patchValue({
        pavilion_id: '',
      });
    });

    this.form.get('pavilion_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.bed = [];
      } else {
        this.GetBed(val, this.ambit).then();
      }
      this.form.patchValue({
        bed_id: '',
      });
    });

    this.form.get('contract_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.briefcase = [];
      } else {
        this.GetBriefcase(val).then();
      }
      this.form.patchValue({
        briefcase_id: '',
      });
    });

    this.form.get('briefcase_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.procedures = [];
      } else if (this.form.value.admission_route_id == 1) {
        this.Getprocedures(val).then();
      }
      this.form.patchValue({
        procedures: '',
      });
    });

  }

  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }

  async GetScope(admission_route_id, job = false) {
    if (!admission_route_id || admission_route_id === '') return Promise.resolve(false);

    return await this.ScopeOfAttentionS.GetScopeByAdmission(admission_route_id).then(x => {

      if (admission_route_id == 1) {
        this.scope_of_attention = x;
        this.scope_of_attention.shift();
      } else {
        this.scope_of_attention = x;
      }

      return Promise.resolve(true);
    });
  }

  GetProgram(scope_of_attention_id, job = false) {
    if (!scope_of_attention_id || scope_of_attention_id === '') return Promise.resolve(false);
    return this.ProgramS.GetProgramByScope(scope_of_attention_id).then(x => {
      this.program = x;

      return Promise.resolve(true);
    });
  }

  GetPavilion(flat_id, job = false) {
    if (!flat_id || flat_id === '') return Promise.resolve(false);

    return this.PavilionS.GetPavilionByFlat(flat_id).then(x => {

      this.pavilion = x;

      return Promise.resolve(true);
    });
  }

  GetBed(pavilion_id, ambit) {
    if (!pavilion_id || pavilion_id === '') return Promise.resolve(false);
    return this.BedS.GetBedByPavilion(pavilion_id, ambit).then(x => {
      this.bed = x;

      return Promise.resolve(true);
    });
  }

  GetBriefcase(contract_id) {
    if (!contract_id || contract_id === '') return Promise.resolve(false);
    return this.BriefcaseS.GetBriefcaseByContract(contract_id).then(x => {
      this.briefcase = x;

      return Promise.resolve(true);
    });
  }

  Getprocedures(briefcase_id) {
    if (!briefcase_id || briefcase_id === '') return Promise.resolve(false);
    return this.ServiceBriefcaseS.GetProcedureByBriefcase(briefcase_id).then(x => {
      this.procedures = x;

      return Promise.resolve(true);
    });
  }

}
