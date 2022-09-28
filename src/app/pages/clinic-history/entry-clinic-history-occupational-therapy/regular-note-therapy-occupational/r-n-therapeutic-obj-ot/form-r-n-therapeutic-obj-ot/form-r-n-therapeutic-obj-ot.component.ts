import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChEMSAssessmentOTService } from '../../../../../../business-controller/ch_e_m_s_assessment_o_t.service';

@Component({
  selector: 'ngx-form-r-n-therapeutic-obj-ot',
  templateUrl: './form-r-n-therapeutic-obj-ot.component.html',
  styleUrls: ['./form-r-n-therapeutic-obj-ot.component.scss']
})
export class FormRNTherapeuticObjOTComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;

  public arrayObjectives = [
    {
      id: 1,
      description: "Mantener y/o mejorar las destrezas de ejecución por medio de actividades graduadas y basadas en intereses para potencializar su desempeño ocupacional."
    },
    {
      id: 2,
      description: "Mejorar funciones mentales globales y específicas por medio de actividades de estimulación cognitiva."
    },
    {
      id: 3,
      description: "Estructurar patrones de desempeño a nivel de  actividades de ocio/tiempo libre."
    },
    {
      id: 4,
      description: "Promover destrezas de interacción y comunicación por medio de actividades grupales."
    },
    {
      id: 5,
      description: "Fortalecer las habilidades emocionales por medio de una actividad de auto-reconocimiento con el fin de brindar una resignificación frente a los obstáculos que se les presentan."
    },
    {
      id: 6,
      description: "Promover mejoras para el fortalecimiento de su vida emocional con el fin de mejorar sus respuestas adaptativas."
    },
    {
      id: 7,
      description: "Desarrollar estrategias que contribuyan a la proyección de nueva metas dando cumplimiento de las mismas y a la vez resolviendo los restos que pueden surgir. "
    },
    {
      id: 8,
      description: "Fortalecer su salud emocional para mejorar su desempeño a nivel familiar, social y laboral. "
    },
    {
      id: 9,
      description: "Favorecer funciones cognitivas y habilidades motoras  con el fin de mejorar el desempeño ocupacional y el cumplimiento de roles propios de la edad."
    },
    {
      id: 10,
      description: "Mejorar la capacidad sensitiva y propioceptiva por medio de la discriminación táctil para favorecer la funcionalidad e independencia en la AVD. *Mejorar habilidades cognitivas superiores con el fin de lograr la ejecución de sus ocupaciones."
    }

  ]

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChEMSAssessmentOTService: ChEMSAssessmentOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        check1_hold: false,
        check2_improve: false,
        check3_structure: false,
        check4_promote: false,
        check5_strengthen: false,
        check6_promote_2: false,
        check7_develop: false,
        check8_strengthen_2: false,
        check9_favor: false,
        check10_functionality: false,
      };
    }

    this.form = this.formBuilder.group({
      check1_hold: [
        this.data.check1_hold,
      ],
      check2_improve: [
        this.data.check2_improve,
      ],
      check3_structure: [
        this.data.check3_structure,
      ],
      check4_promote: [
        this.data.check4_promote,
      ],
      check5_strengthen: [
        this.data.check5_strengthen,
      ],
      check6_promote_2: [
        this.data.check6_promote_2,
      ],
      check7_develop: [
        this.data.check7_develop,
      ],
      check8_strengthen_2: [
        this.data.check8_strengthen_2,
      ],
      check9_favor: [
        this.data.check9_favor,
      ],
      check10_functionality: [
        this.data.check10_functionality,
      ],
    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      if (this.data.id) {
          this.ChEMSAssessmentOTService.Update({
          id: this.data.id,
          check1_hold: this.form.controls.check1_hold.value ? this.arrayObjectives[0].description : null,
          check2_improve: this.form.controls.check2_improve.value ? this.arrayObjectives[1].description : null,
          check3_structure: this.form.controls.check3_structure.value ? this.arrayObjectives[2].description : null,
          check4_promote: this.form.controls.check4_promote.value ? this.arrayObjectives[3].description : null,
          check5_strengthen: this.form.controls.check5_strengthen.value ? this.arrayObjectives[4].description : null,
          check6_promote_2: this.form.controls.check6_promote_2.value ? this.arrayObjectives[5].description : null,
          check7_develop: this.form.controls.check7_develop.value ? this.arrayObjectives[6].description : null,
          check8_strengthen_2: this.form.controls.check8_strengthen_2.value ? this.arrayObjectives[7].description : null,
          check9_favor: this.form.controls.check9_favor.value ? this.arrayObjectives[8].description : null,
          check10_functionality: this.form.controls.check10_functionality.value ? this.arrayObjectives[9].description : null,

          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({check1_hold:'', check2_improve:'', check3_structure:'', check4_promote:'',
          check5_strengthen:'',  check6_promote_2:'',  check7_develop:'',  check8_strengthen_2:'',  check9_favor:'',  check10_functionality:''});
          if (this.saved) {
            this.saved();
            this.messageEvent.emit(true);
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChEMSAssessmentOTService.Save({
          check1_hold: this.form.controls.check1_hold.value ? this.arrayObjectives[0].description : null,
          check2_improve: this.form.controls.check2_improve.value ? this.arrayObjectives[1].description : null,
          check3_structure: this.form.controls.check3_structure.value ? this.arrayObjectives[2].description : null,
          check4_promote: this.form.controls.check4_promote.value ? this.arrayObjectives[3].description : null,
          check5_strengthen: this.form.controls.check5_strengthen.value ? this.arrayObjectives[4].description : null,
          check6_promote_2: this.form.controls.check6_promote_2.value ? this.arrayObjectives[5].description : null,
          check7_develop: this.form.controls.check7_develop.value ? this.arrayObjectives[6].description : null,
          check8_strengthen_2: this.form.controls.check8_strengthen_2.value ? this.arrayObjectives[7].description : null,
          check9_favor: this.form.controls.check9_favor.value ? this.arrayObjectives[8].description : null,
          check10_functionality: this.form.controls.check10_functionality.value ? this.arrayObjectives[9].description : null,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({check1_hold:'', check2_improve:'', check3_structure:'', check4_promote:'',
          check5_strengthen:'',  check6_promote_2:'',  check7_develop:'',  check8_strengthen_2:'',  check9_favor:'',  check10_functionality:''});
          if (this.saved) {
            this.messageEvent.emit(true);
            this.saved();
          }
        }).catch(x => {
        });
      }
    }else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }
  checked = false;
  toggle(checked: boolean) {
    this.checked = checked;
  }
}

