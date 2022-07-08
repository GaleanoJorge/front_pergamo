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
import { SpecificTestsTlService } from '../../../../business-controller/specific-tests-tl.service';

@Component({
  selector: 'ngx-form-language-tests',
  templateUrl: './form-language-tests.component.html',
  styleUrls: ['./form-language-tests.component.scss'],
})
export class FormLanguageTestsComponent implements OnInit {
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
    private SpecificTestsTlS: SpecificTestsTlService,
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
        hamilton_scale: '', 
        boston_test: '', 
        termal_merril: '',
        prolec_plon: '', 
        ped_guss:'',
        vhi_grbas:'',
        pemo_speech:'',

      };
    }
    this.form = this.formBuilder.group({
      hamilton_scale: [this.data[0] ? this.data[0].hamilton_scale : this.data.hamilton_scale,],
      boston_test: [this.data[0] ? this.data[0].boston_test : this.data.boston_test,],
      termal_merril: [this.data[0] ? this.data[0].termal_merril : this.data.termal_merril,],
      prolec_plon: [this.data[0] ? this.data[0].prolec_plon : this.data.prolec_plon,],
      ped_guss: [this.data[0] ? this.data[0].boston_test : this.data.ped_guss,],
      vhi_grbas: [this.data[0] ? this.data[0].vhi_grbas : this.data.vhi_grbas,],
      pemo_speech: [this.data[0] ? this.data[0].pemo_speech : this.data.pemo_speech,],
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.SpecificTestsTlS.Update({
          id: this.data.id,
          hamilton_scale: this.form.controls.hamilton_scale.value,
          boston_test: this.form.controls.boston_test.value,
          termal_merril: this.form.controls.termal_merril.value,


          ped_guss: this.form.controls.ped_guss.value,
          vhi_grbas: this.form.controls.vhi_grbas.value,
          pemo_speech: this.form.controls.pemo_speech.value,
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
        await this.SpecificTestsTlS.Save({
          hamilton_scale: this.form.controls.hamilton_scale.value,
          boston_test: this.form.controls.boston_test.value,
          termal_merril: this.form.controls.termal_merril.value,


          ped_guss: this.form.controls.ped_guss.value,
          vhi_grbas: this.form.controls.vhi_grbas.value,
          pemo_speech: this.form.controls.pemo_speech.value,

          prolec_plon: this.form.controls.prolec_plon.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ materialused: [], });
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