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

        checking1: false,
        checking2: false,
        checking3: false,
        checking4: false,
        checking5: false,
        checking6: false,
        checking7: false,
        checking8: false,
        checking9: false,
        checking10: false,
        intervention: '',
        
      };
    };
    this.form = this.formBuilder.group({
      checking1: [
        this.data.check1,
      ],
      checking2: [
        this.data.check2,
      ],
      checking3: [
        this.data.check3,
      ],
      checking4: [
        this.data.check4,
      ],
      checking5: [
        this.data.check5,
      ],
      checking6: [
        this.data.check6,
      ],
      checking7: [
        this.data.check7,
      ],
      checking8: [
        this.data.check8,
      ],
      checking9: [
        this.data.check9,
      ],
      checking10: [
        this.data.check10,
      ],
      intervention: [this.data[0] ? this.data[0].intervention : this.data.intervention, Validators.compose([Validators.required])],
    });
  
  }

  async save() {
    
  }

}

























