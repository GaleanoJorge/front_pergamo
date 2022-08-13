import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeConsentsService } from '../../../../business-controller/type-consents.service';
import { UserBusinessService } from '../../../../business-controller/user-business.service';
import { ConsentsInformedService } from '../../../../business-controller/consents-informed.service';
import { TypeOfAttentionService } from '../../../../business-controller/type-of-attention.service';
import { FrequencyService } from '../../../../business-controller/frequency.service';
import { SpecialtyService } from '../../../../business-controller/specialty.service';
import { RoleAttentionService } from '../../../../business-controller/role-attention.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { AdmissionsService } from '../../../../business-controller/admissions.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../../services/auth.service';
import { RelationshipService } from '../../../../business-controller/relationship.service';

@Component({
  selector: 'ngx-form-consents-informed',
  templateUrl: './form-consents-informed.component.html',
  styleUrls: ['./form-consents-informed.component.scss'],
})
export class FormConsentsInformedComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() medical: boolean = false;
  @Input() assigned: boolean;
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
  public show2 = false; 
  public show3 = false; 
  public show4 = false; 
  public show5 = false; 

  public showTemp = false;
  public product_gen: any[];
  public product_id;
  public configForm;
  public type_consents;
  public localidentify;
  public showUser = true;
  public admissions;
  public signatureImage;
  public signatureImage2;
  public currentImgResponsible;
  public currentImgPatiend;
  public service;
  public document = null;
  public user_id = null;
  public relationship: any[];
  public relationship_id;

  //   this.status = x;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ConsentsInformedS: ConsentsInformedService,
    private typeOfAttentionS: TypeOfAttentionService,
    private frequencyS: FrequencyService,
    private specialField: SpecialtyService,
    private userAssigned: UserBusinessService,
    private roleAttentionS: RoleAttentionService,
    private ProductGenS: ProductGenericService,
    private TypeConsentsS: TypeConsentsService,
    private serviceBriefcaseS: ServicesBriefcaseService,
    private admissionsS: AdmissionsService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private RelationshipS: RelationshipService
  ) {}

  ngOnInit(): void {
    // console.log(this.user);
    this.user = this.authService.GetUser();
    this.user_id = this.user.id;
    if (!this.data) {
      this.data = {
        id: '',
        type_consents_id: '',
        admissions_id: '',
        firm_patient: '',
        firm_responsible: '',
        assigned_user_id: '',
        name_responsible: '',
        identification_responsible: '',
        relationship_id: '',
        observations: '',
        because_patient: '',
        because_carer: '',
        number_contact: '',
        confirmation: '',
        dissent:'',
      };
    }

    this.RelationshipS.GetCollection().then((x) => {
      this.relationship = x;
    });
    this.TypeConsentsS.GetCollection().then((x) => {
      this.type_consents = x;
    });

    this.form = this.formBuilder.group({
      type_consents_id: [this.data.type_of_attention_id, Validators.compose([Validators.required]),],
      admissions_id: [this.data.admissions_id],
      firm_patient: [this.data.firm_patient],
      firm_responsible: [this.data.firm_responsible],
      assigned_user_id: [this.data.assigned_user_id],
      name_responsible: [this.data.name_responsible],
      identification_responsible: [this.data.identification_responsible],
      relationship_id: [this.data.relationship_id],
      observations: [this.data.observations],
      because_patient: [this.data.because_patient],
      because_carer: [this.data.because_carer],
      number_contact: [this.data.number_contact],
      confirmation: [this.data.confirmation],
      dissent: [this.data.dissent],

    });

    this.onChanges();
    
   
  }

  onChanges() {
    this.form.get('type_consents_id').valueChanges.subscribe((val) => {
      if (val == 1) {
        this.document =
          'assets/pdf/F-PSI-04-CONSENTIMIENTO-INFORMADO-PSICOLOGIA.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=false;
      } else if (val == 2) {
        this.document =
          'assets/pdf/F-ENF-31 CONSENTIMIENTO INFORMADO PROCEDIMIENTOS GENERALES ENFERMERIA.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=false;
      } else if (val == 3) {
        this.document =
          'assets/pdf/F-PAD-09 FORMATO CONSENTIMIENTO INFORMADO ALTA VOLUNTARIA.pdf';
          this.show4=false;
          this.show2=true;
          this.show5=false;
      } else if (val == 4) {
        this.document =
          'assets/pdf/F-PAD-10 FORMATO CONSENTIMIENTO INFORMADO TELETERAPIA.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=false;
      } else if (val == 5) {
        this.document =
          'assets/pdf/F-PAD-11 FORMATO CONSENTIMIENTO INFORMADO TERAPIA DE LENGUAJE.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=true;
      } else if (val == 6) {
        this.document =
          'assets/pdf/F-PAD-13 FORMATO CONSENTIMIENTO INFORMADO TERAPIA RESPIRATORIA.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=true;
      } else if (val == 7) {
        this.document =
          'assets/pdf/F-PAD-14 FORMATO CONSENTIMIENTO INFORMADO TERAPIA FISICA.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=true;
      } else if (val == 8) {
        this.document =
          'assets/pdf/F-PAD-15 FORMATO CONSENTIMIENTO INFORMADO TERAPIA OCUPACIONAL.pdf';
          this.show2=true; 
          this.show4=false;
          this.show5=true; 
      } else if (val == 9) {
        this.document =
          'assets/pdf/F-PAD-16 FORMATO DE DISENTIMIENTO INFORMADO - PAD.pdf';
          this.show4=false;
          this.show2=false;
          this.show5=false;
      } else if (val == 10) {
        this.document =
          'assets/pdf/F-PAD-17 FORMATO DE AUTORIZACIÓN REGISTRO FOTOGRAFICO - AUDIOVISUAL.pdf';
          this.show4=false;
          this.show2=true;
          this.show5=false;
      } else if (val == 11) {
        this.document =
          'assets/pdf/F-PAD-19 FORMATO CONSENTIMIENTO Y COMPROMISO - PAD.pdf';
          this.show2=true;
          this.show4=false;
          this.show5=false;
      }

      this.service = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.document
      );
    });
  }



  showImage(data, type) {
    if (type == 1) {
      this.signatureImage = data;
    } else {
      this.signatureImage2 = data;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      if (this.data.id) {
        this.ConsentsInformedS.Update({
          id: this.data.id,
          type_consents_id: this.form.controls.type_consents_id.value,
          admissions_id: this.admissions_id,
          firm_patient: this.form.controls.firm_patient.value,
          firm_responsible: this.form.controls.firm_responsible.value,
          assigned_user_id: this.user_id,
          name_responsible: this.form.controls.name_responsible.value,
      
          identification_responsible:this.form.controls.identification_responsible.value,

          relationship_id: this.form.controls.relationship_id.value,
          observations: this.form.controls.observations.value,
          because_patient: this.form.controls.because_patient.value,
          because_carer: this.form.controls.because_carer.value,
          number_contact: this.form.controls.number_contac.value,
          confirmation: this.form.controls.confirmation.value,
          dissent: this.form.controls.dissent.value,

        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        this.ConsentsInformedS.Save({
          type_consents_id: this.form.controls.type_consents_id.value,
          admissions_id: this.admissions_id,
          firm_patient: this.signatureImage,
          firm_responsible: this.signatureImage2,
          assigned_user_id: this.user_id,
          name_responsible: this.form.controls.name_responsible.value,
          identification_responsible:this.form.controls.identification_responsible.value,
          relationship_id: this.form.controls.relationship_id.value,
          observations: this.form.controls.observations.value,
          because_patient: this.form.controls.because_patient.value,
          because_carer: this.form.controls.because_carer.value,
          number_contact: this.form.controls.number_contact.value,
          confirmation: this.form.controls.confirmation.value,  //PACIENTE O RESPOSABLE
          dissent: this.form.controls.dissent.value, 

        })
          .then((x) => {
            this.toastService.success('', x.message);
            if (x['message_error']) {
              this.toastService.warning(x['message_error'], 'Error');
            }
            this.close();
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }

  returnCode(relationship_id){
    var localName = this.relationship.find(item => item.id == relationship_id);
    var nombre_relationship
    if(localName){
      nombre_relationship = localName.name;
    } else {
      nombre_relationship = ''
    }
    return nombre_relationship;
  }

  saveCode(e): void {
    var localidentify = this.procedure.find(
      (item) => item.manual_price.name == e
    );

    if (localidentify) {
      this.procedure_id = localidentify.id;
      this.form.controls.procedure_id.setErrors(null);
    } else {
      this.procedure_id = null;
      this.toastService.warning(
        '',
        'Debe seleccionar un procedimiento de la lista'
      );
      this.form.controls.procedure_id.setErrors({ incorrect: true });
    }
  }

  saveCode1(e): void {
    this.localidentify = this.product_gen.find(
      (item) => item.manual_price.name == e
    );

    if (this.localidentify) {
      this.product_id = this.localidentify.id;
      this.form.controls.product_gen.setErrors(null);
    } else {
      this.product_id = null;
      this.toastService.warning(
        '',
        'Debe seleccionar un Medicamento de la lista'
      );
      this.form.controls.product_gen.setErrors({ incorrect: true });
    }
  }
  saveCodeR(e): void {
    var localidentify = this.relationship.find(item => item.name == e);

    if (localidentify) {
      this.relationship_id = localidentify.id;
    } else {
      this.relationship_id = null;
    }
  }

 

  }

  


