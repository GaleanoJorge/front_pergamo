import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import { PatientDataService } from '../../../../business-controller/patient-data.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { AffiliateTypeService } from '../../../../business-controller/affiliate-type.service';
import { SpecialAttentionService } from '../../../../business-controller/special-attention.service';
import { IdentificationTypeBusinessService } from '../../../../business-controller/identification-type-business.service';
import { RelationshipService } from '../../../../business-controller/relationship.service';



@Component({
  selector: 'ngx-form-patient-data',
  templateUrl: './form-patient-data.component.html',
  styleUrls: ['./form-patient-data.component.scss']
})
export class FormPatientDataComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;

  public form: FormGroup;
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public diagnosis: any[] = [];
  public residence;
  public affiliate_type: any [] = [];
  public special_attention: any [] = [];
  public identification_types: any [] = [];
  public realtionships: any [] = [];

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    // private statusBS: StatusBusinessService,
    private PatientDataS: PatientDataService,
    private toastService: NbToastrService,
    private affiliateTypeS: AffiliateTypeService,
    private specialAttentionS: SpecialAttentionService,
    private identificationTypeBS: IdentificationTypeBusinessService,
    private relationshipS: RelationshipService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        patient_data_type: '',
        identification_type_id: '',
        identification: '',
        firstname: '',
        middlefirstname: '',
        lastname: '',
        middlelastname: '',
        phone: '',
        landline: '',
        email: '',
        residence_address: '',
        street: '',
        num1: '',
        num2: '',
        residence_address_cardinality: '',
        reference: '',
        affiliate_type_id: '',
        special_attention_id: '',
        relationship_id: '',
      };
    }

    this.affiliateTypeS.GetCollection().then(x => {
      this.affiliate_type = x;
    });

    this.specialAttentionS.GetCollection().then(x => {
      this.special_attention = x;
    });

    this.identificationTypeBS.GetCollection().then(x => {
      this.identification_types = x;
    });

    this.relationshipS.GetCollection().then(x => {
      this.realtionships = x;
    });

    this.form = this.formBuilder.group({
      patient_data_type: [
        this.data.patient_data_type, 
        // Validators.compose([Validators.required])
      ],
      identification_type_id: [
        this.data.identification_type_id, 
        // Validators.compose([Validators.required])
      ],
      identification: [
        this.data.identification,
        //  Validators.compose([Validators.required])
      ],
      firstname: [
        this.data.firstname, 
        // Validators.compose([Validators.required])
      ],
      middlefirstname: [
        this.data.middlefirstname, 
        // Validators.compose([Validators.required])
      ],
      lastname: [
        this.data.lastname, 
        Validators.compose([Validators.required])
      ],
      middlelastname: [
        this.data.middlelastname, 
        // Validators.compose([Validators.required])
      ],
      phone: [
        this.data.phone,
         Validators.compose([Validators.required])
      ],
      landline: [
        this.data.landline, 
        // Validators.compose([Validators.required])
      ],
      email: [
        this.data.email,
        //  Validators.compose([Validators.required])
      ],
    residence_address: [
        this.data.residence_address, 
        // Validators.compose([Validators.required])
      ],
    street: [
        this.data.street, 
        // Validators.compose([Validators.required])
      ],
      num1: [
        this.data.num1, 
        // Validators.compose([Validators.required])
      ],
      num2: [
        this.data.num2, 
        // Validators.compose([Validators.required])
      ],
      residence_address_cardinality: [
        this.data.residence_address_cardinality,
        // Validators.compose([Validators.required])
      ],
      reference: 
      [this.data.reference, 
        // Validators.compose([Validators.required])
      ],
      affiliate_type_id: [
        this.data.affiliate_type_id,
        //  Validators.compose([Validators.required])
      ],
      special_attention_id: [
        this.data.special_attention_id,
        //  Validators.compose([Validators.required])
      ],
      relationship_id: [
        this.data.special_attention_id,
        //  Validators.compose([Validators.required])
      ],
    });
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    this.residence = this.form.controls.residence_address.value + ' ' + this.form.controls.street.value + ' # ' + this.form.controls.num1.value + ' - ' +  this.form.controls.num2.value + ', ' + this.form.controls.residence_address_cardinality.value + ' ' + ' ( ' + this.form.controls.reference.value + ' ) '  ;
    this.isSubmitted = true;

    if (!this.form.invalid) {
      this.loading = true;

      if (this.data.id) {
        this.PatientDataS.Update({
          admission_id: this.admission_id,
          patient_data_type: this.form.controls.patient_data_type.value,
          identification_type_id: this.form.controls.identification_type_id.value, 
          identification: this.form.controls.identification.value, 
          firstname: this.form.controls.firstname.value, 
          middlefirstname: this.form.controls.middlefirstname.value, 
          lastname: this.form.controls.lastname.value, 
          middlelastname: this.form.controls.middlelastname.value, 
          phone: this.form.controls.phone.value, 
          landline: this.form.controls.landline.value, 
          email: this.form.controls.email.value, 
          residence_address: this.residence,
          affiliate_type_id: this.form.controls.affiliate_type_id.value, 
          special_attention_id: this.form.controls.special_attention_id.value,
          relationship_id: this.form.controls.relationship_id.value, 
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
        this.PatientDataS.Save({
          admissions_id: this.admission_id,
          patient_data_type: this.form.controls.patient_data_type.value,
          identification_type_id: this.form.controls.identification_type_id.value, 
          identification: this.form.controls.identification.value, 
          firstname: this.form.controls.firstname.value, 
          middlefirstname: this.form.controls.middlefirstname.value, 
          lastname: this.form.controls.lastname.value, 
          middlelastname: this.form.controls.middlelastname.value, 
          phone: this.form.controls.phone.value, 
          landline: this.form.controls.landline.value, 
          email: this.form.controls.email.value, 
          residence_address: this.residence,
          affiliate_type_id: this.form.controls.affiliate_type_id.value, 
          special_attention_id: this.form.controls.special_attention_id.value, 
          relationship_id: this.form.controls.relationship_id.value, 
        }).then(x => {
          if(!x.data){
            this.toastService.warning('', x.message)
            this.isSubmitted = false;
            this.loading = false;
          }else {
            this.toastService.success('', x.message);
            this.close();
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

}
