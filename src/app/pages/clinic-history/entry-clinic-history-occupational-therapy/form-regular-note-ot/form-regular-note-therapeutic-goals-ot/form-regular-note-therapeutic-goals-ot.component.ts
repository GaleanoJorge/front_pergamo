import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChObjectivesTherapyService } from '../../../../../business-controller/ch_objectives_therapy.service';


@Component({
  selector: 'ngx-form-regular-note-therapeutic-goals-ot',
  templateUrl: './form-regular-note-therapeutic-goals-ot.component.html',
  styleUrls: ['./form-regular-note-therapeutic-goals-ot.component.scss']
})
export class FormRegularNoteTherapeuticGoalOT implements OnInit {

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
      description: "Desarrollar estrategias que contribuyan a la proyección de nueva metas dando cumplimiento de las mismas y a la vez resolviendo los restos que pueden surgir."
    },
    {
      id: 8,
      description: "Fortalecer su salud emocional para mejorar su desempeño a nivel familiar, social y laboral."
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

  public obj;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ObjectivesS: ChObjectivesTherapyService,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
      this.data = {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
        check8: false,
        check9: false,
        check10: false,
        intervention: '',
        
      };
    };
    this.form = this.formBuilder.group({
      check1: [
        this.data.check1,
      ],
      check2: [
        this.data.check2,
      ],
      check3: [
        this.data.check3,
      ],
      check4: [
        this.data.check4,
      ],
      check5: [
        this.data.check5,
      ],
      check6: [
        this.data.check6,
      ],
      check7: [
        this.data.check7,
      ],
      check8: [
        this.data.check8,
      ],
      check9: [
        this.data.check9,
      ],
      check10: [
        this.data.check10,
      ],
      intervention: [this.data[0] ? this.data[0].intervention : this.data.intervention, Validators.compose([Validators.required])],
    });
  
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ObjectivesS.Update({
          id: this.data.id,
          strengthen: this.data.check1,
          promote: this.data.check2,
          title: this.data.check3,
          improve: this.data.check4,
          re_education: this.data.check5,
          hold: this.data.check6,
          check: this.data.check7,
          train: this.data.check8,
          headline: this.data.check9,
          look_out: this.data.check10,
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
        await this.ObjectivesS.Save({
          strengthen: this.form.controls.check1.value ? this.arrayObjectives[0].description : null,
          promote:  this.form.controls.check2.value ? this.arrayObjectives[1].description : null,
          title: this.form.controls.check3.value ? this.arrayObjectives[2].description : null,
          improve: this.form.controls.check4.value ? this.arrayObjectives[3.].description : null,
          re_education: this.form.controls.check5.value ? this.arrayObjectives[4].description : null,
          hold: this.form.controls.check6.value ? this.arrayObjectives[5].description : null,
          check: this.form.controls.check7.value ? this.arrayObjectives[6].description : null,
          train: this.form.controls.check8.value ? this.arrayObjectives[7].description : null,
          headline: this.form.controls.check9.value ? this.arrayObjectives[8].description : null,
          look_out: this.form.controls.check10.value ? this.arrayObjectives[9].description : null,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ check1: false, check2: false, check3:false, check4:false, check5:false, check6:false,
           check7:false, check8:false, check9:false, check10:false});
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

























