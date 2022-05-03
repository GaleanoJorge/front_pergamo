import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChScalesService } from '../../../business-controller/ch_scales.service';



@Component({
  selector: 'ngx-ch-scales',
  templateUrl: './ch-scales.component.html',
  styleUrls: ['./ch-scales.component.scss']
})

export class ChScalesComponent implements OnInit {

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
  public arrayDefinitionsFac =
    [
      {
        id: 0,
        text: 'Incapacidad absoluta para caminar, incluso con ayuda externa',
      },
      {
        id: 1,
        text: 'Caminar dependiente, lo que requiere la ayuda permanente de otras personas. El paciente debe estar firmemente apoyada por 1 ó 2 personas, y/o caminar es posible sólo dentro de una sesión de terapia en el hogar o en el hospital, entre las barras paralelas. Este es el único nivel funcional que no es independiente y se denomina por tanto no funcionales.',
      },
      {
        id: 2,
        text: 'Caminar es sólo en interiores posibles, sobre superficies planas y horizontales, por lo general dentro de un área conocida y controlada, como el hogar.',
      },
      {
        id: 3,
        text: 'Los pacientes son capaces de caminar en interiores como en exteriores en superficies irregulares, y son capaces de subir un paso ocasional o escalera. Por lo tanto, el paciente es capaz de caminar en la calle, aunque dentro de una distancia limitada y restringida a pie.',
      },
      {
        id: 4,
        text: 'Los pacientes son capaces de caminar en todo tipo de superficies irregulares. Pueden subir y bajar escalones o escaleras, rampas, bordillos, etc. Tienen un considerable, aunque no restringido, a poca distancia, hasta el punto de que son capaces de comprar comida. Sin embargo, no se consideran caminantes normales porque tienen anomalías estéticas, como una cojera evidente.',
      },
      {
        id: 5,
        text: 'Caminar es completamente normal en la distancia y la apariencia, tanto en casa como fuera y con una distancia ilimitada, no hay anomalía estética o cojera. Pueden andar de puntillas, caminar sobre los talones, y en tándem.',
      }
    ]

  public arrayDefinitionsCross =
    [
      {
        id: 0,
        text: 'Se vale por sí mismo y anda con normalidad.',
      },
      {
        id: 1,
        text: 'Realiza suficientemente las actividades de la vida diaria, Deambula con alguna dificultad, Continencia normal.',
      },
      {
        id: 2,
        text: 'Cierta dificultad en las actividades de la vida diaria, que le obligan a valerse de ayuda, Deambula con bastón u otro medio de apoyo, Continencia normal o rara incontinencia.',
      },
      {
        id: 3,
        text: 'Grave dificultad en bastantes actividades de la vida diaria, Deambula con dificultad, ayudado al menos por una persona, Incontinencia ocasional.',
      },
      {
        id: 4,
        text: 'Necesita ayuda para casi cualquier actividad de la vida diaria, Deambula con mucha dificultad, ayudado por al menos 2 personas, Incontinencia habitual.',
      },
      {
        id: 5,
        text: 'Inmovilidad en cama o sillón, Necesita cuidados de enfermería constantes, Incontinencia total.',
      }
    ]

  public arrayDefinitionsEcog =
    [
      {
        id: 0,
        text: 'Actividad normal sin restricción ni ayuda',
      },
      {
        id: 1,
        text: 'Actividad restringida. Deambula',
      },
      {
        id: 2,
        text: 'Incapacidad para cualquier actividad laboral. Menos del 50% del tiempo encamado',
      },
      {
        id: 3,
        text: 'Capacidad restringida para los cuidados y el aseo personal. Más del 50% del tiempo encamad.',
      },
      {
        id: 4,
        text: 'Incapacidad total. No puede cuidar de sí mismo. El 100% del tiempo encamado',
      },
      {
        id: 5,
        text: 'Difunto',
      }
    ]


  public definitionFacText = '';
  public definitionCrossText = '';
  public definitionEcogText = '';
  public totalNorton = 0;
  public totalGlasgow = 0;
  public totalBarthel = 0;
  public totalPayette = 0;
  public totalFragility = 0;
  public totalNews = 0;
  public totalPap: any;
  public totalHamilton = 0;
  public totalNPedriatic = 0;
  public totalFlacc = 0;
  public totalPpi = 0;
  public totalZarit = 0;
  public range = 0;
  public study: boolean = false;
  public totalPfeiffer = 0;
  public totalJhDowton = 0;
  public num1 = 0;
  public num2 = 0;
  public num3 = 0;
  public num4 = 0;
  public num5 = 0;
  public num6 = 0;
  public num7 = 0;
  public num8 = 0;
  public num9 = 0;
  public num10 = 0;
  public num11 = 0;
  public num12 = 0;
  public num13 = 0;
  public num14 = 0;
  public num15 = 0;
  public num16 = 0;
  public num17 = 0;
  public num18 = 0;
  public num19 = 0;
  public num20 = 0;
  public num21 = 0;
  public num22 = 0;

  public risk_norton: string = '';

  public classBarthel: string = '';
  public riskPayette: string = '';
  public recommendations: string = '';

  public classFragility: string = '';

  public riskNews: string = '';
  public response: string = '';

  public classificationPap: string = '';

  public classificationHam: string = '';

  public resultCam: string = '';

  public redCross = 0;
  public calificationRed: string = '';

  public riskNPedriatic: string = '';
  public classificationNPedriatic: string = '';

  public classificationNFlacc: string = '';

  public classificationPpi: string = '';

  public classificationZarit: string = '';

  public detail: string = '';

  public classificationPfeiffer: string = '';

  public riskJhDowtown: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private chScalesS: ChScalesService,
    private toastService: NbToastrService,

  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
      this.data = {
      };
    }
    this.form = this.formBuilder.group({

      //Escala Norton Form
      physical_state: [this.data.physical_state],
      state_mind: [this.data.state_mind],
      mobility: [this.data.mobility],
      activity: [this.data.activity],
      incontinence: [this.data.incontinence],
      totalNorton: [this.data.totalNorton],
      risk_norton: [this.data.risk_norton],

      //Escala Glasgow Form
      motor: [this.data.motor],
      verbal: [this.data.verbal],
      ocular: [this.data.ocular],
      totalGlasgow: [this.data.totalGlasgow],

      //Escala Barthel
      eat:  [this.data.eat],
      move:  [this.data.move],
      cleanliness:  [this.data.cleanliness],
      toilet:  [this.data.toilet],
      shower:  [this.data.shower],
      commute:  [this.data.commute],
      stairs:  [this.data.stairs],
      dress:  [this.data.dress],
      fecal:  [this.data.fecal],
      urine:  [this.data.urine],
      totalBarthel:  [this.data.totalBarthel],
      classBarthel:  [this.data.classBarthel],

      //Escala Payette
      qOnePayette: [this.data.qOnePayette],
      qTwoPayette: [this.data.qTwoPayette],
      qThreePayette: [this.data.qThreePayette],
      qFourPayette: [this.data.qFourPayette],
      qFivePayette: [this.data.qFivePayette],
      qSixPayette: [this.data.qSixPayette],
      qSevenPayette: [this.data.qSevenPayette],
      qEightPayette: [this.data.qEightPayette],
      qNinePayette: [this.data.qNinePayette],
      qTenPayette: [this.data.qTenPayette],
      totalPayette: [this.data.totalPayette],
      riskPayette: [this.data.riskPayette],
      recommendations: [this.data.recommendations],

      //Escala Fragility
      qOneFragility: [this.data.qOneFragility],
      qTwoFragility: [this.data.qTwoFragility],
      qThreeFragility: [this.data.qThreeFragility],
      qFourFragility: [this.data.qFourFragility],
      qFiveFragility: [this.data.qFiveFragility],
      qSixFragility: [this.data.qSixFragility],
      totalFragility: [this.data.totalFragility],
      classFragility: [this.data.classFragility],




      level: [this.data.level],
      grade_cross: [this.data.grade_cross],
      definitionFac: [this.data.definitionFac],
      definitionCross: [this.data.definitionCross],
      scoreKarnofsky: [this.data.scoreKarnofsky],
      definitionEcog: [this.data.definitionEcog],
      range_pain: [this.data.range_pain],

    });
    this.onChanges();
  }

  onChanges() {
    this.form.get('level').valueChanges.subscribe(val => {
      if (val === '') {
        this.definitionFacText = '';
      } else {
        var localidentify = this.arrayDefinitionsFac.find(item => item.id == val);
        if (localidentify) {
          this.definitionFacText = localidentify.text;
        } else {
          this.definitionFacText = '';
        }
      }
    })

    this.form.get('grade_cross').valueChanges.subscribe(val => {
      if (val === '') {
        this.definitionCrossText = '';
      } else {
        var localidentifyCross = this.arrayDefinitionsCross.find(item => item.id == val);
        if (localidentifyCross) {
          this.definitionCrossText = localidentifyCross.text;
        } else {
          this.definitionCrossText = '';
        }
      }
    })

    this.form.get('grade_ecog').valueChanges.subscribe(val => {
      if (val === '') {
        this.definitionEcogText = '';
      } else {
        var localidentifyEcog = this.arrayDefinitionsEcog.find(item => item.id == val);
        if (localidentifyEcog) {
          this.definitionEcogText = localidentifyEcog.text;
        } else {
          this.definitionEcogText = '';
        }
      }
    })

  }

  studyscale() {

  }


  updateSingleSelectGroupValue(e) {
    console.log(e);
  }

  calculate(e, orden?, type?): void {

    if (type == 1) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.totalNorton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalNorton >= 5 && this.totalNorton <= 9) {
        this.risk_norton = 'Riesgo muy alto';

      } else if (this.totalNorton >= 10 && this.totalNorton <= 12) {
        this.risk_norton = 'Riesgo alto';

      } else if (this.totalNorton >= 13 && this.totalNorton <= 14) {
        this.risk_norton = 'Riesgo medio';
      } else {
        this.risk_norton = 'Riesgo minimo / No riesgo';

      }
    } else if (type == 2) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.totalGlasgow = this.num1 + this.num2 + this.num3;

    } else if (type == 3) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.num7 = orden == 7 ? Number(e) : this.num7;
      this.num8 = orden == 8 ? Number(e) : this.num8;
      this.num9 = orden == 9 ? Number(e) : this.num9;
      this.num10 = orden == 10 ? Number(e) : this.num10;
      this.totalBarthel = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10;

      if (this.totalBarthel >= 0 && this.totalBarthel <= 20) {
        this.classBarthel= 'Dependencia Leve';

      } else if (this.totalBarthel >= 21 && this.totalBarthel <= 60) {
        this.classBarthel = 'Dependencia Severa';

      } else if (this.totalBarthel >= 61 && this.totalBarthel <= 90) {
        this.classBarthel = 'Dependencia Moderada';
      } else if (this.totalBarthel >= 91 && this.totalBarthel <= 99) {
        this.classBarthel = 'Dependencia Leve';
      } else {
        this.classBarthel = 'Independencia Total';

      }
    } else if (type == 4) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.num7 = orden == 7 ? Number(e) : this.num7;
      this.num8 = orden == 8 ? Number(e) : this.num8;
      this.num9 = orden == 9 ? Number(e) : this.num9;
      this.num10 = orden == 10 ? Number(e) : this.num10;
      this.totalPayette = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10;

      if (this.totalPayette >= 0 && this.totalPayette <= 2) {
        this.riskPayette = 'Bajo';
        this.recommendations = 'Vigilancia en cuanto a la aparición de un factor de riesgo(cambio de situación, baja ponderal).';

      } else if (this.totalPayette >= 3 && this.totalPayette <= 5) {
        this.riskPayette = 'Moderado';
        this.recommendations = 'Supervisión constante de la alimentación (seguimiento para informarse,aconsejar y animar regularmente).';

      } else {
        this.riskPayette = 'Elevado';
        this.recommendations = 'Auxilio para la preparación de las comidas y colaciones y consulta con un profesional de nutrición.';

      }
    } else if (type == 5) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.totalFragility = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalFragility >= 1 && this.totalFragility <= 3) {
        this.classFragility = 'Prefragil';
      } else {
        this.classFragility = 'Fragil';
      }
    } else if (type == 6) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.num7 = orden == 7 ? Number(e) : this.num7;
      this.num8 = orden == 8 ? Number(e) : this.num8;
      this.totalNews = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8;

      if (this.totalNews == 0) {
        this.riskNews = 'Bajo';
        this.response = 'Continuar cuidados de enfermería Signos vitales cada 12 horas';

      } else if (this.totalNews >= 1 && this.totalNews <= 4) {
        this.riskNews = 'Bajo';
        this.response = 'Continuar cuidados de enfermería Signos vitales cada 4-6 horas';

      } else if (this.totalNews >= 3) {
        this.riskNews = 'Bajo / Medio';
        this.response = 'Respuesta urgente en piso o ala* Signos vitales cada hora';

      } else if (this.totalNews >= 5 && this.totalNews <= 6) {
        this.riskNews = 'Medio';
        this.response = 'Respuesta urgente en piso o ala* Signos vitales cada hora';

      } else {
        this.riskNews = 'Alto';
        this.response = 'Respuesta emergente** Monitoreo continuo de signos vitales';
      }
    } else if (type == 7) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.totalPap = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6;

      if (this.totalPap == 0 || this.totalPap <= 5, 5) {
        this.classificationPap = 'Probabilidad > 70% de supervivencia a los 30 días';
      } else {
        this.classificationPap = 'Probabilidad entre 30-70% de supervivencia a los 30 días';
      }
    } else if (type == 8) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.num7 = orden == 7 ? Number(e) : this.num7;
      this.num8 = orden == 8 ? Number(e) : this.num8;
      this.num9 = orden == 9 ? Number(e) : this.num9;
      this.num10 = orden == 10 ? Number(e) : this.num10;
      this.num11 = orden == 11 ? Number(e) : this.num11;
      this.num12 = orden == 12 ? Number(e) : this.num12;
      this.num13 = orden == 13 ? Number(e) : this.num13;
      this.num14 = orden == 14 ? Number(e) : this.num14;
      this.num15 = orden == 15 ? Number(e) : this.num15;
      this.num16 = orden == 16 ? Number(e) : this.num16;
      this.num17 = orden == 17 ? Number(e) : this.num17;
      this.num18 = orden == 18 ? Number(e) : this.num18;
      this.totalHamilton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10 +
        this.num11 + this.num12 + this.num13 + this.num14 + this.num15 + this.num16 + this.num17 + this.num18;


      if (this.totalHamilton <= 7) {
        this.classificationHam = 'No deprimido';

      } else if (this.totalHamilton > 7 && this.totalHamilton <= 13) {
        this.classificationHam = 'Depresión ligera/menor';

      } else if (this.totalHamilton > 13 && this.totalHamilton <= 18) {
        this.classificationHam = 'Depresión moderada';

      } else if (this.totalHamilton > 18 || this.totalHamilton <= 22) {
        this.classificationHam = 'Depresión severa';

      } else {
        this.classificationHam = 'Depresión muy severa';

      }
    } else if (type == 9) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;

      if (this.num1 && this.num2 == 1 && this.num3 == 1) {
        this.resultCam = 'Hay Delirium';
      } else if ((this.num1 && this.num2 == 1 && this.num4 == 1)) {
        this.resultCam = 'Hay Delirium';
      } else {
        this.resultCam = 'No hay Delirium';
      }

    } else if (type == 10) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.totalNPedriatic = this.num1 + this.num2 + this.num3 + this.num4;

      if (this.totalNPedriatic > 4 && this.totalNPedriatic <= 5) {
        this.riskNPedriatic = 'Riesgo alto';
        this.classificationNPedriatic = 'Interconsulta a Nutrición para un diagnóstico completo, asesoría y seguimiento Nutricional Individual.';

      } else if ((this.totalNPedriatic >= 1 && this.totalNPedriatic <= 3)) {
        this.riskNPedriatic = 'Riesgo Medio';
        this.classificationNPedriatic = 'Considerar la Intervención nutricional, verificar el peso dos veces a la semana y evaluar el riesgo nutricional después de una semana.';
      } else {
        this.riskNPedriatic = 'Riesgo Bajo';
        this.classificationNPedriatic = ' No es necesaria intervención, verificar peso y evaluar riesgo después de una semana.';
      }

    } else if (type == 11) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num4;
      this.totalFlacc = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalFlacc == 0) {
        this.classificationNFlacc = 'No Dolor';

      } else if ((this.totalFlacc > 1 && this.totalFlacc <= 2)) {
        this.classificationNFlacc = 'Dolor Leve';

      } else if ((this.totalFlacc > 3 && this.totalFlacc <= 5)) {
        this.classificationNFlacc = 'Dolor Moderado';

      } else if ((this.totalFlacc > 6 && this.totalFlacc <= 8)) {
        this.classificationNFlacc = 'Dolor Intenso ';

      } else if ((this.totalFlacc > 9 && this.totalFlacc <= 10)) {
        this.classificationNFlacc = ' Maximo Dolor imaginable';
      }
    } else if (type == 12) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num4;
      this.totalPpi = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalPpi > 6) {
        this.classificationPpi = 'Predicción de supervivencia de tres semanas';

      } else if ((this.totalPpi < 4)) {
        this.classificationPpi = 'Predicción de supervivencia de seis semanas';

      }
    } else if (type == 13) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.num7 = orden == 7 ? Number(e) : this.num7;
      this.num8 = orden == 8 ? Number(e) : this.num8;
      this.num9 = orden == 9 ? Number(e) : this.num9;
      this.num10 = orden == 10 ? Number(e) : this.num10;

      this.num11 = orden == 11 ? Number(e) : this.num11;
      this.num12 = orden == 12 ? Number(e) : this.num12;
      this.num13 = orden == 13 ? Number(e) : this.num13;
      this.num14 = orden == 14 ? Number(e) : this.num14;
      this.num15 = orden == 15 ? Number(e) : this.num15;
      this.num16 = orden == 16 ? Number(e) : this.num16;
      this.num17 = orden == 17 ? Number(e) : this.num17;
      this.num18 = orden == 18 ? Number(e) : this.num18;
      this.num19 = orden == 19 ? Number(e) : this.num19;
      this.num20 = orden == 20 ? Number(e) : this.num20;

      this.num21 = orden == 21 ? Number(e) : this.num21;
      this.num22 = orden == 22 ? Number(e) : this.num22;
      this.totalZarit = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10 + this.num11 + this.num12 +
        this.num13 + this.num14 + this.num15 + this.num16 + this.num17 + this.num18 + this.num19 + this.num20 + this.num21 + this.num22;

      if (this.totalZarit <= 46) {
        this.classificationZarit = 'Sobrecarga';

      } else if ((this.totalZarit > 47 && this.totalZarit < 55)) {
        this.classificationZarit = 'Sobrecarga Leve';

      } else if ((this.totalZarit >= 56)) {
        this.classificationZarit = 'Sobrecarga Intensa';
      }

    } else if (type == 14) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;
      this.num6 = orden == 6 ? Number(e) : this.num6;
      this.num7 = orden == 7 ? Number(e) : this.num7;
      this.num8 = orden == 8 ? Number(e) : this.num8;
      this.num9 = orden == 9 ? Number(e) : this.num9;
      this.num10 = orden == 10 ? Number(e) : this.num10;

      this.totalPfeiffer = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10;

      if (this.study == false) {


        if (this.totalPfeiffer > 0 && this.totalPfeiffer < 3) {
          this.classificationPfeiffer = 'Sin deterioro cognitivo';

        } else if ((this.totalPfeiffer > 4 && this.totalPfeiffer < 5)) {
          this.classificationPfeiffer = 'Deterioro cognitivo leve';

        } else if ((this.totalPfeiffer > 6 && this.totalPfeiffer < 8)) {
          this.classificationPfeiffer = 'Deterioro cognitivo moderado';

        } else if ((this.totalPfeiffer > 8 && this.totalPfeiffer < 10)) {
          this.classificationPfeiffer = 'Deterioro cognitivo severo';
        }
      } else {
        if (this.totalPfeiffer > 0 && this.totalPfeiffer < 1) {
          this.classificationPfeiffer = 'Sin deterioro cognitivo';

        } else if ((this.totalPfeiffer > 2 && this.totalPfeiffer < 3)) {
          this.classificationPfeiffer = 'Deterioro cognitivo leve';

        } else if ((this.totalPfeiffer > 4 && this.totalPfeiffer < 6)) {
          this.classificationPfeiffer = 'Deterioro cognitivo moderado';

        } else if ((this.totalPfeiffer > 7 && this.totalPfeiffer < 10)) {
          this.classificationPfeiffer = 'Deterioro cognitivo severo';
        }

      }


    } else if (type == 15) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num5;

      this.totalJhDowton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;


      if (this.totalJhDowton > 3) {
        this.riskJhDowtown = 'Riesgo Alto';

      } else if ((this.totalJhDowton == 2 || this.totalJhDowton == 3)) {
        this.riskJhDowtown = 'Riesgo Mediano ';

      } else if ((this.totalJhDowton == 0 || this.totalJhDowton == 1)) {
        this.riskJhDowtown = 'Deterioro cognitivo moderado';

      }

    }

    // if (this.range_pain == 0) {
    //   this.detailPain = 'Sin dolor';

    //   if (this.range_pain > 1 && this.range_pain < 3) {
    //     this.classificationPfeiffer = 'Suave';

    //   } else if ((this.totalPfeiffer > 4 && this.totalPfeiffer < 6)) {
    //     this.classificationPfeiffer = 'Dolor moderado';

    //   } else if ((this.totalPfeiffer > 7 && this.totalPfeiffer < 10)) {
    //     this.classificationPfeiffer = 'Dolor intenso';

    //   }
    // }

  }
  async save(escale_id) {

    if (escale_id == 1) {
      this.form.controls.physical_state.setValidators(Validators.compose([Validators.required]));
      this.form.controls.state_mind.setValidators(Validators.compose([Validators.required]));
      this.form.controls.mobility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.activity.setValidators(Validators.compose([Validators.required]));
      this.form.controls.incontinence.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalNorton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.risk_norton.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;
        await this.chScalesS.SaveNorton({
          physical_state: this.form.controls.physical_state.value,
          state_mind: this.form.controls.state_mind.value,
          mobility: this.form.controls.mobility.value,
          activity: this.form.controls.activity.value,
          incontinence: this.form.controls.incontinence.value,
          total: this.totalNorton,
          risk: this.risk_norton,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ physical_state: '', state_mind: '', mobility: '', activity: '', incontinence: '', total: '', risk: '' });
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

    if (escale_id == 2) {
      this.form.controls.motor.setValidators(Validators.compose([Validators.required]));
      this.form.controls.verbal.setValidators(Validators.compose([Validators.required]));
      this.form.controls.ocular.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;
        await this.chScalesS.SaveGlasgow({
          motor: this.form.controls.motor.value,
          verbal: this.form.controls.verbal.value,
          ocular: this.form.controls.ocular.value,
          total: this.totalGlasgow,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ motor: '', verbal: '', ocular: '', totalGlasgow: '' });
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

    if (escale_id == 3) {
      this.form.controls.eat.setValidators(Validators.compose([Validators.required]));
      this.form.controls.move.setValidators(Validators.compose([Validators.required]));
      this.form.controls.cleanliness.setValidators(Validators.compose([Validators.required]));
      this.form.controls.toilet.setValidators(Validators.compose([Validators.required]));
      this.form.controls.shower.setValidators(Validators.compose([Validators.required]));
      this.form.controls.commute.setValidators(Validators.compose([Validators.required]));
      this.form.controls.stairs.setValidators(Validators.compose([Validators.required]));
      this.form.controls.dress.setValidators(Validators.compose([Validators.required]));
      this.form.controls.fecal.setValidators(Validators.compose([Validators.required]));
      this.form.controls.urine.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalBarthel.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classBarthel.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveBarthel({
          eat: this.form.controls.eat.value,
          move: this.form.controls.move.value,
          cleanliness: this.form.controls.cleanliness.value,
          toilet: this.form.controls.toilet.value,
          shower: this.form.controls.shower.value,
          commute: this.form.controls.commute.value,
          stairs: this.form.controls.stairs.value,
          dress: this.form.controls.dress.value,
          fecal: this.form.controls.fecal.value,
          urine: this.form.controls.urine.value,
          score: this.totalBarthel,
          classification: this.classBarthel,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ eat:'', move:'', cleanliness:'', toilet:'', shower:'', commute:'', stairs:'', dress:'', fecal:'', urine:'', score:'', classification: ''});
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

    if (escale_id == 4) {
      this.form.controls.qOnePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qTwoPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qThreePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qFourPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qFivePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qSixPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qSevenPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qEightPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qNinePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qTenPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.riskPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.recommendations.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePayette({
          question_one: this.form.controls.qOnePayette.value,
          question_two: this.form.controls.qTwoPayette.value,
          question_three: this.form.controls.qThreePayette.value,
          question_four: this.form.controls.qFourPayette.value,
          question_five: this.form.controls.qFivePayette.value,
          question_six: this.form.controls.qSixPayette.value,
          question_seven: this.form.controls.qSevenPayette.value,
          question_eight: this.form.controls.qEightPayette.value,
          question_nine: this.form.controls.qNinePayette.value,
          question_ten: this.form.controls.qTenPayette.value,
          classification: this.totalPayette,
          risk: this.riskPayette,
          recommendations: this.recommendations,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ question_one:'', question_two:'', question_three:'',  question_four:'', question_five:'',  question_six:'',  question_seven:'',  question_eight:'', question_nine:'',  question_ten:'',  classification:'',    risk:'',   recommendations:'',});
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

    if (escale_id == 5) {
      this.form.controls.qOnePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qTwoPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qThreePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qFourPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qFivePayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qSixPayette.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classFragility.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePayette({
          question_one: this.form.controls.qOnePayette.value,
          question_two: this.form.controls.qTwoPayette.value,
          question_three: this.form.controls.qThreePayette.value,
          question_four: this.form.controls.qFourPayette.value,
          question_five: this.form.controls.qFivePayette.value,
          question_six: this.form.controls.qSixPayette.value,
          question_seven: this.form.controls.qSevenPayette.value,
          question_eight: this.form.controls.qEightPayette.value,
          question_nine: this.form.controls.qNinePayette.value,
          question_ten: this.form.controls.qTenPayette.value,
          total: this.totalFragility,
          classification: this.classFragility,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ question_one:'', question_two:'', question_three:'',  question_four:'', question_five:'',  question_six:'', total:'',    risk:'',   classification:'',});
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

    // this.form.controls.physical_state.setValidators(Validators.compose([Validators.required]));
    // this.form.controls.physical_state.clearValidators();
    // this.form.controls.physical_state.setErrors(null);

  }


}

