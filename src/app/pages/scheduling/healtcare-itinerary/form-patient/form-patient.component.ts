import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../../models/country';
import { Entity } from '../../../../models/entity';
import { Ethnicity } from '../../../../models/ethnicity';
import { Gender } from '../../../../models/gender';
import { IdentificationType } from '../../../../models/identification-type';
import { Municipality } from '../../../../models/municipality';
import { Region } from '../../../../models/region';
import { Status } from '../../../../models/status';
import { Position } from '../../../../models/position';
import { AcademicLevel } from '../../../../models/academic_level';
import { SectionalCouncil } from '../../../../models/sectional-council';
import { District } from '../../../../models/district';
import { Circuit } from '../../../../models/circuit';
import { Category } from '../../../../models/category';
import { AssistanceSpecial } from '../../../../models/assistance-special';
import { IdentificationTypeBusinessService } from '../../../../business-controller/identification-type-business.service';
import { GenderBusinessService } from '../../../../business-controller/gender-business.service';
import { LocationBusinessService } from '../../../../business-controller/location-business.service';
import { StatusBusinessService } from '../../../../business-controller/status-business.service';
import { EntityBusinessService } from '../../../../business-controller/entity-business.service';
import { PositionService } from '../../../../business-controller/position.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { AcademicLevelBusinessService } from '../../../../business-controller/academic-level-business.service';
import { OfficeService } from '../../../../business-controller/office.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { DependenceService } from '../../../../business-controller/dependence.service';
import { SectionalCouncilService } from '../../../../business-controller/sectional-council.service';
import { DistrictService } from '../../../../business-controller/district.service';
import { CircuitBusinessService } from '../../../../business-controller/circuit-business.service';
import { InabilityService } from '../../../../business-controller/inability.service';
import { RoleBusinessService } from '../../../../business-controller/role-business.service';
import { LocationCapacityService } from '../../../../business-controller/location-capacity.service';
import { DateFormatPipe } from '../../../../pipe/date-format.pipe';
import { AuthService } from '../../../../services/auth.service';
import { SpecialitiesDialogComponent } from '../../../components/form-users/especialities-dialog.component';


@Component({
  selector: 'ngx-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss'],
})
export class FormPatientComponent implements OnInit {

  @Input() data: any;
  @Input() routes = null;
  @Input() role: any = '2';
  @Input() title;
  @Input() routeBack = null;
  @Input() isPublic = false;
  @Input() loadingData = false;
  @Input() redirectTo = null;
  @Input() isTeacher = null;
  @Input() isStudent = null;
  @Input() isTH = null;
  @Input() edit_own_info: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public messageError = null;
  public form: FormGroup;
  public isSubmitted: boolean = false;
  public loading2: boolean = false;

  public identification_types: IdentificationType[] = [];
  public genders: Gender[] = [];
  public ethnicitys: Ethnicity[] = [];
  public countries: Country[] = [];
  public regions: Region[] = [];
  public municipalities: Municipality[] = [];
  public status: Status[] = [];
  public residence_countries: Country[] = [];
  public residence_regions: Region[] = [];
  public residence_municipalities: Municipality[] = [];
  public entities: Entity[] = [];
  public positions: Position[] = [];
  public academyLevels: AcademicLevel[] = [];
  public study_level_status: any[] = [];
  public activities: any[] = [];
  public select_RH: any[] = [];
  public population_group: any[] = [];
  public marital_status: any[] = [];
  public neighborhood_or_residence: any[] = [];
  public localities: any[] = [];
  public parentData;
  public campusData;
  public agreementData;
  public saved;

  public sectionals: SectionalCouncil[] = [];
  public districts: District[] = [];
  public circuits: Circuit[] = [];
  public categories: Category[] = [];
  public loading = false;
  public loadAuxData = true;
  public course_id = null;
  public categoriesSelect = [];
  public today = null;
  public previewCurriculum = null;
  public currentRoleId = null;
  public phone_consult = false;
  public phone_consult_amount = null;
  public showPassword = false;
  public showConfirmPassword = false;
  public contract_type: any[];
  public cost_center: any[];
  public type_professional: any[];
  public specialities: AssistanceSpecial[];
  public specialitiesSelect = [];
  public selected: any[];
  public activities_id;
  public neighborhood_or_residence_id;

  public inabilitys: any[];
  public residences: any[];
  public location_capacity: any[];

  public referencia;
  public residence;
  public age: any = null;

  public street: any = null;
  public num1: any = null;
  public num2: any = null;
  public cardinality: any = null;
  public reference: any = null;
  public image;
  public signatureImage = null;
  public currentImg;
  public roles;
  public own_user: any = null;
  public int = 0;




  constructor(
    private formBuilder: FormBuilder,
    private identificationTypeBS: IdentificationTypeBusinessService,
    private genderBS: GenderBusinessService,
    private locationBS: LocationBusinessService,
    private statusBS: StatusBusinessService,
    private entityBS: EntityBusinessService,
    private positionBS: PositionService,
    private userBS: UserBusinessService,
    private patientBS: PatientService,
    private router: Router,
    private toastService: NbToastrService,
    private academicLevelBS: AcademicLevelBusinessService,
    private officesBS: OfficeService,
    private specialtyBS: SpecialtyService,
    private dependenceBS: DependenceService,
    private sectionalCBS: SectionalCouncilService,
    private districtBS: DistrictService,
    private circuitBS: CircuitBusinessService,
    private inabilitysS: InabilityService,
    public roleBS: RoleBusinessService,
    private route: ActivatedRoute,
    private dialog: NbDialogService,
    private locationCapacityS: LocationCapacityService,
    private dialogFormS: NbDialogService,
    public datePipe: DateFormatPipe,
    private authService: AuthService,
    protected dialogRef: NbDialogRef<any>,

  ) {
  }


  async ngOnInit() {

    this.own_user = this.authService.GetUser();

    this.loading = true;
    this.LoadForm(false).then();
    await Promise.all([
      this.GetAuxData(this.role == 7 ? 1 : this.role == 14 ? 2 : null),
      // this.GetAuxData(),
    ]);

    this.course_id = this.route.snapshot.queryParams.course_id;
    this.loadAuxData = false;
    this.LoadForm().then();

    this.today = new Date();

    this.today.setDate(this.today.getDate() - 2);
    this.today = this.today.toISOString().split('T')[0];


  }

  GetAuxData($type_professional_id?, $search?) {
    return this.userBS.GetFormAuxData(this.data ? false : true,
      $type_professional_id, $search).then(x => {

        this.identification_types = x.identificationTypes;
        this.countries = x.countries;
        this.genders = x.genders;
        this.ethnicitys = x.ethnicitys;
        this.status = x.status;
        this.academyLevels = x.academicLevels;
        this.study_level_status = x.study_level_status;
        this.activities = x.activities;
        this.select_RH = x.select_RH;
        this.population_group = x.population_group;
        this.marital_status = x.marital_status;
        this.cost_center = x.cost_center;
        this.type_professional = x.type_professional;
        this.contract_type = x.contract_type;
        this.specialities = x.specialty;
        this.inabilitys = x.inability;
        this.residences = x.residence;
        this.specialities = x.specialty;

        this.loading = false;
        return Promise.resolve(true);
      });
  }

  async LoadForm(force = true) {
    if (this.loadAuxData && force) return false;
    if (this.data) {
      const promises = [
        this.GetRegions(this.data.country_id),
        this.GetMunicipalities(this.data.region_id),
        this.GetRegions(this.data.country_id, true),
        this.GetMunicipalities(this.data.residence_region_id, true),
        this.data.locality_id ? this.GetLocality(this.data.residence_municipality_id) && this.GetNeighborhoodResidence(null, this.data.locality_id) : null,
        // this.data.localities_id ? this.GetLocality(this.data.residence_municipality_id) && this.GetNeighborhoodResidence(null ,this.data.localities_id) : this.GetNeighborhoodResidence(this.data.residence_municipality_id)
      ];

      await Promise.all(promises);
    }

    let configForm: any = {
      identification_type_id: [
        this.GetData('identification_type_id'),
        Validators.compose([Validators.required]),
      ],
      identification: [
        this.GetData('identification'),
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      ],
      firstname: [
        this.GetData('firstname'),
        Validators.compose([Validators.required]),
      ],

      middlefirstname: [
        this.GetData('middlefirstname'),
        Validators.compose([]),
      ],
      lastname: [
        this.GetData('lastname'),
        Validators.compose([Validators.required]),
      ],
      middlelastname: [
        this.GetData('middlelastname'),
        Validators.compose([]),
      ],
      birthday: [
        this.GetData('birthday'),
        Validators.compose([Validators.required]),
      ],
      gender_id: [
        this.GetData('gender_id'),
        Validators.compose([Validators.required]),
      ],
      is_disability: [
        ((this.GetData('is_disability') === '' || this.GetData('is_disability') === null/**  || !this.GetData('is_disability')*/) ? false : true),
        // Validators.compose([Validators.required]),
      ],
      gender_type: [
        this.GetData('gender_type'),
      ],
      phone: [
        this.GetData('phone'),
        // Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      ],
      landline: [
        this.GetData('landline'),
        // Validators.compose([Validators.minLength(10), Validators.maxLength(20)]),
      ],
      ethnicity_id: [
        this.GetData('ethnicity_id'),
      ],
      residence_country_id: [
        this.GetData('country_id'),
        // Validators.compose([Validators.required]),
      ],
      residence_region_id: [
        this.GetData('residence_region_id'),
        // Validators.compose([Validators.required]),
      ],
      residence_municipality_id: [
        this.GetData('residence_municipality_id'),
        // Validators.compose([Validators.required]),
      ],
      locality_id: [
        this.GetData('locality_id'),
      ],
      select_RH_id: [
        this.GetData('select_rh_id'),
        // Validators.compose([Validators.required]),
      ],
      residence_id: [
        this.GetData('residence_id'),
      ],
      residence_address: [
        this.ReturnResidence(this.GetData('residence_address')),
        // Validators.compose([Validators.required]),
      ],
      street: [
        this.street == null ? '' : this.street,
        // Validators.compose([Validators.required]),
      ],
      num1: [
        this.num1 == null ? '' : this.num1,
        // Validators.compose([Validators.required]),
      ],
      num2: [
        this.num2 == null ? '' : this.num2,
        // Validators.compose([Validators.required]),
      ],
      residence_address_cardinality: [
        this.cardinality == null ? '' : this.cardinality,
      ],
      reference: [
        this.reference == null ? '' : this.reference,
      ],
      neighborhood_or_residence_id: [
        this.return_neighborhood_or_residence(this.GetData('neighborhood_or_residence_id')),
        // Validators.compose([Validators.required]),
      ],
      inability_id: [
        this.GetData('inability_id'),
      ],
    };

    this.form = this.formBuilder.group(configForm);

    this.onChanges();
  }


  // private patient_quantity() {
  //   // console.log(this.form.controls.PAD_service.value);
  //   if(this.form.controls.PAD_service.value == true && this.form.controls.PAD_patient_quantity.value == false || this.form.controls.PAD_patient_quantity.value == null ) {
  //     this.form.controls.PAD_patient_quantity.setErrors({'incorrect': true});
  //   }
  // }

  private getDescendantProp(obj, desc) {
    const arr = desc.split('.');
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
  }

  public async LoadStudent(data) {
    this.data = data;
    if (!this.data.curriculum) this.data.curriculum = {};
    /*Obteniendo los departamentos y municipios de nacimiento*/
    this.LoadForm().then();
  }

  async getlocalities() {
    if (this.data != null && this.data.assistance.length > 0) {
      await this.locationCapacityS.GetByAssistance(this.data.assistance[0].id).then(x => {
        var arrdta = [];
        this.location_capacity = x.data;
        this.location_capacity.forEach(element => {
          arrdta.push(element.locality_id);
        });

        this.form.controls.localities_id.setValue([arrdta]);
        this.data.localities_id = [arrdta];

      });
    }
  }

  ReturnResidence(e) {
    var complete_address = e;

    //tipo de calle
    var residence_address = complete_address.split(' ', 1).toString();

    var num = complete_address.split('#', 1).toString();
    var firts_num = num.split(' ');
    firts_num.shift();
    firts_num.pop();
    this.street = firts_num.join().replace(',', ' ');

    //num1 de dirección
    var num = complete_address.split('-', 1).toString();
    var second_num = num.split('#');
    second_num.shift();
    this.num1 = second_num.join().replace(',', ' ').trim();
    //num2 de la dirección
    var num = complete_address.split(',', 1).toString();
    var second_num = num.split('-');
    second_num.shift();
    this.num2 = second_num.join().replace(',', ' ').trimStart();

    //cardinalidad
    var num = complete_address.split('(', 1).toString();
    var second_num = num.split(',');
    second_num.shift();
    this.cardinality = second_num.join().replace(',', ' ').trim();

    //adicional
    var num = complete_address.split(')', 1).toString();
    var second_num = num.split('(');
    second_num.shift();
    this.reference = second_num.join().replace(',', ' ').trimStart();

    return residence_address
  }

  return_neighborhood_or_residence(n): string {
    var localidentify = this.neighborhood_or_residence.find(item => item.id == n);
    var activities_name;

    if (localidentify) {
      activities_name = localidentify.name;
      this.neighborhood_or_residence_id = localidentify.id;
    } else {
      activities_name = null;
    }
    return activities_name;
  }

  private GetData(name) {
    if (this.data) {
      if (name.includes('.')) {
        return this.getDescendantProp(this.data, name);
      } else if (this.data.hasOwnProperty(name) && this.data[name] !== null) {
        return this.data[name];
      }
    }
    return '';
  }

  async SaveStudent() {
    this.residence = this.form.controls.residence_address.value + ' ' + this.form.controls.street.value + ' # ' + this.form.controls.num1.value + ' - ' + this.form.controls.num2.value + ', ' + this.form.controls.residence_address_cardinality.value + ' ' + ' ( ' + this.form.controls.reference.value + ' ) ';

    this.isSubmitted = true;
    // this.UpdateResetPassword(data);
    if (!this.form.invalid) {
      this.loading = true;

      var formData = new FormData();
      var data = this.form.controls;

      formData.append('own_user', this.own_user.id);
      formData.append('status_id', '1');
      formData.append('username', data.identification.value);
      formData.append('gender_id', data.gender_id.value);
      formData.append('is_disability', data.is_disability.value === true ? '1' : null);
      // formData.append('inability_id', data.inability_id.value);
      // formData.append('gender_type', data.gender_id.value === 3 ? data.gender_type.value : '');
      formData.append('firstname', data.firstname.value);
      formData.append('lastname', data.lastname.value);
      formData.append('middlefirstname', data.middlefirstname.value);
      formData.append('middlelastname', data.middlelastname.value);
      formData.append('birthday', data.birthday.value);
      formData.append('phone', data.phone.value);
      formData.append('identification_type_id', data.identification_type_id.value);
      formData.append('identification', data.identification.value);
      formData.append('id', this.data ? this.data.id : null);
      formData.append('role_id', this.role);
      formData.append('age', this.age);
      // formData.append('residence_id', data.residence_id.value);
      // formData.append('residence_country_id', data.residence_country_id.value);
      // formData.append('residence_region_id', data.residence_region_id.value);
      // formData.append('residence_municipality_id', data.residence_municipality_id.value);
      // formData.append('locality_id', data.locality_id.value);
      formData.append('select_RH_id', this.form.value.select_RH_id);
      // formData.append('residence_address', this.residence);
      // formData.append('neighborhood_or_residence_id', this.neighborhood_or_residence_id);
      try {
        let x;

        if (!this.data?.id) {
            x = await this.patientBS.SavePacient(formData);
        } else {
            x = await this.patientBS.UpdatePatient(formData, this.data.id);
        }
        this.toastService.success('', x.message);
        this.messageError = null;
        if (this.saved) {
          this.saved(true, x.data.patients);
        }
        this.close();
      } catch (x) {
        this.messageError = x;
        this.toastService.warning('', "El número de documento ya se encuentra registrado.")
        this.isSubmitted = false;
        this.loading = false;
      }
    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }


  onChanges() {
    this.form.get('identification_type_id').valueChanges.subscribe(val => {
      let current_text = '';

      this.identification_types.map(ident => {
        if (ident.id === val) {
          current_text = ident.name;
        }
      });

      this.form.get('identification_type_id').clearValidators();

      if (current_text.toLowerCase().includes('sin documento')) {
        this.form.get('identification').disable();
      } else {
        this.form.get('identification').enable();
      }
    });

    this.form.get('residence_country_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.residence_regions = [];
      } else {
        this.GetRegions(val, true).then();
      }
      this.form.patchValue({
        residence_region_id: '',
        residence_municipality_id: '',
        locality_id: '',
        localities_id: [],
        neighborhood_or_residence_id: '',
      });
      this.neighborhood_or_residence_id = '';
    });

    this.form.get('residence_region_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.residence_municipalities = [];
      } else {
        this.GetMunicipalities(val, true).then();
      }
      this.form.patchValue({
        residence_municipality_id: '',
        locality_id: '',
        localities_id: [],
        neighborhood_or_residence_id: '',
      });
      this.neighborhood_or_residence_id = '';
    });

    this.form.get('residence_municipality_id').valueChanges.subscribe(val => {
      if (val === '') {
        // this.neighborhood_or_residence = [];
        this.localities = [];
        // } else if(val == 11001) { 
        //   this.neighborhood_or_residence = [];
      } else {
        // this.GetNeighborhoodResidence(val).then();
        this.GetLocality(val).then();

      }
      this.form.patchValue({
        locality_id: '',
        localities_id: [],
        // neighborhood_or_residence_id: '',
      });
    });

    this.form.get('locality_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.neighborhood_or_residence = [];
      } else {
        this.GetNeighborhoodResidence(null, val).then();
      }
      this.form.patchValue({
        neighborhood_or_residence_id: '',
      });
      this.neighborhood_or_residence_id = '';
    });

    this.form.get('is_disability').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('inability_id').setValidators(Validators.required);
        //this.form.get('inability_id').updateValueAndValidity();
      } else {
        this.form.controls.inability_id.clearValidators();
        this.form.controls.inability_id.setErrors(null);

      }
    });

  }

  GetRegions(country_id, job = false) {
    if (!country_id || country_id === '') return Promise.resolve(false);

    return this.locationBS.GetPublicRegionByCountry(country_id).then(x => {
      if (job)
        this.residence_regions = x;
      else
        this.regions = x;

      return Promise.resolve(true);
    });
  }


  GetMunicipalities(region_id, job = false) {
    if (!region_id || region_id === '') return Promise.resolve(false);
    return this.locationBS.GetPublicMunicipalitiesByRegion(region_id).then(x => {
      if (job)
        this.residence_municipalities = x;
      else
        this.municipalities = x;

      return Promise.resolve(true);
    });
  }

  GetLocality(municipality_id) {
    if (!municipality_id || municipality_id === '') return Promise.resolve(false);
    return this.locationBS.GetLocalityByMunicipality(municipality_id).then(x => {
      this.localities = x;
      return Promise.resolve(true);
    });
  }

  GetNeighborhoodResidence(municipality_id?, locality_id?) {
    if (municipality_id) {
      // if (!municipality_id || municipality_id === '') return Promise.resolve(false);
      // return this.locationBS.GetNeighborhoodResidenceByMunicipality(municipality_id).then(x => {
      //   this.neighborhood_or_residence = x;
      //   return Promise.resolve(true);
      // }).catch(e => {
      //   console.log(e);
      // });
    } else if (locality_id) {
      if (!locality_id || locality_id === '') return Promise.resolve(false);
      return this.locationBS.GetNeighborhoodResidenceByLocality(locality_id).then(x => {
        this.neighborhood_or_residence = x;
        return Promise.resolve(true);
      });
    }
  }

  ageCalculator(birthday: Date) {
    var today = new Date;
    var age = new Date(birthday)
    var year = today.getFullYear() - age.getFullYear();
    var m = (today.getMonth() + 1) - (age.getMonth() + 1);
    var Month = age.getMonth();
    var day = today.getDate() - (age.getDate() + 1);
    if (m < 0) {
      year--;
      if (year) {

      }
      m = m + 12;
    }

    if (day < 0) {
      m--;
      if (m < 0) {
        year--;
        m = m + 12;
      }
      if (Month == 1) {
        day = day + 28
      }
      else if (Month == 0 || Month == 2 || Month == 4 || Month == 6 || Month == 7 || Month == 9 || Month == 11) {
        day = day + 31;
      }
      else {
        day = day + 30;
      }
    }
    if (year < 0) {
      year = 0
    }
    this.age = year + " años " + m + " meses y " + day + " dia(s) ";
  }

  save_neighborhood_or_residence(e) {
    var localidentify = this.neighborhood_or_residence.find(item => item.name == e);

    if (localidentify) {
      this.neighborhood_or_residence_id = localidentify.id;
    } else {
      this.neighborhood_or_residence_id = null;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.activities_id.setErrors({ 'incorrect': true });
    }
  }

  close(){
    this.dialogRef.close();
  }
}
