import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {StatusBusinessService} from '../../../../business-controller/status-business.service';
import {AdmissionsService} from '../../../../business-controller/admissions.service';
import {AdmissionRouteService} from '../../../../business-controller/admission-route.service';
import {ScopeOfAttentionService} from '../../../../business-controller/scope-of-attention.service';
import {ProgramService} from '../../../../business-controller/program.service';
import {PavilionService} from '../../../../business-controller/pavilion.service';
import {FlatService} from '../../../../business-controller/flat.service';
import {BedService} from '../../../../business-controller/bed.service';
import {ContractService} from '../../../../business-controller/contract.service';
import {DiagnosisService} from '../../../../business-controller/diagnosis.service';



@Component({
  selector: 'ngx-form-admissions-patient',
  templateUrl: './form-admissions-patient.component.html',
  styleUrls: ['./form-admissions-patient.component.scss']
})
export class FormAdmissionsPatientComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;

  public form: FormGroup;
  public rips_typefile: any[];
  // public status: Status[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public coverage:any[];
  public admission_route:any[];
  public scope_of_attention:any[];
  public program:any[];
  public pavilion:any[];
  public flat:any[];
  public bed:any[];
  public contract:any[];
  public diagnosis:any[] = [];
  public campus_id;
  public ambit;
  public show_diagnostic: boolean= false;
  public diagnosis_id;
  public showTable;


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
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        admission_route_id: '',
        scope_of_attention_id: '',
        program_id: '',
        flat_id: '',
        pavilion_id: '',
        bed_id: '',
        contract_id: '',
        has_caregiver: false,
      };
    }

    this.campus_id = localStorage.getItem('campus');
     this.AdmissionRouteS.GetCollection().then(x => {
       this.admission_route = x;
     });
    this.FlatS.GetFlatByCampus(this.campus_id).then(x => {
      this.flat = x;
    });
    this.ContractS.GetCollection().then(x => {
      this.contract = x;
    });
    this.DiagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });
    


    
    this.form = this.formBuilder.group({      
      diagnosis_id: [this.data.diagnosis_id, Validators.compose([Validators.required])],
      admission_route_id: [this.data.admission_route_id, Validators.compose([Validators.required])],
      scope_of_attention_id: [this.data.scope_of_attention_id, Validators.compose([Validators.required])],
      program_id: [this.data.program_id, Validators.compose([Validators.required])],
      flat_id: [this.data.flat_id, Validators.compose([Validators.required])],
      pavilion_id: [this.data.pavilion_id, Validators.compose([Validators.required])],
      bed_id: [this.data.bed_id, Validators.compose([Validators.required])],
      contract_id: [this.data.contract_id, Validators.compose([Validators.required])],
      has_caregiver: [this.data.has_caregiver, Validators.compose([Validators.required])],
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
          campus_id: this.campus_id,
          user_id:this.user_id
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
        this.AdmissionsS.Save({
          diagnosis_id: this.diagnosis_id,
          admission_route_id: this.form.controls.admission_route_id.value,
          scope_of_attention_id: this.form.controls.scope_of_attention_id.value,
          program_id: this.form.controls.program_id.value,
          flat_id: this.form.controls.flat_id.value,
          pavilion_id: this.form.controls.pavilion_id.value,
          bed_id: this.form.controls.bed_id.value,
          contract_id: this.form.controls.contract_id.value,
          campus_id: this.campus_id,
          user_id:this.user_id
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
      }

    }
  }
  async ShowDiagnostic(e){
    // console.log(e);
    if(e==1){
      this.show_diagnostic = true;
       
    }
  }
  
  showCaregiver(e){
    this.showTable = e.target.checked;
  }

  onChanges() {
    this.form.get('admission_route_id').valueChanges.subscribe(val => {
      // console.log(val);
      if (val === '') {
        this.scope_of_attention = [];
      } else {
        this.GetScope(val).then();
      }
      this.form.patchValue({
        scope_of_attention_id: '',
      });
    });

    this.form.get('scope_of_attention_id').valueChanges.subscribe(val => {
      if (val === '') {
        this.program = [];
      } else {
        this.ambit=val;
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
        this.GetBed(val,this.ambit).then();
      }
      this.form.patchValue({
        bed_id: '',
      });
    });
  }

  saveCode(e): void{
    var localidentify=this.diagnosis.find(item => item.name == e);

    if(localidentify){
      this.diagnosis_id = localidentify.id;
    }else{
      this.diagnosis_id = null;
    }
  }

  async GetScope(admission_route_id, job = false) {
    if (!admission_route_id || admission_route_id === '') return Promise.resolve(false);

    return await this.ScopeOfAttentionS.GetScopeByAdmission(admission_route_id).then(x => {
        
      if(admission_route_id==1){
          this.scope_of_attention = x;
          this.scope_of_attention.shift();
        }else{
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
    return this.BedS.GetBedByPavilion(pavilion_id,ambit).then(x => {
        this.bed = x;

      return Promise.resolve(true);
    });
  }

}
