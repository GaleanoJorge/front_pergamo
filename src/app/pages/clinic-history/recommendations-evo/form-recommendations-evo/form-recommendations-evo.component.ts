import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecommendationsEvoService } from '../../../../business-controller/ch-recommendations-evo.service';
import { RecommendationsEvoService } from '../../../../business-controller/recommendations_evo.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ngx-form-recommendations-evo',
  templateUrl: './form-recommendations-evo.component.html',
  styleUrls: ['./form-recommendations-evo.component.scss'],
})
export class FormRecommendationsEvoComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any;
  @Input() medicine: boolean = false;
  @Input() enfermeryreco: boolean = false;
  @Input() nutrition: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public recommendations_evo_id: any[];;
  public ch_evo_soap_id: any[];
  public recommendations: any[];



  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private ChRecommendationsEvoS: ChRecommendationsEvoService,
    private RecommendationsEvoS: RecommendationsEvoService,


  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        patient_family_education: '',
        recommendations_evo_id: '',
        description: '',
        observation: '',

      };
    };

    this.RecommendationsEvoS.GetCollection().then(x => {
      this.recommendations_evo_id = x;
      if (this.medicine == true) {
        this.recommendations = this.recommendations_evo_id.filter((item) => item.code == 1)
      } else if (this.enfermeryreco == true) {
        this.recommendations = this.recommendations_evo_id.filter((item) => item.code == 2)
      } 
      else if (this.nutrition == true) {
        this.recommendations = this.recommendations_evo_id.filter((item) => item.code == 3)
      } else { 
        this.recommendations = this.recommendations_evo_id.filter((item) => item.code == 1)
      }
      

    });

    this.ChRecommendationsEvoS.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: this.record_id,
    }).then(x => {
      if (x.length > 0) {
        this.messageEvent.emit(true);
      }
    });



    this.form = this.formBuilder.group({
      patient_family_education: [this.data.patient_family_education],
      recommendations_evo_id: [this.data.recommendations_evo_id,],
      description: [this.data.description],
      observation: [this.data.observation,],


    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChRecommendationsEvoS.Update({
          id: this.data.id,
          patient_family_education: this.form.controls.patient_family_education.value,
          recommendations_evo_id: this.form.controls.recommendations_evo_id.value,
          observations: this.form.controls.observation.value,

          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ patient_family_education: '', recommendations_evo_id: '', observation: '', });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChRecommendationsEvoS.Save({
          id: this.data.id,
          patient_family_education: this.form.controls.patient_family_education.value,
          recommendations_evo_id: this.form.controls.recommendations_evo_id.value,
          observations: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ patient_family_education: '', recommendations_evo_id: '', observation: '', });
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
    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }

  }


  onDescriptionChange(event) {
    this.recommendations.forEach(x => {
      if (x.id == event) {
        this.form.controls.observation.setValue(x.description);
      }
    });
  }

}