import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { TlTherapyLanguageService } from '../../../../business-controller/tl-therapy-language.service';
import { InputMaterialsUsedTlService } from '../../../../business-controller/input-materials-used-tl.service';
import { OstomiesTlService } from '../../../../business-controller/ostomies-tl.service';
import { OrofacialTl } from '../../../../models/orofacial-tl';
import { OrofacialTlService } from '../../../../business-controller/orofacial-tl.service';

@Component({
  selector: 'ngx-form-language-orofacial',
  templateUrl: './form-language-orofacial.component.html',
  styleUrls: ['./form-language-orofacial.component.scss'],
})
export class FormLanguageOrofacialComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public medical_diagnostic_id: any[]; 
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;
  public diagnosis: any[];
 


  constructor(

    private formBuilder: FormBuilder,
    private OrofacialTlS: OrofacialTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });
    if (!this.data || this.data.length == 0) {
      this.data = {
        right_hermiface_symmetry: '', 
        right_hermiface_tone: '', 
        right_hermiface_sensitivity: '',
        left_hermiface_symmetry: '', 
        left_hermiface_tone: '',
        left_hermiface_sensitivity: '', 

      };
    }
    this.form = this.formBuilder.group({
      right_hermiface_symmetry: [this.data[0] ? this.data[0].right_hermiface_symmetry : this.data.right_hermiface_symmetry,Validators.compose([Validators.required]),],
      right_hermiface_tone: [this.data[0] ? this.data[0].right_hermiface_tone : this.data.right_hermiface_tone,Validators.compose([Validators.required]),],
      right_hermiface_sensitivity: [this.data[0] ? this.data[0].right_hermiface_sensitivity : this.data.right_hermiface_sensitivity,Validators.compose([Validators.required]),],
      left_hermiface_symmetry: [this.data[0] ? this.data[0].left_hermiface_symmetry : this.data.left_hermiface_symmetry, Validators.compose([Validators.required]),],
      left_hermiface_tone: [this.data[0] ? this.data[0].left_hermiface_tone : this.data.left_hermiface_tone,Validators.compose([Validators.required]),],
      left_hermiface_sensitivity: [this.data[0] ? this.data[0].left_hermiface_sensitivity : this.data.left_hermiface_sensitivity, Validators.compose([Validators.required]),],
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.OrofacialTlS.Update({
          id: this.data.id,
          right_hermiface_symmetry: this.form.controls.right_hermiface_symmetry.value,
          right_hermiface_tone: this.form.controls.right_hermiface_tone.value,
          right_hermiface_sensitivity: this.form.controls.right_hermiface_sensitivity.value,
          left_hermiface_symmetry: this.form.controls.left_hermiface_symmetry.value,
          left_hermiface_tone: this.form.controls.left_hermiface_tone.value,
          left_hermiface_sensitivity: this.form.controls.left_hermiface_sensitivity.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.OrofacialTlS.Save({
          right_hermiface_symmetry: this.form.controls.right_hermiface_symmetry.value,
          right_hermiface_tone: this.form.controls.right_hermiface_tone.value,
          right_hermiface_sensitivity: this.form.controls.right_hermiface_sensitivity.value,
          left_hermiface_symmetry: this.form.controls.left_hermiface_symmetry.value,
          left_hermiface_tone: this.form.controls.left_hermiface_tone.value,
          left_hermiface_sensitivity: this.form.controls.left_hermiface_sensitivity.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({  });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          if (this.form.controls.has_caregiver.value == true) {
            this.isSubmitted = true;
            this.loading = true;
          } else {
            this.isSubmitted = false;
            this.loading = false;
          }

        });
        this.messageEvent.emit(true);
      }

    }
  }

}