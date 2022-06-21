import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { TlTherapyLanguageService } from '../../../../business-controller/tl-therapy-language.service';
import { TherapyConceptTlService } from '../../../../business-controller/therapy-concept-tl.service';

@Component({
  selector: 'ngx-form-language-concept',
  templateUrl: './form-language-concept.component.html',
  styleUrls: ['./form-language-concept.component.scss'],
})
export class FormLanguageConceptComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public text: any[]; 
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;
  

  constructor(

    private formBuilder: FormBuilder,
    private DiagnosisS: DiagnosisService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private TherapyConceptTlS: TherapyConceptTlService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        text: '',
      
      };
    }


    this.form = this.formBuilder.group({
      text: [this.data.text],
      
     
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.TherapyConceptTlS
          .Update({
            id: this.data.id,
            text: this.form.controls.text.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.TherapyConceptTlS.Save({
            text: this.form.controls.text.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ text: ''});
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

  // saveCode(e): void {
  //   var localidentify = this.diagnosis.find(item => item.name == e);

  //   if (localidentify) {
  //     this.diagnosis_id = localidentify.id;
  //   } else {
  //     this.diagnosis_id = null;
  //   }
  // }
}
