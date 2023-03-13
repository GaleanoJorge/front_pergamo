import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CifDiagnosisTlService } from '../../../../../../../business-controller/cif-diagnosis-tl.service';
import { ChRecordService } from '../../../../../../../business-controller/ch_record.service';

@Component({
  selector: 'ngx-form-language-evo-diagnosis', 
  templateUrl: './form-language-evo-diagnosis.component.html',
  styleUrls: ['./form-language-evo-diagnosis.component.scss'],
})
export class FormLanguageEvoDiagnosisComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public record_id;
  public admissions_id;
  public therapeutic_diagnosis_id: any[];
  public diagnosis_id;

  constructor(

    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private CifDiagnosisTlS: CifDiagnosisTlService,
    private route: ActivatedRoute
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {

    this.form = this.formBuilder.group({
      text: [this.data[0] ? this.data[0].text : this.data.text , Validators.compose([Validators.required]),],
    });
    
    if (!this.data.text && this.data.text != "") {   
      this.form.controls.text.disable();
      this.disabled = true;
    } else { 
      this.form.controls.text.enable();
      this.disabled = false;
    }
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data || this.data.length == 0) {
      this.data = {
        text: '',
      
      };
    }

    this.form = this.formBuilder.group({
      text: [this.data[0] ? this.data[0].text : this.data.text , Validators.compose([Validators.required]),],
    });

    if (!this.data.text && this.data.text != "") {   
      this.form.controls.text.disable();
      this.disabled = true;
    } else { 
      this.form.controls.text.enable();
      this.disabled = false;
    }
  }

  async save() {
  
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.CifDiagnosisTlS.Update({
            id: this.data.id,
            text: this.form.controls.text.value,
            type_record_id: this.type_record_id,
            ch_record_id: this.record_id,

          }).then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          }).catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.CifDiagnosisTlS.Save({
            text: this.form.controls.text.value,
            type_record_id: this.type_record_id,
            ch_record_id: this.record_id,
          }).then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
            this.disabled = true;
          }).catch(x => {
            if (this.form.controls.has_caregiver.value == true) {
              this.isSubmitted = true;
              this.loading = true;
            } else {
              this.isSubmitted = false;
              this.loading = false;
            }

          });
      }

    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
    
  }
}
  

