import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { PatientDataService } from '../../../../business-controller/patient-data.service';
import { IdentificationTypeBusinessService } from '../../../../business-controller/identification-type-business.service';
import { RelationshipService } from '../../../../business-controller/relationship.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { MaritalStatusService } from '../../../../business-controller/marital_status.service';
import { AcademicLevelService } from '../../../../business-controller/academic_level.service';
import { StudyLevelStatusService } from '../../../../business-controller/study_level_status.service';
import { ActivitiesService } from '../../../../business-controller/activities.service';
import { ChSwFamilyService } from '../../../../business-controller/ch_sw_family.service';


@Component({
  selector: 'ngx-form-sw-family',
  templateUrl: './form-sw-family.component.html',
  styleUrls: ['./form-sw-family.component.scss']
})
export class FormSwFamilyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;



  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public disabled: boolean = false;
  public identification_types: any[] = [];
  public realtionships: any[] = [];
  public marital_status: any[] = [];
  public academyLevels: any[] = [];
  public study_level_status: any[] = [];
  public activities: any[] = [];
  public loadAuxData = true;
  public activities_id;


  constructor(
    // protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private userBS: UserBusinessService,
    // private statusBS: StatusBusinessService,
    private PatientDataS: PatientDataService,
    private toastService: NbToastrService,
    private identificationTypeBS: IdentificationTypeBusinessService,
    private relationshipS: RelationshipService,
    private maritalS: MaritalStatusService,
    private academyS: AcademicLevelService,
    private levelS: StudyLevelStatusService,
    private activitiesS: ActivitiesService,
    private familyS: ChSwFamilyService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        firstname: '',
        middlefirstname: '',
        lastname: '',
        middlelastname: '',
        range_age: '',
        identification: '',
        phone: '',
        landline: '',
        email: '',
        residence_address: '',
        //is_disability: '',
        relationship_id: '',
        identification_type_id: '',
        marital_status_id: '',
        academic_level_id: '',
        study_level_status_id: '',
        activities_id: '',
        //inability_id: ''
      };
    }

    this.identificationTypeBS.GetCollection().then(x => {
      this.identification_types = x;
    });

    this.relationshipS.GetCollection().then(x => {
      this.realtionships = x;
    });

    this.maritalS.GetCollection().then(x => {
      this.marital_status = x;
    });

    this.academyS.GetCollection().then(x => {
      this.academyLevels = x;
    });

    this.levelS.GetCollection().then(x => {
      this.study_level_status = x;
    });

    this.activitiesS.GetCollection().then(x => {
      this.activities = x;
    });

    this.form = this.formBuilder.group({

      firstname: [this.data[0] ? this.data[0].firstname : this.data.firstname,],
      middlefirstname: [this.data[0] ? this.data[0].middlefirstname : this.data.middlefirstname,],
      lastname: [this.data[0] ? this.data[0].lastname : this.data.lastname,],
      middlelastname: [this.data[0] ? this.data[0].middlelastname : this.data.middlelastname,],
      range_age: [this.data[0] ? this.data[0].range_age : this.data.range_age,],
      identification: [this.data[0] ? this.data[0].identification : this.data.identification,],
      phone: [this.data[0] ? this.data[0].phone : this.data.phone,],
      landline: [this.data[0] ? this.data[0].landline : this.data.landline,],
      email: [this.data[0] ? this.data[0].email : this.data.email,],
      residence_address: [this.data[0] ? this.data[0].residence_address : this.data.residence_address,],
      is_disability: [this.data[0] ? this.data[0].is_disability : this.data.is_disability,],
      relationship_id: [this.data[0] ? this.data[0].relationship_id : this.data.relationship_id,],
      identification_type_id: [this.data[0] ? this.data[0].identification_type_id : this.data.identification_type_id,],
      marital_status_id: [this.data[0] ? this.data[0].marital_status_id : this.data.marital_status_id,],
      academic_level_id: [this.data[0] ? this.data[0].academic_level_id : this.data.academic_level_id,],
      study_level_status_id: [this.data[0] ? this.data[0].study_level_status_id : this.data.study_level_status_id,],
      activities_id: [this.data[0] ? this.data[0].activities_id : this.data.activities_id,],
      inability_id: [this.data[0] ? this.data[0].inability_id : this.data.inability_id,],
    });

    this.loadAuxData = false;

  }


  saveCode(e): void {
    var localidentify = this.activities.find(item => item.name == e);

    if (localidentify) {
      this.activities_id = localidentify.id;
    } else {
      this.activities_id = null;
      this.toastService.warning('', 'Debe seleccionar un item de la lista');
      this.form.controls.activities_id.setErrors({ 'incorrect': true });
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


  // async LoadForm(force = true) {
  //   if (this.loadAuxData && force) return false;
  //   if (this.data) {
  //     const promises = [
  //     ];

  //     await Promise.all(promises);
  //   }

  //   let configForm: any = {

  //     marital_status_id: [
  //       this.GetData('marital_status_id'),
  //       Validators.compose([Validators.required]),
  //     ],
  //     study_level_status_id: [
  //       this.GetData('study_level_status_id'),
  //       Validators.compose([Validators.required]),
  //     ],
  //     activities_id: [
  //       this.returnProfession(this.GetData('activities_id')),
  //       Validators.compose([Validators.required]),
  //     ],

  //   };
  // }



  save() {
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.familyS.Update({
          id: this.data.id,
          firstname: this.form.controls.firstname.value,
          middlefirstname: this.form.controls.middlefirstname.value,
          lastname: this.form.controls.lastname.value,
          middlelastname: this.form.controls.middlelastname.value,
          range_age: this.form.controls.range_age.value,
          identification: this.form.controls.identification.value,
          phone: this.form.controls.phone.value,
          landline: this.form.controls.landline.value,
          email: this.form.controls.email.value,
          residence_address: this.form.controls.residence_address.value,
          //is_disability: this.form.controls.is_disability.value,
          relationship_id: this.form.controls.relationship_id,
          identification_type_id: this.form.controls.identification_type_id.value,
          marital_status_id: this.form.controls.marital_status_id.value,
          academic_level_id: this.form.controls.academic_level_id.value,
          study_level_status_id: this.form.controls.study_level_status_id.value,
          activities_id: this.form.controls.activities_id.value,
          //inability_id: this.form.controls.inability_id,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.familyS.Save({
          firstname: this.form.controls.firstname.value,
          middlefirstname: this.form.controls.middlefirstname.value,
          lastname: this.form.controls.lastname.value,
          middlelastname: this.form.controls.middlelastname.value,
          range_age: this.form.controls.range_age.value,
          identification: this.form.controls.identification.value,
          phone: this.form.controls.phone.value,
          landline: this.form.controls.landline.value,
          email: this.form.controls.email.value,
          residence_address: this.form.controls.residence_address.value,
          //is_disability: this.form.controls.is_disability.value,
          relationship_id: this.form.controls.relationship_id,
          identification_type_id: this.form.controls.identification_type_id.value,
          marital_status_id: this.form.controls.marital_status_id.value,
          academic_level_id: this.form.controls.academic_level_id.value,
          study_level_status_id: this.form.controls.study_level_status_id.value,
          activities_id: this.form.controls.activities_id.value,
          //inability_id: this.form.controls.inability_id,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          if (!x.data) {
            this.toastService.warning('', x.message)
            this.isSubmitted = false;
            this.loading = false;
          } else {
            this.toastService.success('', x.message);
            // this.close();
            if (this.saved) {
              this.saved();
            }

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    }
  }

  receiveMessage($event) {
    if ($event[0] == true) {
      this.save();
    } else if ($event[1] == true) {
      this.showTable = true;
      this.savedUser = false;
      this.admission_id = $event[2];
    }
  }

}
