import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { GenderBusinessService } from '../../../../business-controller/gender-business.service';
import { IdentificationTypeBusinessService } from '../../../../business-controller/identification-type-business.service';
import { ProcedureService } from '../../../../business-controller/procedure.service';
import { CompanyService } from '../../../../business-controller/company.service';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { ProvidersOfHealthServicesService } from '../../../../business-controller/providers-of-health-services.service';
import { StayTypeService } from '../../../../business-controller/stay-type.service';
import { ReferenceStatusService } from '../../../../business-controller/reference-status.service';
import { CampusService } from '../../../../business-controller/campus.service';
import { TypeBriefcaseService } from '../../../../business-controller/type-briefcase.service';
import { TechnologicalMediumService } from '../../../../business-controller/technological-medium.service';
import { AdmissionRouteService } from '../../../../business-controller/admission-route.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { ProgramService } from '../../../../business-controller/program.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { ReferenceService } from '../../../../business-controller/reference.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { DeniedReasonService } from '../../../../business-controller/denied-reason.service';




@Component({
  selector: 'ngx-form-reference',
  templateUrl: './form-reference.component.html',
  styleUrls: ['./form-reference.component.scss'],
})
export class FormReferenceComponent implements OnInit {
  @Input() title: string;
  @Input() route: number;
  @Input() data: any = null;

  public form: FormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public new_patient: any = null;
  public new_admission: any = null;
  public previewFile = null;
  public user;
  public messageError = null;
  public diagnosis_id;
  public patient_id;
  public procedure_id;

  public firstname_disabled = false;
  public identification_type_id_disabled = false;
  public lastname_disabled = false;
  public identification_disabled = false;
  public age_disabled = false;
  public gender_id_disabled = false;
  public re_input_disabled = false;

  public re_input = [
    { id: true, name: 'Si' },
    { id: false, name: 'NO' },
  ];

  public patient = null;
  public gender = null;
  public identification_type = null;
  public procedure = null;
  public company = null;
  public diagnosis = null;
  public providers_of_health_services = null;
  public stay_type = null;
  public denied_type = null;
  public denied_reason = null;
  public reference_status = null;
  public campus = null;
  public regime = null;
  public technological_medium = null;
  public admission_route = null;
  public specialty = null;
  public program = null;
  public tutor = null;

  public selectedOptions: any[] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private authService: AuthService,
    private DeniedReasonS: DeniedReasonService,
    private DiagnosisS: DiagnosisService,
    private AdmissionsS: AdmissionsService,
    private ReferenceS: ReferenceService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.GetUser();

    if (!this.data) {
      this.data = {
        firstname: '',
        lastname: '',
        identification: '',
        re_input: '',
        age: '',
        intention: '',
        patient_id: '',
        gender_id: '',
        identification_type_id: '',
        procedure_id: '',
        company_id: '',
        diagnosis_id: '',
        providers_of_health_services_id: '',
        stay_type_id: '',
        reference_status_id: '',
        request_campus_id: '',
        request_regime_id: '',
        request_technological_medium_id: '',
        request_admission_route_id: '',
        request_specialty_id: '',
        request_program_id: '',
        request_observation: '',
        acceptance_campus_id: '',
        acceptance_regime_id: '',
        acceptance_technological_medium_id: '',
        acceptance_admission_route_id: '',
        acceptance_specialty_id: '',
        acceptance_program_id: '',
        tutor_id: '',
        acceptance_observation: '',
        denied_technological_medium_id: '',
        denied_admission_route_id: '',
        denied_specialty_id: '',
        denied_type_id: '',
        denied_reason_id: '',
        denied_program_id: '',
        denied_observation: '',
      };
    } else {
      this.data.re_input = this.data.re_input == 0 ? false : true;
      this.DiagnosisS.GetCollection({
        id: this.data.diagnosis_id,
      }).then(x => {
        this.diagnosis = x;
        this.diagnosis_id = this.diagnosis[0].id;
        this.form.patchValue({
          diagnosis_id: this.diagnosis[0].name,
        });
      });
      this.procedure_id = this.data.procedure_id;
      this.diagnosis_id = this.data.diagnosis_id;
    }

    this.ReferenceS.getReferenceData({ eps: 1, company_category_id: 1 }).then(x => {
      this.patient = x['patient'];
      if (this.data.patient_id) {
        this.savePatient(this.data.identification);
      }
      this.gender = x['gender'];
      this.identification_type = x['identification_type'];
      this.procedure = x['procedure'];
      if (this.data.id) {
        var localidentify = this.procedure.find(item => item.id == this.data.procedure_id);
        this.diagnosis_id = localidentify.id;
        this.form.patchValue({
          procedure_id: localidentify.name,
        });
      }
      this.company = x['company'];
      this.providers_of_health_services = x['providers_of_health_services'];
      this.stay_type = x['stay_type'];
      this.reference_status = x['reference_status'];
      this.campus = x['campus'];
      this.regime = x['regime'];
      this.technological_medium = x['technological_medium'];
      this.admission_route = x['admission_route'];
      this.specialty = x['specialty'];
      this.program = x['program'];
      this.denied_type = x['role_type'];
    });


    this.form = this.formBuilder.group({
      firstname: [this.data.firstname, []],
      lastname: [this.data.lastname, []],
      identification: [this.data.identification, []],
      re_input: [this.data.re_input, []],
      age: [this.data.age, []],
      intention: [this.data.intention, []],
      patient_id: [this.data.patient_id, []],
      gender_id: [this.data.gender_id, []],
      identification_type_id: [this.data.identification_type_id, []],
      procedure_id: [this.data.procedure_id, []],
      company_id: [this.data.company_id, []],
      diagnosis_id: [this.data.diagnosis_id, []],
      providers_of_health_services_id: [this.data.providers_of_health_services_id, []],
      stay_type_id: [this.data.stay_type_id, []],
      request_campus_id: [this.data.request_campus_id, []],
      request_regime_id: [this.data.request_regime_id, []],
      request_technological_medium_id: [this.data.request_technological_medium_id, []],
      request_admission_route_id: [this.data.request_admission_route_id, []],
      request_specialty_id: [this.data.request_specialty_id, []],
      request_program_id: [this.data.request_program_id, []],
      request_observation: [this.data.request_observation, []],
      acceptance_campus_id: [this.data.request_campus_id, []],
      acceptance_regime_id: [this.data.request_regime_id, []],
      acceptance_technological_medium_id: [this.data.request_technological_medium_id, []],
      acceptance_admission_route_id: [this.data.request_admission_route_id, []],
      acceptance_specialty_id: [this.data.request_specialty_id, []],
      acceptance_program_id: [this.data.request_program_id, []],
      tutor_id: [this.data.tutor_id, []],
      acceptance_observation: [this.data.acceptance_observation, []],
      denied_technological_medium_id: [this.data.request_technological_medium_id, []],
      denied_admission_route_id: [this.data.request_admission_route_id, []],
      denied_specialty_id: [this.data.request_specialty_id, []],
      denied_type_id: [this.data.denied_type_id, []],
      denied_reason_id: [this.data.denied_reason_id, []],
      denied_program_id: [this.data.request_program_id, []],
      denied_observation: [this.data.denied_observation, []],
    });

    if (this.route == 1) {
      this.form.controls.firstname.setValidators(Validators.compose([Validators.required]));
      this.form.controls.lastname.setValidators(Validators.compose([Validators.required]));
      this.form.controls.identification.setValidators(Validators.compose([Validators.required]));
      this.form.controls.re_input.setValidators(Validators.compose([Validators.required]));
      this.form.controls.age.setValidators(Validators.compose([Validators.required]));
      this.form.controls.intention.setValidators(Validators.compose([Validators.required]));
      this.form.controls.gender_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.identification_type_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.procedure_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.company_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.diagnosis_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.providers_of_health_services_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.stay_type_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_campus_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_regime_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_technological_medium_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_admission_route_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_specialty_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_program_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.request_observation.setValidators(Validators.compose([Validators.required]));

      this.form.controls.acceptance_campus_id.setErrors(null);
      this.form.controls.acceptance_regime_id.setErrors(null);
      this.form.controls.acceptance_technological_medium_id.setErrors(null);
      this.form.controls.acceptance_admission_route_id.setErrors(null);
      this.form.controls.acceptance_specialty_id.setErrors(null);
      this.form.controls.acceptance_program_id.setErrors(null);
      this.form.controls.acceptance_observation.setErrors(null);

      this.form.controls.denied_technological_medium_id.setErrors(null);
      this.form.controls.denied_admission_route_id.setErrors(null);
      this.form.controls.denied_specialty_id.setErrors(null);
      this.form.controls.denied_type_id.setErrors(null);
      this.form.controls.denied_reason_id.setErrors(null);
      this.form.controls.denied_program_id.setErrors(null);
      this.form.controls.denied_observation.setErrors(null);
    } else if (this.route == 2) {
      this.form.controls.firstname.setErrors(null);
      this.form.controls.lastname.setErrors(null);
      this.form.controls.identification.setErrors(null);
      this.form.controls.re_input.setErrors(null);
      this.form.controls.age.setErrors(null);
      this.form.controls.intention.setErrors(null);
      this.form.controls.gender_id.setErrors(null);
      this.form.controls.identification_type_id.setErrors(null);
      this.form.controls.procedure_id.setErrors(null);
      this.form.controls.company_id.setErrors(null);
      this.form.controls.diagnosis_id.setErrors(null);
      this.form.controls.providers_of_health_services_id.setErrors(null);
      this.form.controls.stay_type_id.setErrors(null);
      this.form.controls.request_campus_id.setErrors(null);
      this.form.controls.request_regime_id.setErrors(null);
      this.form.controls.request_technological_medium_id.setErrors(null);
      this.form.controls.request_admission_route_id.setErrors(null);
      this.form.controls.request_specialty_id.setErrors(null);
      this.form.controls.request_program_id.setErrors(null);
      this.form.controls.request_observation.setErrors(null);

      this.form.controls.acceptance_campus_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.acceptance_regime_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.acceptance_technological_medium_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.acceptance_admission_route_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.acceptance_specialty_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.acceptance_program_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.acceptance_observation.setValidators(Validators.compose([Validators.required]));

      this.form.controls.denied_technological_medium_id.setErrors(null);
      this.form.controls.denied_admission_route_id.setErrors(null);
      this.form.controls.denied_specialty_id.setErrors(null);
      this.form.controls.denied_type_id.setErrors(null);
      this.form.controls.denied_reason_id.setErrors(null);
      this.form.controls.denied_program_id.setErrors(null);
      this.form.controls.denied_observation.setErrors(null);
    } else if (this.route == 3) {
      this.form.controls.firstname.setErrors(null);
      this.form.controls.lastname.setErrors(null);
      this.form.controls.identification.setErrors(null);
      this.form.controls.re_input.setErrors(null);
      this.form.controls.age.setErrors(null);
      this.form.controls.intention.setErrors(null);
      this.form.controls.gender_id.setErrors(null);
      this.form.controls.identification_type_id.setErrors(null);
      this.form.controls.procedure_id.setErrors(null);
      this.form.controls.company_id.setErrors(null);
      this.form.controls.diagnosis_id.setErrors(null);
      this.form.controls.providers_of_health_services_id.setErrors(null);
      this.form.controls.stay_type_id.setErrors(null);
      this.form.controls.request_campus_id.setErrors(null);
      this.form.controls.request_regime_id.setErrors(null);
      this.form.controls.request_technological_medium_id.setErrors(null);
      this.form.controls.request_admission_route_id.setErrors(null);
      this.form.controls.request_specialty_id.setErrors(null);
      this.form.controls.request_program_id.setErrors(null);
      this.form.controls.request_observation.setErrors(null);

      this.form.controls.acceptance_campus_id.setErrors(null);
      this.form.controls.acceptance_regime_id.setErrors(null);
      this.form.controls.acceptance_technological_medium_id.setErrors(null);
      this.form.controls.acceptance_admission_route_id.setErrors(null);
      this.form.controls.acceptance_specialty_id.setErrors(null);
      this.form.controls.acceptance_program_id.setErrors(null);
      this.form.controls.acceptance_observation.setErrors(null);

      this.form.controls.denied_technological_medium_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.denied_admission_route_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.denied_specialty_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.denied_type_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.denied_reason_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.denied_program_id.setValidators(Validators.compose([Validators.required]));
      this.form.controls.denied_observation.setValidators(Validators.compose([Validators.required]));
    }

    this.onChanges();

    if (this.data.id) {
      this.form.controls.patient_id.disable();
      this.form.controls.firstname.disable();
      this.form.controls.lastname.disable();
      this.form.controls.identification.disable();
      this.form.controls.age.disable();
      this.form.controls.identification_type_id.disable();
      this.gender_id_disabled = true;
      if (this.route != 1) {
        this.form.controls.intention.disable();
        this.form.controls.procedure_id.disable();
        this.form.controls.company_id.disable();
        this.form.controls.diagnosis_id.disable();
        this.form.controls.providers_of_health_services_id.disable();
        this.form.controls.stay_type_id.disable();
        this.re_input_disabled = true;
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  async save() {
    this.form.controls.patient_id.setErrors(null);
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.ReferenceS.Update({
          id: this.data.id,
          user_id: this.user.id,
          route: this.route,
          acceptance_campus_id: this.form.controls.acceptance_campus_id.value,
          acceptance_regime_id: this.form.controls.acceptance_regime_id.value,
          acceptance_technological_medium_id: this.form.controls.acceptance_technological_medium_id.value,
          acceptance_admission_route_id: this.form.controls.acceptance_admission_route_id.value,
          acceptance_specialty_id: this.form.controls.acceptance_specialty_id.value,
          acceptance_program_id: this.form.controls.acceptance_program_id.value,
          acceptance_observation: this.form.controls.acceptance_observation.value,
          denied_technological_medium_id: this.form.controls.denied_technological_medium_id.value,
          denied_admission_route_id: this.form.controls.denied_admission_route_id.value,
          denied_specialty_id: this.form.controls.denied_specialty_id.value,
          denied_type_id: this.form.controls.denied_type_id.value,
          denied_reason_id: this.form.controls.denied_reason_id.value,
          denied_program_id: this.form.controls.denied_program_id.value,
          denied_observation: this.form.controls.denied_observation.value,

          patient_id: this.patient_id,
          procedure_id: this.procedure_id,
          diagnosis_id: this.diagnosis_id,
          firstname: this.form.controls.firstname.value,
          lastname: this.form.controls.lastname.value,
          identification: this.form.controls.identification.value,
          re_input: this.form.controls.re_input.value,
          age: this.form.controls.age.value,
          intention: this.form.controls.intention.value,
          gender_id: this.form.controls.gender_id.value,
          identification_type_id: this.form.controls.identification_type_id.value,
          company_id: this.form.controls.company_id.value,
          providers_of_health_services_id: this.form.controls.providers_of_health_services_id.value,
          stay_type_id: this.form.controls.stay_type_id.value,
          request_campus_id: this.form.controls.request_campus_id.value,
          request_regime_id: this.form.controls.request_regime_id.value,
          request_technological_medium_id: this.form.controls.request_technological_medium_id.value,
          request_admission_route_id: this.form.controls.request_admission_route_id.value,
          request_specialty_id: this.form.controls.request_specialty_id.value,
          request_program_id: this.form.controls.request_program_id.value,
          request_observation: this.form.controls.request_observation.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
          if (this.new_patient && this.route == 2) {
            if (this.patient_id) {
              this.new_admission(x.data.reference, {
                admission_route_id: this.form.controls.acceptance_admission_route_id.value,
                program_id: this.form.controls.acceptance_program_id.value,
                regime_id: this.form.controls.acceptance_regime_id.value,
                eps: this.form.controls.company_id.value,
                diagnosis_id: this.form.controls.diagnosis_id.value,
                diagnosis: this.diagnosis_id,
              });
            } else {
              this.new_patient(x.data.reference, {
                admission_route_id: this.form.controls.acceptance_admission_route_id.value,
                program_id: this.form.controls.acceptance_program_id.value,
                regime_id: this.form.controls.acceptance_regime_id.value,
                eps: this.form.controls.company_id.value,
                diagnosis_id: this.form.controls.diagnosis_id.value,
                diagnosis: this.diagnosis_id,
              });
            }
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.ReferenceS.Save({
          route: this.route,
          user_id: this.user.id,
          patient_id: this.patient_id,
          procedure_id: this.procedure_id,
          diagnosis_id: this.diagnosis_id,
          firstname: this.form.controls.firstname.value,
          lastname: this.form.controls.lastname.value,
          identification: this.form.controls.identification.value,
          re_input: this.form.controls.re_input.value,
          age: this.form.controls.age.value,
          intention: this.form.controls.intention.value,
          gender_id: this.form.controls.gender_id.value,
          identification_type_id: this.form.controls.identification_type_id.value,
          company_id: this.form.controls.company_id.value,
          providers_of_health_services_id: this.form.controls.providers_of_health_services_id.value,
          stay_type_id: this.form.controls.stay_type_id.value,
          request_campus_id: this.form.controls.request_campus_id.value,
          request_regime_id: this.form.controls.request_regime_id.value,
          request_technological_medium_id: this.form.controls.request_technological_medium_id.value,
          request_admission_route_id: this.form.controls.request_admission_route_id.value,
          request_specialty_id: this.form.controls.request_specialty_id.value,
          request_program_id: this.form.controls.request_program_id.value,
          request_observation: this.form.controls.request_observation.value,
        }).then(x => {
          this.toastService.success('', x.message);
          this.close();
          if (this.saved) {
            this.saved();
          }
          if (this.new_patient && this.route == 2) {
            if (this.patient_id) {
              this.new_admission(x.data.reference, {
                admission_route_id: this.form.controls.acceptance_admission_route_id.value,
                program_id: this.form.controls.acceptance_program_id.value,
                regime_id: this.form.controls.acceptance_regime_id.value,
                eps: this.form.controls.company_id.value,
                diagnosis_id: this.form.controls.diagnosis_id.value,
                diagnosis: this.diagnosis_id,
              });
            } else {
              this.new_patient(x.data.reference, {
                admission_route_id: this.form.controls.acceptance_admission_route_id.value,
                program_id: this.form.controls.acceptance_program_id.value,
                regime_id: this.form.controls.acceptance_regime_id.value,
                eps: this.form.controls.company_id.value,
                diagnosis_id: this.form.controls.diagnosis_id.value,
                diagnosis: this.diagnosis_id,
              });
            }
          }
        }).catch(x => {
          this.toastService.danger('', x);
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } else {
      this.toastService.warning('', 'Debes diligenciar los campos obligatorios');
    }
  }

  saveProcedure(e): void {
    var localidentify = this.procedure.find(item => item.name == e);

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.patchValue({
        procedure_id: localidentify.name,
      });
    } else {
      this.procedure_id = null;
      this.toastService.warning('', 'Debe seleccionar un procedimiento de la lista');
      this.form.controls.procedure_id.setErrors({ 'incorrect': true });
    }
  }

  saveDiagnosis(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }

  savePatient(e): void {
    if (this.patient) {
      var localidentify = this.patient.find(item => item.identification == e);

      if (localidentify) {
        this.patient_id = localidentify.id;
        this.form.patchValue({
          patient_id: localidentify.identification,
          firstname: localidentify.firstname,
          identification_type_id: localidentify.identification_type_id,
          lastname: localidentify.lastname,
          identification: localidentify.identification,
          gender_id: localidentify.gender_id,
          age: this.getAge(localidentify.birthday),
        });
        this.form.controls.firstname.setErrors(null);
        this.form.controls.identification_type_id.setErrors(null);
        this.form.controls.lastname.setErrors(null);
        this.form.controls.identification.setErrors(null);
        this.form.controls.age.setErrors(null);
        this.form.controls.gender_id.setErrors(null);
        this.form.controls.firstname.disable();
        this.form.controls.identification_type_id.disable();
        this.form.controls.lastname.disable();
        this.form.controls.identification.disable();
        this.form.controls.age.disable();
        this.gender_id_disabled = true;
      } else {
        this.form.patchValue({
          firstname: '',
          identification_type_id: '',
          lastname: '',
          identification: '',
          age: '',
          gender_id: '',
          re_input: '',
        });
        this.gender_id_disabled = false;
        this.form.controls.firstname.enable();
        this.form.controls.identification_type_id.enable();
        this.form.controls.lastname.enable();
        this.form.controls.identification.enable();
        this.form.controls.age.enable();
        if (e != '') {
          this.toastService.warning('', 'El paciente buscado no se encuentra en el sistema');
        }
      }
    } else {
      this.toastService.warning('', 'El paciente buscado no se encuentra en el sistema');
    }
  }

  getAge(birthday: string): number {
    var date = new Date(birthday);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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

  onChanges() {
    this.form.get('identification').valueChanges.subscribe(val => {
      if (val != null && val != '') {
        this.AdmissionsS.getByIdentification(val).then(x => {
          if (x.length > 0) {
            this.form.patchValue({
              re_input: true,
            });
          } else {
            this.form.patchValue({
              re_input: false,
            });
          }
        });
      } else {
        this.form.patchValue({
          re_input: '',
        });
      }
    });

    this.form.get('denied_type_id').valueChanges.subscribe(val => {
      this.form.patchValue({
        denied_reason_id: '',
      });
      if (val != null && val != '') {
        this.DeniedReasonS.GetCollection({
          denied_type_id: val,
        }).then(x => {
          if (x.length > 0) {
            this.denied_reason = x;
          } else {
            this.denied_reason = null;
          }
        });
      } else {
        this.denied_reason = null;
      }
    });

    this.form.get('request_admission_route_id').valueChanges.subscribe(val => {
      this.routeChanges(val);
    });

    this.form.get('acceptance_admission_route_id').valueChanges.subscribe(val => {
      this.routeChanges(val);
    });

    this.form.get('denied_admission_route_id').valueChanges.subscribe(val => {
      this.routeChanges(val);
    });
  }

  routeChanges(val) {
    if (val === '') {
      this.program = [];
    } else {
      this.GetProgram(val);
    }
    this.form.patchValue({
      request_program_id: '',
      acceptance_program_id: '',
      denied_program_id: '',
    });
  }

  GetProgram(val) {
    // this.ProgramS.GetProgramByScope(val).then(x => {
    //   this.program = x;
    // });
  }

}






