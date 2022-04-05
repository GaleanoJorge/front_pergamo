import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentificationTypeBusinessService } from '../../../business-controller/identification-type-business.service';
import { IdentificationType } from '../../../models/identification-type';
import { GenderBusinessService } from '../../../business-controller/gender-business.service';
import { Gender } from '../../../models/gender';
import { Ethnicity } from '../../../models/ethnicity';
import { Municipality } from '../../../models/municipality';
import { LocationBusinessService } from '../../../business-controller/location-business.service';
import { Country } from '../../../models/country';
import { Region } from '../../../models/region';
import { StatusBusinessService } from '../../../business-controller/status-business.service';
import { Status } from '../../../models/status';
import { EntityBusinessService } from '../../../business-controller/entity-business.service';
import { Entity } from '../../../models/entity';
import { Position } from '../../../models/position';
import { PositionService } from '../../../business-controller/position.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AcademicLevelBusinessService } from '../../../business-controller/academic-level-business.service';
import { AcademicLevel } from '../../../models/academic_level';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../business-controller/office.service';
import { SpecialtyService } from '../../../business-controller/specialty.service';
import { Specialty } from '../../../models/specialty';
import { DependenceService } from '../../../business-controller/dependence.service';
import { Dependence } from '../../../models/dependence';
import { SectionalCouncilService } from '../../../business-controller/sectional-council.service';
import { SectionalCouncil } from '../../../models/sectional-council';
import { District } from '../../../models/district';
import { Circuit } from '../../../models/circuit';
import { DistrictService } from '../../../business-controller/district.service';
import { CircuitBusinessService } from '../../../business-controller/circuit-business.service';
import { Category } from '../../../models/category';
import { CategoriesDialogComponent } from './categories-dialog.component';
import { environment } from '../../../../environments/environment';
import { AssistanceSpecialService } from '../../../business-controller/assistance-special.service';
import { AssistanceSpecial } from '../../../models/assistance-special';
import { SpecialitiesDialogComponent } from './especialities-dialog.component';
import { search } from '@syncfusion/ej2-angular-filemanager';
import { Item } from '../../../models/item';
import { InabilityService } from '../../../business-controller/inability.service';
import { date } from '@rxweb/reactive-form-validators';
import {LocationCapacityService} from '../../../business-controller/location-capacity.service';
import { RoleBusinessService } from '../../../business-controller/role-business.service';




@Component({
  selector: 'ngx-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent implements OnInit {
  @Input() data: any;
  @Input() routes = null;
  @Input() role = null;
  @Input() title = null;
  @Input() routeBack = null;
  @Input() isPublic = false;
  @Input() loadingData = false;
  @Input() redirectTo = null;
  @Input() isTeacher = null;
  @Input() isStudent = null;

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
  public showPassword = false;
  public showConfirmPassword = false;
  public contract_type: any[];
  public cost_center: any[];
  public type_professional: any[];
  public specialities: AssistanceSpecial[];
  public specialitiesSelect = [];
  public selected: any[];
  public activities_id;

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
  public signatureImage;
  public currentImg;



  constructor(
    private formBuilder: FormBuilder,
    private identificationTypeBS: IdentificationTypeBusinessService,
    private genderBS: GenderBusinessService,
    private locationBS: LocationBusinessService,
    private statusBS: StatusBusinessService,
    private entityBS: EntityBusinessService,
    private positionBS: PositionService,
    private userBS: UserBusinessService,
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
  ) {
  }

  ChangeImage(event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () =>
      this.image = reader.result as string;

    reader.readAsDataURL(file)
  }

  async ngOnInit() 
  {
    this.parentData = {
      selectedOptions: [],
      entity: 'residence/locationbyMunicipality',
      customData: 'locality'
      };
    if (this.data && this.data.file) {
      this.image = environment.storage + this.data.file;
       
    } else {
      this.image = "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";
    }
    if(this.data && this.data.assistance.length>0){
    this.currentImg = environment.storage + this.data.assistance[0].firm;  
    }else{
      this.currentImg=null;
    }
    this.currentRoleId = localStorage.getItem('role_id');
    this.LoadForm(false).then();
    await Promise.all([
      this.GetAuxData(null),
    ]);
    
    this.course_id = this.route.snapshot.queryParams.course_id;
    this.loadAuxData = false;
    this.LoadForm().then();

    this.today = new Date();

    this.today.setDate(this.today.getDate() - 2);
    this.today = this.today.toISOString().split('T')[0];

    this.roleBS.GetCollection({id: this.role}).then(x => {
      console.log(x);
    }).catch(x => {});
    if(this.role==7){
      this.GetAuxData(1)
    } else if(this.role==14){
      this.GetAuxData(2)
    }
  }

  GetAuxData($type_professional_id?, $search?) {
    return this.userBS.GetFormAuxData(this.data ? false : true,
      this.data == null && !$type_professional_id ? null : $type_professional_id == null && this.data.assistance.length > 0 ? this.data.assistance[0].type_professional_id : $type_professional_id, $search).then(x => {
        if (!$type_professional_id) {
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
          this.specialities = x.special_field;
          this.inabilitys = x.inability;
          this.residences = x.residence;
        } else {
          this.specialities = x.special_field;
        }
        return Promise.resolve(true);
      });
  }

  showImage(data) {
    this.signatureImage = data;
  }

  saveCode(e): void {
    var localidentify = this.activities.find(item => item.name == e);

    if (localidentify) {
      this.activities_id = localidentify.id;
    } else {
      this.activities_id = null;
    }
  }
  returnProfession(n): string {
    var localidentify = this.activities.find(item => item.id == n);
    var activities_name;

    if (localidentify) {
      activities_name = localidentify.name;
      this.activities_id = localidentify.id;
    } else {
      activities_name = null;
    }
    return activities_name;
  }

  async LoadForm(force = true) {
    if (this.loadAuxData && force) return false;
    if (this.data) {
      const promises = [
        this.GetRegions(this.data.country_id),
        this.GetMunicipalities(this.data.region_id),
        this.GetRegions(this.data.country_id, true),
        this.GetMunicipalities(this.data.residence_region_id, true),
        this.data.locality_id ? this.GetLocality(this.data.residence_municipality_id) && this.GetNeighborhoodResidence(null ,this.data.locality_id) : this.GetNeighborhoodResidence(this.data.residence_municipality_id),
        this.data.localities_id ? this.GetLocality(this.data.residence_municipality_id) && this.GetNeighborhoodResidence(null ,this.data.localities_id) : this.GetNeighborhoodResidence(this.data.residence_municipality_id)
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
        ((this.GetData('is_disability') === '' || this.GetData('is_disability') === null || !this.GetData('is_disability')) ? false : true),
        Validators.compose([Validators.required]),
      ],
      disability: [
        this.GetData('disability'),
      ],
      gender_type: [
        this.GetData('gender_type'),
      ],
      email: [
        this.GetData('email'),
        Validators.compose([Validators.required, Validators.email]),
      ],
      phone: [
        this.GetData('phone'),
        Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      ],
      landline: [
        this.GetData('landline'),
        Validators.compose([Validators.minLength(10), Validators.maxLength(20)]),
      ],
      ethnicity_id: [
        this.GetData('ethnicity_id'),
      ],
      password: [
        '',
        Validators.compose([]),
      ],
      confirm_password: [
        '',
        Validators.compose([]),
      ],
      country_id: [
        this.GetData('country_id'),
        Validators.compose([Validators.required]),
      ],
      region_id: [
        this.GetData('region_id'),
        Validators.compose([Validators.required]),
      ],
      birthplace_municipality_id: [
        this.GetData('birthplace_municipality_id'),
        Validators.compose([Validators.required]),
      ],
      status_id: [
        this.GetData('status_id') === '' ? 1 : this.GetData('status_id'),
        Validators.compose([Validators.required]),
      ],

      academic_level_id: [
        this.GetData('academic_level_id'),
        Validators.compose([Validators.required]),
      ],

      residence_country_id: [
        this.GetData('country_id'),
        Validators.compose([Validators.required]),
      ],

      residence_region_id: [
        this.GetData('residence_region_id'),
        Validators.compose([Validators.required]),
      ],

      residence_municipality_id: [
        this.GetData('residence_municipality_id'),
        Validators.compose([Validators.required]),
      ],

      locality_id: [
        this.GetData('locality_id'),
      ],

      study_level_status_id: [
        this.GetData('study_level_status_id'),
        Validators.compose([Validators.required]),
      ],

      activities_id: [
        this.returnProfession(this.GetData('activities_id')),
        Validators.compose([Validators.required]),
      ],

      select_RH_id: [
        this.GetData('select_rh_id'),
        Validators.compose([Validators.required]),
      ],

      population_group_id: [
        this.GetData('population_group_id'),
        Validators.compose([Validators.required]),
      ],

      marital_status_id: [
        this.GetData('marital_status_id'),
        Validators.compose([Validators.required]),
      ],
      residence_id: [
        this.GetData('residence_id'),
      ],
      residence_address: [
        this.ReturnResidence(this.GetData('residence_address')),
        Validators.compose([Validators.required]),
      ],
      street: [
        this.street == null ? '' : this.street,
        Validators.compose([Validators.required]),
      ],
      num1: [
        this.num1 == null ? '' : this.num1,
        Validators.compose([Validators.required]),
      ],
      num2: [
        this.num2 == null ? '' : this.num2,
        Validators.compose([Validators.required]),
      ],
      residence_address_cardinality: [
        this.cardinality == null ? '' : this.cardinality,
      ],
      reference: [
        this.reference == null ? '' : this.reference,
      ],
      neighborhood_or_residence_id: [
        this.GetData('neighborhood_or_residence_id'),
        Validators.compose([Validators.required]),
      ],
      inability_id: [
        this.GetData('inability_id'),
      ],
      file: [
        this.image,
      ],
    };
    if (this.data) {
      this.age = this.data.age;
    }
    if (this.roleBS.roles[0].role_type_id == 2) {
      configForm = {
        ...configForm,
        medical_record: [
          this.data == null ? '' : this.data.assistance.length > 0 ? this.data.assistance[0].medical_record : '',
          Validators.compose([Validators.required])
        ],
        contract_type_id: [
          this.data == null ? '' : this.data.assistance.length > 0 ? this.data.assistance[0].contract_type_id : '',
          Validators.compose([Validators.required])
        ],
        localities_id: [
          [this.getlocalities()],
        ],
        // cost_center_id: [
        //   this.data == null ? '' : this.data.assistance.length > 0 ? this.data.assistance[0].cost_center_id : '',
        //   Validators.compose([Validators.required])
        // ],
        attends_external_consultation: [
          this.data == null ? false : this.data.assistance.length > 0 ? this.data.assistance[0].attends_external_consultation == 1 ? true : false : false,
        ],
        serve_multiple_patients: [
          this.data == null ? false : this.data.assistance.length > 0 ? this.data.assistance[0].serve_multiple_patients == 1 ? true : false : false,
        ],
        PAD_service: [
          this.data == null ? false : this.data.assistance.length > 0 ? this.data.assistance[0].PAD_service == 1 ? true : false : false,
        ],
        // PAD_patient_quantity: [
        //   this.data == null ? false : this.data.assistance.length > 0 ? this.data.assistance[0].PAD_patient_quantity : false,
        // ],
      }

    }


    if (this.data && this.data.id) {
      configForm.password = [
        '',
      ];

      configForm.confirm_password = [
        '',
      ];

    }



    this.form = this.formBuilder.group(configForm);

    if (this.data) {
      this.form.controls['identification'].disable();
    }

    this.onChanges();

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

  async getlocalities(){
    if(this.data != null && this.data.assistance.length>0){
  await this.locationCapacityS.GetByAssistance(this.data.assistance[0].id).then(x => {
    var arrdta = [];
    this.location_capacity = x.data;
    this.location_capacity.forEach(element => {
      arrdta.push(element.locality_id);
    });

    this.form.controls.localities_id.setValue([arrdta]);
    this.data.localities_id=[arrdta];

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

  async SaveStudent() {
    this.residence = this.form.controls.residence_address.value + ' ' + this.form.controls.street.value + ' # ' + this.form.controls.num1.value + ' - ' + this.form.controls.num2.value + ', ' + this.form.controls.residence_address_cardinality.value + ' ' + ' ( ' + this.form.controls.reference.value + ' ) ';
    if(this.role == 3 || this.role ==7){
      // this.patient_quantity();
    }
    this.isSubmitted = true;
    // this.UpdateResetPassword(data);
    if (!this.form.invalid) {
      this.loading = true;

      var formData = new FormData();
      var data = this.form.controls;

      formData.append('status_id', data.status_id.value);
      formData.append('gender_id', data.gender_id.value);
      formData.append('is_disability', data.is_disability.value === true ? '1' : null);
      formData.append('inability_id', data.inability_id.value);
      formData.append('gender_type', data.gender_id.value === 3 ? data.gender_type.value : '');
      formData.append('academic_level_id', data.academic_level_id.value);
      formData.append('identification_type_id', data.identification_type_id.value);
      formData.append('birthplace_country_id', data.country_id.value);
      formData.append('birthplace_region_id', data.region_id.value);
      formData.append('birthplace_municipality_id', data.birthplace_municipality_id.value);
      formData.append('email', data.email.value);
      formData.append('firstname', data.firstname.value);
      formData.append('lastname', data.lastname.value);
      formData.append('middlefirstname', data.middlefirstname.value);
      formData.append('middlelastname', data.middlelastname.value);
      formData.append('ethnicity_id', data.ethnicity_id.value);
      formData.append('birthday', data.birthday.value);
      formData.append('phone', data.phone.value);
      formData.append('identification', data.identification.value);
      formData.append('id', this.data ? this.data.id : null);
      formData.append('role_id', this.role);
      formData.append('age', this.age);
      formData.append('username', data.identification.value);
      formData.append('file', this.form.value.file);
      if (this.isStudent == true) {
        formData.append('password', 'Hyl' + data.identification.value + '*');
      } else {
        formData.append('password', data.password.value);
      }
      formData.append('landline', data.landline.value);
      formData.append('residence_id', data.residence_id.value);
      formData.append('residence_country_id', data.residence_country_id.value);
      formData.append('residence_region_id', data.residence_region_id.value);
      formData.append('residence_municipality_id', data.residence_municipality_id.value);  
      formData.append('locality_id', data.locality_id.value);
    
      formData.append('study_level_status_id', data.study_level_status_id.value);
      formData.append('activities_id', this.activities_id);
      formData.append('select_RH_id', this.form.value.select_RH_id);
      formData.append('population_group_id', data.population_group_id.value);
      formData.append('marital_status_id', data.marital_status_id.value);
      formData.append('residence_address', this.residence);
      formData.append('neighborhood_or_residence_id', data.neighborhood_or_residence_id.value);

      // var role = Number(this.role);
      if (this.roleBS.roles[0].role_type_id == 2) {
        formData.append('assistance_id', this.data==null ? null : this.data.assistance[0].id);
        formData.append('medical_record', data.medical_record.value);
        formData.append('localities_id', JSON.stringify(this.parentData.selectedOptions));
        formData.append('contract_type_id', data.contract_type_id.value);
        // formData.append('cost_center_id', data.cost_center_id.value);
        // formData.append('type_professional_id', data.type_professional_id.value);
        formData.append('attends_external_consultation', data.attends_external_consultation.value === true ? '1' : '0');
        formData.append('serve_multiple_patients', data.serve_multiple_patients.value === true ? '1' : '0');
        formData.append('firm', this.signatureImage);
        formData.append('PAD_service', data.PAD_service.value === true ? '1' : '0');
        // formData.append('PAD_patient_quantity', data.PAD_patient_quantity.value === false ? null : data.PAD_patient_quantity.value);
      }

      if (data.is_judicial_branch) {
        formData.append('sectional_council_id', data.sectional_council_id.value);
        formData.append('district_id', data.district_id.value);
        formData.append('circuit_id', data.circuit_id.value);
        formData.append('specialty_id', data.specialty_id.value);
        formData.append('office_id', data.office_id.value);
        formData.append('dependence_id', data.dependence_id.value);
        formData.append('position_id', data.position_id.value);
        formData.append('curriculum_pdf', this.form.value.curriculum_pdf);
      }

      if (this.specialitiesSelect.length > 0) {
        for (let assistanceSpecial of this.specialitiesSelect) {
          formData.append('special_field[]', assistanceSpecial);
        }
      } else {
        formData.append('special_field', null);
      }

      try {
        let x;

        if (!this.data?.id) {
          x = await this.userBS.SavePublic(formData);
        } else {
          x = await this.userBS.UpdatePublic(formData, this.data.id);
        }

        this.toastService.success('', x.message);
        this.messageError = null;
        if (!this.isTeacher) {
          if (this.isPublic) {
            if (this.redirectTo)
              await this.router.navigateByUrl(this.redirectTo);
            else if (this.routeBack)
              await this.router.navigateByUrl(this.routeBack);
            else
              this.redirectTo = '/public/register/' + this.route.snapshot.params.role + '/success';
            // await this.router.navigateByUrl('/auth');
          } else {
            if (this.routeBack)
              await this.router.navigateByUrl(this.routeBack);
          }
        } else {
          await this.router.navigateByUrl(this.routeBack);
          //await this.router.navigateByUrl('/public/register/' + this.route.snapshot.params.role + '/success');
          // console.log('/public/register/' + this.route.snapshot.params.role + '/success');
        }

      } catch (x) {
        this.messageError = x;
        this.isSubmitted = false;
        this.loading = false;
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  mayus(e) {
    e.value = e.value.toUpperCase();
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
    this.form.get('country_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.regions = [];
      } else {
        this.GetRegions(val).then();
      }
      this.form.patchValue({
        region_id: '',
        birthplace_municipality_id: '',
      });
    });

    this.form.get('region_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.municipalities = [];
      } else {
        this.GetMunicipalities(val).then();
      }
      this.form.patchValue({
        birthplace_municipality_id: '',
      });
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
    });

    this.form.get('residence_municipality_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.neighborhood_or_residence = [];
        this.localities = [];
      } else if(val == 11001) { 
        this.neighborhood_or_residence = [];
        this.GetLocality(val).then();
      } else {
        this.GetNeighborhoodResidence(val).then();
      }
      this.form.patchValue({
        locality_id: '',
        localities_id: [],
        neighborhood_or_residence_id: '',
      });
    });

    this.form.get('locality_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.neighborhood_or_residence = [];
      } else {
        this.GetNeighborhoodResidence(null,val).then();
      }
      this.form.patchValue({
        neighborhood_or_residence_id: '',
      });
    });

    this.form.get('ne')

    this.form.get('is_disability').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('disability').setValidators(Validators.required);
        this.form.get('disability').updateValueAndValidity();
      } else {
        this.form.get('disability').clearValidators();
        this.form.get('disability').updateValueAndValidity();
      }
    });
    // if (this.role == 3 || this.role==7) {
    //   this.form.get('type_professional_id').valueChanges.subscribe(val => {
    //     if (val) {
    //       console.log(val);
    //       this.GetAuxData(val);
    //     }
    //   });
    // }

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
  
  GetNeighborhoodResidence(municipality_id? , locality_id?) {
    if(municipality_id){
      if (!municipality_id || municipality_id === '') return Promise.resolve(false);
      return this.locationBS.GetNeighborhoodResidenceByMunicipality(municipality_id).then(x => {
        this.neighborhood_or_residence = x;
        return Promise.resolve(true);
      });
    } else if(locality_id){
      if (!locality_id || locality_id === '') return Promise.resolve(false);
      return this.locationBS.GetNeighborhoodResidenceByLocality(locality_id).then(x => {
        this.neighborhood_or_residence = x;
        return Promise.resolve(true);
      });
    }
  }

  ShowDialogSpecialities() {
    this.selected = [];
    this.data?.assistance[0]?.special_field.forEach(element => {
      this.selected.push(element.special_field_id);
    });


    this.dialog.open(SpecialitiesDialogComponent, {
      context: {
        specialities: this.specialities,
        SelectedAssistanceSpecial: this.SelectedAssistanceSpecial.bind(this),
        specialitiesSelect: this.specialitiesSelect,
        initSpecialities: this.selected ?? [],
      },

    });


  }


  SelectedAssistanceSpecial(value, assistanceSpecial) {
    if (value) {
      if (!this.specialitiesSelect.includes(assistanceSpecial.id)) {
        this.specialitiesSelect.push(assistanceSpecial.id);
      }
    } else {
      if (this.specialitiesSelect.includes(assistanceSpecial.id)) {
        this.specialitiesSelect.splice(this.specialitiesSelect.indexOf(assistanceSpecial.id), 1);
      }
    }
  }



  getInputTypePassword() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  getInputTypeConfirmPassword() {
    if (this.showConfirmPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async changeFile(files, option) {
    if (!files) return false;

    const file = await this.toBase64(files.target.files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          file_firm: files.target.files[0],
        });
        break;
      case 2:
        this.form.patchValue({
          file: files.target.files[0],
        });
        break;
    }
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  ageCalculator(birthday: Date) {
    var today = new Date;
    var age = new Date(birthday)
    var year = today.getFullYear() - age.getFullYear();
    var m = (today.getMonth() + 1) - (age.getMonth() + 1);
    var Month = age.getMonth();
    var day = today.getDate() - (age.getDate()+1);
    if( m < 0)
    {
      year--;
      m = m + 12;
    }
    if(day < 0)
    { 
      m--;
      if(Month==1)
      {
        day=day+28
      }
      else if( Month==0 || Month==2 || Month==4 || Month==6 || Month==7 || Month==9 || Month==11 ) 
      { 
        day=day+31;
      } 
      else 
      {
        day=day+30;
      }
    }

    this.age = year + " años " + m + " meses y " + day + " dia(s) ";

  }

  receiveMessage($event) {
    this.parentData.selectedOptions = $event;
    
  }
}
