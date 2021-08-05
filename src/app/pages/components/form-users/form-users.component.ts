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
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'ngx-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent implements OnInit {
  @Input() data: any = null;
  @Input() routes = null;
  @Input() role = null;
  @Input() title = null;
  @Input() routeBack = null;
  @Input() isPublic = false;
  @Input() loadingData = false;
  @Input() redirectTo = null;

  public messageError = null;
  public form: FormGroup;
  public isSubmitted: boolean = false;

  public identification_types: IdentificationType[] = [];
  public genders: Gender[] = [];
  public ethnicitys: Ethnicity[] = [];
  public countries: Country[] = [];
  public regions: Region[] = [];
  public municipalities: Municipality[] = [];
  public status: Status[] = [];
  public job_regions: Region[] = [];
  public job_municipalities: Municipality[] = [];
  public entities: Entity[] = [];
  public positions: Position[] = [];
  public academyLevels: AcademicLevel[] = [];
  public offices: Office[] = [];
  public specialties: Specialty[] = [];
  public dependences: Dependence[] = [];
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
    private route: ActivatedRoute,
    private dialog: NbDialogService,
  ) {
  }

  async ngOnInit() {
    if (this.GetData('curriculum.curriculum_pdf')) {
      this.previewCurriculum = environment.storage + this.data.curriculum.curriculum_pdf;
    }
    this.LoadForm(false).then();
    await Promise.all([
      this.GetAuxData(),
    ]);
    this.course_id = this.route.snapshot.queryParams.course_id;
    this.loadAuxData = false;
    this.LoadForm().then();
    // this.today = new Date().toISOString().split("T")[0];
    this.today = new Date();

    this.today.setDate(this.today.getDate() - 2);
    this.today = this.today.toISOString().split('T')[0];
  }

  GetAuxData() {
    return this.userBS.GetFormAuxData(this.data ? false : true).then(x => {
      this.identification_types = x.identificationTypes;
      this.countries = x.countries;
      this.genders = x.genders;
      this.ethnicitys = x.ethnicitys;
      x.entities.forEach(element => {
        if (element.is_judicial == 0) {
          this.entities.push(element);
        }
      });
      x.positions.forEach(element => {
        if (element.is_judicial == 0) {
          this.positions.push(element);
        }
      });
      this.status = x.status;
      this.academyLevels = x.academicLevels;
      this.offices = x.offices;
      this.specialties = x.specialties;
      this.dependences = x.dependences;
      this.sectionals = x.sectionalCouncils;
      this.categories = x.categories;

      return Promise.resolve(true);
    });
  }

  async LoadForm(force = true) {

    if (this.loadAuxData && force) return false;
    if (this.data) {
      const promises = [
        this.GetRegions(this.data.country_id),
        this.GetMunicipalities(this.data.region_id),
      ];

      if (this.data.curriculum) {
        promises.push(this.GetRegions(this.data.curriculum.country_id, true));
        promises.push(this.GetMunicipalities(this.data.curriculum.region_id, true));

        if (this.data.is_judicial_branch) {
          promises.push(this.GetDistrictBySectional(this.data.curriculum.sectional_council_id));
          promises.push(this.GetCircuitByDistrict(this.data.curriculum.district_id));
        }
      }

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
        Validators.compose([Validators.required]),
      ],
      confirm_password: [
        '',
        Validators.compose([Validators.required]),
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
      job_country_id: [
        this.GetData('curriculum.country_id'),
        Validators.compose([Validators.required]),
      ],
      job_region_id: [
        this.GetData('curriculum.region_id'),
        Validators.compose([Validators.required]),
      ],
      municipality_id: [
        this.GetData('curriculum.municipality_id'),
        Validators.compose([Validators.required]),
      ],
      entity_id: [
        this.GetData('curriculum.entity_id'),
        Validators.compose([Validators.required]),
      ],
      position_id: [
        this.GetData('curriculum.position_id'),
        Validators.compose([Validators.required]),
      ],
      curriculum_pdf: [
        this.previewCurriculum,
      ],
      academic_level_id: [
        this.GetData('academic_level_id'),
        Validators.compose([Validators.required]),
      ],
      host: [
        window.location.origin,
        Validators.compose([Validators.required]),
      ],
    };

    // if (this.role === 4) {
    //   configForm = {
    //     ...configForm,
    //     office_id: [
    //       this.GetData('curriculum.office_id'),
    //       Validators.compose([Validators.required]),
    //     ],
    //     specialty_id: [
    //       this.GetData('curriculum.specialty_id'),
    //       Validators.compose([Validators.required]),
    //     ],
    //     dependence_id: [
    //       this.GetData('curriculum.dependence_id'),
    //       Validators.compose([Validators.required]),
    //     ],
    //     sectional_council_id: [
    //       this.GetData('curriculum.sectional_council_id'),
    //       Validators.compose([Validators.required]),
    //     ],
    //     district_id: [
    //       this.GetData('curriculum.district_id'),
    //       Validators.compose([Validators.required]),
    //     ],
    //     circuit_id: [
    //       this.GetData('curriculum.circuit_id'),
    //       Validators.compose([Validators.required]),
    //     ],
    //     is_judicial_branch: [
    //       ((this.GetData('is_judicial_branch') === '' || this.GetData('is_judicial_branch') === null || !this.GetData('is_judicial_branch')) ? false : true),
    //       Validators.compose([Validators.required]),
    //     ],
    //   };
    // } else {

    configForm = {
      ...configForm,
      office_id: [
        this.GetData('curriculum.office_id'),
      ],
      specialty_id: [
        this.GetData('curriculum.specialty_id'),
      ],
      dependence_id: [
        this.GetData('curriculum.dependence_id'),
      ],
      sectional_council_id: [
        this.GetData('curriculum.sectional_council_id'),
      ],
      district_id: [
        this.GetData('curriculum.district_id'),
      ],
      circuit_id: [
        this.GetData('curriculum.circuit_id'),
      ],
      is_judicial_branch: [
        ((this.GetData('is_judicial_branch') === '' || this.GetData('is_judicial_branch') === null || !this.GetData('is_judicial_branch')) ? false : true),
        Validators.compose([Validators.required]),
      ],
    };
    // }

    if (this.data && this.data.id) {
      configForm.password = [
        '',
      ];

      configForm.confirm_password = [
        '',
      ];
    }
    this.form = this.formBuilder.group(configForm);

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

  async SaveStudent() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      var formData = new FormData();
      var data = this.form.controls;

      formData.append('status_id', data.status_id.value);
      formData.append('gender_id', data.gender_id.value);
      formData.append('is_disability', data.is_disability.value === true ? "1" : null);
      formData.append('disability', data.is_disability.value === false ? '':data.disability.value);
      formData.append('gender_type', data.gender_id.value === 3 ? data.gender_type.value:'');
      formData.append('academic_level_id', data.academic_level_id.value);
      formData.append('identification_type_id', data.identification_type_id.value);
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
      formData.append('username', data.email.value);
      formData.append('municipality_id', data.municipality_id.value);
      formData.append('is_judicial_branch', data.is_judicial_branch.value === true ? "1" : null);
      formData.append('password', data.password.value);
      formData.append('region_id', data.job_region_id.value);
      formData.append('entity_id', data.entity_id.value);
      formData.append('position_id', data.position_id.value);
      formData.append('curriculum_pdf', this.form.value.curriculum_pdf);


      if (this.course_id) {
        formData.append('course_id', this.course_id);
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
      if (this.categoriesSelect.length > 0) {
        for (let category of this.categoriesSelect) {
          formData.append('categories[]', category);
        }
        //formData.append('categories', JSON.stringify(this.categoriesSelect));
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
        if (this.isPublic) {
          if (this.redirectTo)
            await this.router.navigateByUrl(this.redirectTo);
          else if (this.routeBack)
            await this.router.navigateByUrl(this.routeBack);
          else
            await this.router.navigateByUrl('/auth');
        } else {
          if (this.routeBack)
            await this.router.navigateByUrl(this.routeBack);
        }

      } catch (x) {
        this.messageError = x;
        this.isSubmitted = false;
        this.loading = false;
      }

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
        this.form.get('office_id').setValidators(Validators.required);
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

    this.form.get('job_country_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.job_regions = [];
      } else {
        this.GetRegions(val, true).then();
      }
      this.form.patchValue({
        job_region_id: '',
        municipality_id: '',
      });
    });

    this.form.get('job_region_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.job_municipalities = [];
      } else {
        this.GetMunicipalities(val, true).then();
      }
      this.form.patchValue({
        municipality_id: '',
      });
    });

    this.form.get('sectional_council_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.districts = [];
      } else {
        this.GetDistrictBySectional(val).then();
      }
      this.form.patchValue({
        district_id: '',
        circuit_id: '',
      });
    });

    this.form.get('district_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.circuits = [];
      } else {
        this.GetCircuitByDistrict(val).then();
      }
      this.form.patchValue({
        circuit_id: '',
      });
    });

    this.form.get('is_disability').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('disability').setValidators(Validators.required);
        this.form.get('disability').updateValueAndValidity();
      }else{
        this.form.get('disability').clearValidators();
        this.form.get('disability').updateValueAndValidity();
      }
    });
        
    this.form.get('is_judicial_branch').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('office_id').setValidators(Validators.required);
        this.form.get('office_id').updateValueAndValidity();
        this.form.get('specialty_id').setValidators(Validators.required);
        this.form.get('specialty_id').updateValueAndValidity();
        this.form.get('dependence_id').setValidators(Validators.required);
        this.form.get('dependence_id').updateValueAndValidity();
        this.form.get('sectional_council_id').setValidators(Validators.required);
        this.form.get('sectional_council_id').updateValueAndValidity();
        this.form.get('district_id').setValidators(Validators.required);
        this.form.get('district_id').updateValueAndValidity();
        this.form.get('circuit_id').setValidators(Validators.required);
        this.form.get('circuit_id').updateValueAndValidity();
        this.entities = [];
        this.positions = [];
        this.userBS.GetFormAuxData(this.data ? false : true).then(x => {
          x.entities.forEach(element => {
            if (element.is_judicial == 1) {
              this.entities.push(element);
            }
          });
          x.positions.forEach(element => {
            if (element.is_judicial == 1) {
              this.positions.push(element);
            }
          });
        })
      } else {
        this.form.get('office_id').clearValidators();
        this.form.get('office_id').updateValueAndValidity();
        this.form.get('specialty_id').clearValidators();
        this.form.get('specialty_id').updateValueAndValidity();
        this.form.get('dependence_id').clearValidators();
        this.form.get('dependence_id').updateValueAndValidity();
        this.form.get('sectional_council_id').clearValidators();
        this.form.get('sectional_council_id').updateValueAndValidity();
        this.form.get('district_id').clearValidators();
        this.form.get('district_id').updateValueAndValidity();
        this.form.get('circuit_id').clearValidators();
        this.form.get('circuit_id').updateValueAndValidity();
        this.userBS.GetFormAuxData(this.data ? false : true).then(x => {
          this.entities = [];
          this.positions = [];
          x.entities.forEach(element => {
            if (element.is_judicial == 0) {
              this.entities.push(element);
            }
          });
          x.positions.forEach(element => {
            if (element.is_judicial == 0) {
              this.positions.push(element);
            }
          });
        })
      }
    });

  }

  GetRegions(country_id, job = false) {
    if (!country_id || country_id === '') return Promise.resolve(false);

    return this.locationBS.GetPublicRegionByCountry(country_id).then(x => {
      if (job)
        this.job_regions = x;
      else
        this.regions = x;

      return Promise.resolve(true);
    });
  }

  GetMunicipalities(region_id, job = false) {
    if (!region_id || region_id === '') return Promise.resolve(false);
    return this.locationBS.GetPublicMunicipalitiesByRegion(region_id).then(x => {
      if (job)
        this.job_municipalities = x;
      else
        this.municipalities = x;

      return Promise.resolve(true);
    });
  }

  GetDistrictBySectional(sectional_council_id) {
    if (!sectional_council_id || sectional_council_id === '') return Promise.resolve(false);
    return this.districtBS.GetPublicCollection({
      status_id: 1,
      sectional_council_id,
      pagination: false,
    }).then(x => {
      this.districts = x;
      return Promise.resolve(true);
    });
  }

  GetCircuitByDistrict(district_id) {
    if (!district_id || district_id === '') return Promise.resolve(false);
    return this.circuitBS.GetPublicCollection({
      status_id: 1,
      district_id,
      pagination: false,
    }).then(x => {
      this.circuits = x;
      return Promise.resolve(true);
    });
  }

  ShowDialogCategories() {
    this.dialog.open(CategoriesDialogComponent, {
      context: {
        categories: this.categories,
        SelectedCategory: this.SelectedCategory.bind(this),
        categoriesSelect: this.categoriesSelect,
        initCategories: this.data?.categories ?? [],
      },
    });
  }

  SelectedCategory(value, category) {
    if (value) {
      if (!this.categoriesSelect.includes(category.id)) {
        this.categoriesSelect.push(category.id);
      }
    } else {
      if (this.categoriesSelect.includes(category.id)) {
        this.categoriesSelect.splice(this.categoriesSelect.indexOf(category.id), 1);
      }
    }
  }

  async changeImage(files, option) {
    if (!files.length) return false;

    const file = await this.toBase64(files[0]);

    switch (option) {
      case 1:
        this.form.patchValue({
          curriculum_pdf: files[0],
        });
        // this.previewCurriculum = file;
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
