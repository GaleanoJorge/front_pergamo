import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { TherapeuticGoalsTlService } from '../../../../business-controller/therapeutic-goals-tl.service';

@Component({
  selector: 'ngx-form-language-therapeutic-goals',
  templateUrl: './form-language-therapeutic-goals.component.html',
  styleUrls: ['./form-language-therapeutic-goals.component.scss'],
})
export class FormLanguageTherapeuticGoalsComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any = null;
  @Input() type_record: any;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
 
  public admissions_id;
  public arrayObjectives =
    [
      {
        id: 1,
        description: 'Mantener Integridad y Funcionalidad de Órganos Fonoarticuladores.',
      },
      {
        id: 2,
        description: 'Fortalecer Coordinación, Fuerza y Tono en Órganos Fonoarticuladores.',
      },
      {
        id: 3,
        description: 'Fortalecer Tono y Movilidad de Músculos Faciales.',
      },
      {
        id: 4,
        description: 'Favorecer Proceso Deglutorio en las Consistencias Establecidas que El Usuario Requiera.',
      },
      {
        id: 5,
        description: 'Fortalecer Subprocesos Lingüísticos.',
      },
      {
        id: 6,
        description: 'Favorecer Procesos Psicolingüísticos en Pro del Lenguaje Expresivo y Comprensivo.  ',
      },
      {
        id: 7,
        description: 'Incrementar Procesos Lecto Escritos.',
      },
      {
        id: 8,
        description: 'Fortalecer Cualidades Vocálicas Para Su Interacción Interpersonal.',
      },
      {
        id: 9,
        description: 'Fortalecer La Comunicación Bajo Sistemas Comunicativos Aumentativos/Alternativos.',
      },
      {
        id: 10,
        description: 'Mejorar Las Habilidades Comunicativas Mejorando El Bienestar Comunicativo Y Calidad De Vida.',
      }
     
    ]
    public obj;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute,
    private TherapeuticGoalsTlS: TherapeuticGoalsTlService
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    if (!this.data) {
      this.data = {
        check1:'',
        check2:'',
        check3:'',
        check4:'',
        check5:'',
        check6:'',
        check7:'',
        check8:'',
        check9:'',
        check10:'',
        
      };
    } else {
      this.disabled = true;
    }

    this.form = this.formBuilder.group({
      //Objetivos Terapéuticos

      check1: [this.data.check1],
      check2: [this.data.check2],
      check3: [this.data.check3],
      check4: [this.data.check4],
      check5: [this.data.check5],
      check6: [this.data.check6],
      check7: [this.data.check7],
      check8: [this.data.check8],
      check9: [this.data.check9],
      check10: [this.data.check10],

      // hold_phonoarticulators: [this.data.hold_phonoarticulators],
      // strengthen_phonoarticulators: [this.data.strengthen_phonoarticulators],
      // strengthen_tone: [this.data.strengthen_tone],
      // favor_process: [this.data.favor_process],
      // strengthen_thread: [this.data.strengthen_thread],
      // favor_psycholinguistic: [this.data.favor_psycholinguistic],
      // increase_processes: [this.data.increase_processes],
      // strengthen_qualities: [this.data.strengthen_qualities],
      // strengthen_communication: [this.data.strengthen_communication],
      // improve_skills: [this.data.improve_skills],     

     
    });
  }
  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.TherapeuticGoalsTlS.Update({
            hold_phonoarticulators:this.data.check1,
            strengthen_phonoarticulators:this.data.check2,
            strengthen_tone:this.data.check3,
            favor_process:this.data.check4,
            strengthen_thread:this.data.check5,
            favor_psycholinguistic:this.data.check6,
            increase_processes: this.data.check7,
            strengthen_qualities:this.data.check8,
            strengthen_communication: this.data.check9,
            improve_skills:  this.data.check10,
            type_record_id: this.type_record,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.form.setValue({});
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.TherapeuticGoalsTlS
          .Save({
            hold_phonoarticulators:this.form.controls.check1.value ? this.arrayObjectives[0].description : null,
            strengthen_phonoarticulators: this.form.controls.check2.value ? this.arrayObjectives[1].description : null,
            strengthen_tone:this.form.controls.check3.value ? this.arrayObjectives[2].description : null,
            favor_process: this.form.controls.check4.value ? this.arrayObjectives[3.].description : null,
            strengthen_thread: this.form.controls.check5.value ? this.arrayObjectives[4].description : null,
            favor_psycholinguistic: this.form.controls.check6.value ? this.arrayObjectives[5].description : null,
            increase_processes:this.form.controls.check7.value ? this.arrayObjectives[6].description : null,
            strengthen_qualities:this.form.controls.check8.value ? this.arrayObjectives[7].description : null,
            strengthen_communication: this.form.controls.check9.value ? this.arrayObjectives[8].description : null,
            improve_skills: this.form.controls.check10.value ? this.arrayObjectives[9].description : null,
            type_record_id: this.type_record,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ hold_phonoarticulators: '',
            strengthen_phonoarticulators: '',
            strengthen_tone: '',
            favor_process: '',
            strengthen_thread: '',
            favor_psycholinguistic: '',
            increase_processes: '',
            strengthen_qualities: '',
            strengthen_communication: '',
            improve_skills: '',});
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
      }
    }
  }
}
