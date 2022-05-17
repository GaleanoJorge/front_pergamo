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
  public study: number = 0;
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

  public classPap: string = '';

  public classHamilton: string = '';

  public resultCam: string = '';

  public redCross = 0;
  public calificationRed: string = '';

  public riskNPedriatic: string = '';
  public classNPedriatic: string = '';

  public classFlacc: string = '';

  public classPpi: string = '';

  public classZarit: string = '';

  public rangePain: number = 0;
  public detailPain: string = '';

  public classPfeiffer: string = '';

  public riskJhDowtown: string = '';


  //Construcción tablas

  //Escala Norton



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
      eat: [this.data.eat],
      move: [this.data.move],
      cleanliness: [this.data.cleanliness],
      toilet: [this.data.toilet],
      shower: [this.data.shower],
      commute: [this.data.commute],
      stairs: [this.data.stairs],
      dress: [this.data.dress],
      fecal: [this.data.fecal],
      urine: [this.data.urine],
      totalBarthel: [this.data.totalBarthel],
      classBarthel: [this.data.classBarthel],

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

      //Escala News
      parameter_one: [this.data.parameter_one],
      parameter_two: [this.data.parameter_two],
      parameter_three: [this.data.parameter_three],
      parameter_four: [this.data.parameter_four],
      parameter_eight: [this.data.parameter_eight],
      parameter_six: [this.data.parameter_six],
      parameter_five: [this.data.parameter_five],
      parameter_seven: [this.data.parameter_seven],
      totalNews: [this.data.totalNews],
      riskNews: [this.data.riskNews],
      response: [this.data.response],

      //Escala Pap
      vOnePap: [this.data.vOnePap],
      vTwoPap: [this.data.vTwoPap],
      vThreePap: [this.data.vThreePap],
      vFourPap: [this.data.vFourPap],
      vFivePap: [this.data.vFivePap],
      vSixPap: [this.data.vSixPap],
      totalPap: [this.data.totalPap],
      classPap: [this.data.classPap],

      //Esacala Hamilton
      vOneHamilton: [this.data.vOneHamilton],
      vTwoHamilton: [this.data.vTwoHamilton],
      vThreeHamilton: [this.data.vThreeHamilton],
      vFourHamilton: [this.data.vFourHamilton],
      vFiveHamilton: [this.data.vFiveHamilton],
      vSixHamilton: [this.data.vSixHamilton],
      vSevenHamilton: [this.data.vSevenHamilton],
      vEigthHamilton: [this.data.vEigthHamilton],
      vNineHamilton: [this.data.vNineHamilton],
      vTenHamilton: [this.data.vTenHamilton],
      vElevenHamilton: [this.data.vElevenHamilton],
      vTwelveHamilton: [this.data.vTwelveHamilton],
      vThirteenHamilton: [this.data.vThirteenHamilton],
      vFourteenHamilton: [this.data.vFourteenHamilton],
      vFifteenHamilton: [this.data.vFifteenHamilton],
      vSixteenHamilton: [this.data.vSixteenHamilton],
      vSeventeenHamilton: [this.data.vSeventeenHamilton],
      totalHamilton: [this.data.totalHamilton],
      classHamilton: [this.data.classHamilton],

      //Escala CAM
      stateMindCam: [this.data.stateMindCam],
      attentionCam: [this.data.attentionCam],
      thoughtCam: [this.data.thoughtCam],
      awarenessCam: [this.data.awarenessCam],
      resultCam: [this.data.resultCam],

      //Escala FAC
      level: [this.data.level],
      definitionFacText: [this.data.definitionFacText],


      //Escala Red Cross
      gradeCross: [this.data.gradeCross],
      definitionCrossText: [this.data.definitionCrossText],

      //Escala Karnofsky
      scoreKarnofsky: [this.data.scoreKarnofsky],

      //Escala ECOG
      gradeEcog: [this.data.gradeEcog],
      definitionEcogText: [this.data.definitionEcogText],

      //Escala tamizake Nutricional pediátrico
      score_one: [this.data.score_one],
      score_two: [this.data.score_two],
      score_three: [this.data.score_three],
      score_four: [this.data.score_four],
      totalNPedriatic: [this.data.totalNPedriatic],
      riskNPedriatic: [this.data.riskNPedriatic],
      classNPedriatic: [this.data.classNPedriatic],

      //Escala Esas
      pain: [this.data.pain],
      tiredness: [this.data.tiredness],
      retching: [this.data.retching],
      depression: [this.data.depression],
      anxiety: [this.data.anxiety],
      drowsiness: [this.data.drowsiness],
      appetite: [this.data.appetite],
      welfare: [this.data.welfare],
      breathing: [this.data.breathing],
      sleep: [this.data.sleep],
      obsEsas: [this.data.obsEsas],

      //Escala Flacc
      face: [this.data.tiredness],
      legs: [this.data.retching],
      activityFlacc: [this.data.activityFlacc],
      crying: [this.data.anxiety],
      comfort: [this.data.drowsiness],
      totalFlacc: [this.data.totalFlacc],
      classFlacc: [this.data.classFlacc],

      //Escala PPI
      pps: [this.data.pps],
      oral: [this.data.oral],
      edema: [this.data.edema],
      dyspnoea: [this.data.dyspnoea],
      delirium: [this.data.delirium],
      totalPpi: [this.data.total],
      classPpi: [this.data.classPpi],

      //Escala Zarit
      ents: [this.data.ents],
      q_one: [this.data.q_one],
      q_two: [this.data.q_two],
      q_three: [this.data.q_three],
      q_four: [this.data.q_four],
      q_five: [this.data.q_five],
      q_six: [this.data.q_six],
      q_seven: [this.data.q_seven],
      q_eight: [this.data.q_eight],
      q_nine: [this.data.q_nine],
      q_ten: [this.data.q_ten],
      q_eleven: [this.data.q_eleven],
      q_twelve: [this.data.q_twelve],
      q_thirteen: [this.data.q_thirteen],
      q_fourteen: [this.data.q_fourteen],
      q_fifteen: [this.data.q_fifteen],
      q_sixteen: [this.data.q_sixteen],
      q_seventeen: [this.data.q_seventeen],
      q_eighteen: [this.data.q_eighteen],
      q_nineteen: [this.data.q_nineteen],
      q_twenty: [this.data.q_twenty],
      q_twenty_one: [this.data.q_twenty_one],
      q_twenty_two: [this.data.q_twenty_two],
      totalZarit: [this.data.totalZarit],
      classZarit: [this.data.classZarit],


      //Escala Pain 
      rangePain:[this.data.rangePain],

      //Escala Wong Baker
      painWong: [this.data.painWong],

      //Escala Pfeiffer
      study: [this.data.study],
      question_one: [this.data.question_one],
      question_two: [this.data.question_two],
      question_three: [this.data.question_three],
      question_four: [this.data.question_four],
      question_five: [this.data.question_five],
      question_six: [this.data.question_six],
      question_seven: [this.data.question_seven],
      question_eight: [this.data.question_eight],
      question_nine: [this.data.question_nine],
      question_ten: [this.data.question_ten],
      totalPfeiffer: [this.data.totalPfeiffer],
      classPfeiffer: [this.data.classPfeiffer],

      //Escala JhDowtown
      falls: [this.data.falls],
      medication: [this.data.medication],
      deficiency: [this.data.deficiency],
      mental: [this.data.mental],
      wandering: [this.data.wandering],
      totalJhDowton: [this.data.totalJhDowton],
      riskJhDowtown: [this.data.riskJhDowtown],


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

    this.form.get('gradeCross').valueChanges.subscribe(val => {
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

    this.form.get('gradeEcog').valueChanges.subscribe(val => {
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
        this.classBarthel = 'Dependencia Leve';

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
        this.classPap = 'Probabilidad > 70% de supervivencia a los 30 días';
      } else {
        this.classPap = 'Probabilidad entre 30-70% de supervivencia a los 30 días';
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
      this.totalHamilton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10 +
        this.num11 + this.num12 + this.num13 + this.num14 + this.num15 + this.num16 + this.num17 ;


      if (this.totalHamilton <= 7) {
        this.classHamilton = 'No deprimido';

      } else if (this.totalHamilton > 7 && this.totalHamilton <= 13) {
        this.classHamilton = 'Depresión ligera/menor';

      } else if (this.totalHamilton > 13 && this.totalHamilton <= 18) {
        this.classHamilton = 'Depresión moderada';

      } else if (this.totalHamilton > 18 || this.totalHamilton <= 22) {
        this.classHamilton = 'Depresión severa';

      } else {
        this.classHamilton = 'Depresión muy severa';

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
        this.classNPedriatic = 'Interconsulta a Nutrición para un diagnóstico completo, asesoría y seguimiento Nutricional Individual.';

      } else if ((this.totalNPedriatic >= 1 && this.totalNPedriatic <= 3)) {
        this.riskNPedriatic = 'Riesgo Medio';
        this.classNPedriatic = 'Considerar la Intervención nutricional, verificar el peso dos veces a la semana y evaluar el riesgo nutricional después de una semana.';
      } else {
        this.riskNPedriatic = 'Riesgo Bajo';
        this.classNPedriatic = ' No es necesaria intervención, verificar peso y evaluar riesgo después de una semana.';
      }

    } else if (type == 11) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num4;
      this.totalFlacc = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalFlacc == 0) {
        this.classFlacc = 'No Dolor';

      } else if ((this.totalFlacc > 1 && this.totalFlacc <= 2)) {
        this.classFlacc = 'Dolor Leve';

      } else if ((this.totalFlacc > 3 && this.totalFlacc <= 5)) {
        this.classFlacc = 'Dolor Moderado';

      } else if ((this.totalFlacc > 6 && this.totalFlacc <= 8)) {
        this.classFlacc = 'Dolor Intenso ';

      } else if ((this.totalFlacc > 9 && this.totalFlacc <= 10)) {
        this.classFlacc = ' Maximo Dolor imaginable';
      }
    } else if (type == 12) {
      this.num1 = orden == 1 ? Number(e) : this.num1;
      this.num2 = orden == 2 ? Number(e) : this.num2;
      this.num3 = orden == 3 ? Number(e) : this.num3;
      this.num4 = orden == 4 ? Number(e) : this.num4;
      this.num5 = orden == 5 ? Number(e) : this.num4;
      this.totalPpi = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalPpi > 6) {
        this.classPpi = 'Predicción de supervivencia de tres semanas';

      } else if ((this.totalPpi < 4)) {
        this.classPpi = 'Predicción de supervivencia de seis semanas';

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
        this.classZarit = 'Sobrecarga';

      } else if ((this.totalZarit > 47 && this.totalZarit < 55)) {
        this.classZarit = 'Sobrecarga Leve';

      } else if ((this.totalZarit >= 56)) {
        this.classZarit = 'Sobrecarga Intensa';
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

      if (!this.form.controls.study.value) {

        if (this.totalPfeiffer >= 0 && this.totalPfeiffer <= 3) {
          this.classPfeiffer = 'Sin deterioro cognitivo';

        } else if ((this.totalPfeiffer >= 4 && this.totalPfeiffer <= 5)) {
          this.classPfeiffer = 'Deterioro cognitivo leve';

        } else if ((this.totalPfeiffer >= 6 && this.totalPfeiffer <= 8)) {
          this.classPfeiffer = 'Deterioro cognitivo moderado';

        } else if ((this.totalPfeiffer > 8 )) {
          this.classPfeiffer = 'Deterioro cognitivo severo';
        }
      } else {
        if (this.totalPfeiffer >= 0 && this.totalPfeiffer <= 1) {
          this.classPfeiffer = 'Sin deterioro cognitivo';

        } else if ((this.totalPfeiffer >= 2 && this.totalPfeiffer <= 3)) {
          this.classPfeiffer = 'Deterioro cognitivo leve';

        } else if ((this.totalPfeiffer >= 4 && this.totalPfeiffer <= 6)) {
          this.classPfeiffer = 'Deterioro cognitivo moderado';

        } else if ((this.totalPfeiffer >= 7)) {
          this.classPfeiffer = 'Deterioro cognitivo severos';
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

    } else if (type == 16) {
      
      if (this.rangePain == 0) {
        this.detailPain = 'Sin dolor';

      } else if ((this.rangePain >=1 || this.rangePain <=3)) {
        this.detailPain = 'Suave ';

      } else if ((this.rangePain >=4 || this.rangePain <=6 )) {
        this.detailPain = 'Dolor moderado';

      } else if ((this.rangePain >=7 || this.rangePain <=10 )) {
        this.detailPain = 'Dolor intenso';

      }

    }
    

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
          type_record_id: 4,
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
          type_record_id: 4,
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
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ eat: '', move: '', cleanliness: '', toilet: '', shower: '', commute: '', stairs: '', dress: '', fecal: '', urine: '', score: '', classification: '' });
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
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ question_one: '', question_two: '', question_three: '', question_four: '', question_five: '', question_six: '', question_seven: '', question_eight: '', question_nine: '', question_ten: '', classification: '', risk: '', recommendations: '', });
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
          this.form.setValue({ question_one: '', question_two: '', question_three: '', question_four: '', question_five: '', question_six: '', total: '', risk: '', classification: '', });
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

    if (escale_id == 6) {
      this.form.controls.qTwoFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qOneFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qThreeFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qFourFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qFiveFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qSixFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalFragility.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classFragility.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveFragility({
          question_one: this.form.controls.qTwoFragility.value,
          question_two: this.form.controls.qOneFragility.value,
          question_three: this.form.controls.qThreeFragility.value,
          question_four: this.form.controls.qFourFragility.value,
          question_five: this.form.controls.qFiveFragility.value,
          question_six: this.form.controls.qSixFragility.value,
          total: this.totalFragility,
          classification: this.classFragility,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ question_one: '', qTwoFragility: '', question_two: '', question_three: '', question_four: '', question_five: '', question_six: '', total: '', classification: '', });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 7) {
      this.form.controls.parameter_one.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_two.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_three.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_four.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_eight.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_six.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_five.setValidators(Validators.compose([Validators.required]));
      this.form.controls.parameter_seven.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalNews.setValidators(Validators.compose([Validators.required]));
      this.form.controls.riskNews.setValidators(Validators.compose([Validators.required]));
      this.form.controls.response.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveNews({
          parameter_one: this.form.controls.parameter_one.value,
          parameter_two: this.form.controls.parameter_two.value,
          parameter_three: this.form.controls.parameter_three.value,
          parameter_four: this.form.controls.parameter_four.value,
          parameter_eight: this.form.controls.parameter_eight.value,
          parameter_six: this.form.controls.parameter_six.value,
          parameter_five: this.form.controls.parameter_five.value,
          parameter_seven: this.form.controls.parameter_seven.value,
          qualification: this.totalNews,
          risk: this.riskNews,
          response: this.response,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ parameter_one: '', parameter_two: '', parameter_three: '', parameter_four: '', parameter_eight: '', parameter_six: '', parameter_five: '', parameter_seven: '', qualification: '', risk: '', response: '', });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 8) {
      this.form.controls.vOnePap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vTwoPap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vThreePap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vFourPap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vFivePap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vSixPap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalPap.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classPap.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePap({
          variable_one: this.form.controls.vOnePap.value,
          variable_two: this.form.controls.vTwoPap.value,
          variable_three: this.form.controls.vThreePap.value,
          variable_four: this.form.controls.vFourPap.value,
          variable_five: this.form.controls.vFivePap.value,
          variable_six: this.form.controls.vSixPap.value,
          total: this.totalPap,
          classification: this.classPap,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ variable_one: '', variable_two: '', variable_three: '', variable_four: '', variable_five: '', variable_six: '', total: '', classification: '', qualification: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 9) {
      this.form.controls.vOneHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vTwoHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vThreeHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vFourHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vFiveHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vSixHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vSevenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vEigthHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vNineHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vTenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vElevenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vTwelveHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vThirteenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vFourteenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vFifteenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vSixteenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.vSeventeenHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalHamilton.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classHamilton.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveHamilton({
          variable_one: this.form.controls.vOneHamilton.value,
          variable_two: this.form.controls.vTwoHamilton.value,
          variable_three: this.form.controls.vThreeHamilton.value,
          variable_four: this.form.controls.vFourHamilton.value,
          variable_five: this.form.controls.vFiveHamilton.value,
          variable_six: this.form.controls.vSixHamilton.value,
          variable_seven: this.form.controls.vSevenHamilton.value,
          variable_eigth: this.form.controls.vEigthHamilton.value,
          variable_nine: this.form.controls.vNineHamilton.value,
          variable_ten: this.form.controls.vTenHamilton.value,
          variable_eleven: this.form.controls.vElevenHamilton.value,
          variable_twelve: this.form.controls.vTwelveHamilton.value,
          variable_thirteen: this.form.controls.vThirteenHamilton.value,
          variable_fourteen: this.form.controls.vFourteenHamilton.value,
          variable_fifteen: this.form.controls.vFifteenHamilton.value,
          variable_sixteen: this.form.controls.vSixteenHamilton.value,
          variable_seventeen: this.form.controls.vSeventeenHamilton.value,
          total: this.totalHamilton,
          qualification: this.classHamilton,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({
            variable_one: '', variable_two: '', variable_three: '', variable_four: '', variable_five: '', variable_six: '', variable_seven: '',
            variable_eigth: '', variable_nine: '', variable_ten: '', variable_eleven: '', variable_twelve: '', variable_thirteen: '', variable_fourteen: '',
            variable_fifteen: '', variable_sixteen: '', variable_seventeen: '', total: '', qualification: ''
          });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 10) {
      this.form.controls.stateMindCam.setValidators(Validators.compose([Validators.required]));
      this.form.controls.attentionCam.setValidators(Validators.compose([Validators.required]));
      this.form.controls.thoughtCam.setValidators(Validators.compose([Validators.required]));
      this.form.controls.awarenessCam.setValidators(Validators.compose([Validators.required]));
      this.form.controls.resultCam.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveCam({
          state_mind: this.form.controls.stateMindCam.value,
          attention: this.form.controls.attentionCam.value,
          thought: this.form.controls.thoughtCam.value,
          awareness: this.form.controls.awarenessCam.value,
          classification: this.resultCam,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ state_mind: '', attention: '', thought: '', awareness: '', classification: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 11) {
      this.form.controls.level.setValidators(Validators.compose([Validators.required]));
      this.form.controls.definitionFacText.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveFac({
          level: this.form.controls.level.value,
          definition: this.definitionFacText,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ level: '', definition: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 12) {
      this.form.controls.gradeCross.setValidators(Validators.compose([Validators.required]));
      this.form.controls.definitionCrossText.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveRedCross({
          grade: this.form.controls.gradeCross.value,
          definition: this.definitionCrossText,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ grade: '', definition: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 13) {
      this.form.controls.scoreKarnofsky.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveKarnofsky({
          score: this.form.controls.scoreKarnofsky.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ scoreKarnofsky: '', });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 14) {
      this.form.controls.gradeEcog.setValidators(Validators.compose([Validators.required]));
      this.form.controls.definitionEcogText.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveEcog({
          grade: this.form.controls.gradeEcog.value,
          definition: this.definitionEcogText,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ grade: '', definition: '', });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 15) {
      this.form.controls.score_one.setValidators(Validators.compose([Validators.required]));
      this.form.controls.score_two.setValidators(Validators.compose([Validators.required]));
      this.form.controls.score_three.setValidators(Validators.compose([Validators.required]));
      this.form.controls.score_four.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalNPedriatic.setValidators(Validators.compose([Validators.required]));
      this.form.controls.riskNPedriatic.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classNPedriatic.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePNutrition({
          score_one: this.form.controls.score_one.value,
          score_two: this.form.controls.score_two.value,
          score_three: this.form.controls.score_three.value,
          score_four: this.form.controls.score_four.value,
          total: this.totalNPedriatic,
          risk: this.riskNPedriatic,
          classification: this.classNPedriatic,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ score_one: '', score_two: '', score_three: '', score_four: '', total: '', risk: '', classification: '', });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 16) {
      this.form.controls.pain.setValidators(Validators.compose([Validators.required]));
      this.form.controls.tiredness.setValidators(Validators.compose([Validators.required]));
      this.form.controls.retching.setValidators(Validators.compose([Validators.required]));
      this.form.controls.depression.setValidators(Validators.compose([Validators.required]));
      this.form.controls.anxiety.setValidators(Validators.compose([Validators.required]));
      this.form.controls.drowsiness.setValidators(Validators.compose([Validators.required]));
      this.form.controls.appetite.setValidators(Validators.compose([Validators.required]));
      this.form.controls.welfare.setValidators(Validators.compose([Validators.required]));
      this.form.controls.breathing.setValidators(Validators.compose([Validators.required]));
      this.form.controls.sleep.setValidators(Validators.compose([Validators.required]));
      this.form.controls.obsEsas.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveEsas({
          pain: this.form.controls.pain.value,
          tiredness: this.form.controls.tiredness.value,
          retching: this.form.controls.retching.value,
          depression: this.form.controls.depression.value,
          anxiety: this.form.controls.anxiety.value,
          drowsiness: this.form.controls.drowsiness.value,
          appetite: this.form.controls.appetite.value,
          welfare: this.form.controls.welfare.value,
          breathing: this.form.controls.breathing.value,
          sleep: this.form.controls.sleep.value,
          observation: this.form.controls.obsEsas.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ pain: '', tiredness: '', retching: '', depression: '', anxiety: '', drowsiness: '', appetite: '', welfare: '', breathing: '', sleep: '', observation: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 17) {
      this.form.controls.face.setValidators(Validators.compose([Validators.required]));
      this.form.controls.legs.setValidators(Validators.compose([Validators.required]));
      this.form.controls.activityFlacc.setValidators(Validators.compose([Validators.required]));
      this.form.controls.crying.setValidators(Validators.compose([Validators.required]));
      this.form.controls.comfort.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalFlacc.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classFlacc.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveFlacc({
          face: this.form.controls.face.value,
          legs: this.form.controls.legs.value,
          activity: this.form.controls.activityFlacc.value,
          crying: this.form.controls.crying.value,
          comfort: this.form.controls.comfort.value,
          total: this.totalFlacc,
          classification: this.classFlacc,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ face: '', legs: '', activity: '', crying: '', comfort: '', total: '', qualification: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 18) {
      this.form.controls.pps.setValidators(Validators.compose([Validators.required]));
      this.form.controls.oral.setValidators(Validators.compose([Validators.required]));
      this.form.controls.edema.setValidators(Validators.compose([Validators.required]));
      this.form.controls.dyspnoea.setValidators(Validators.compose([Validators.required]));
      this.form.controls.delirium.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalPpi.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classPpi.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePpi({
          pps: this.form.controls.pps.value,
          oral: this.form.controls.oral.value,
          edema: this.form.controls.edema.value,
          dyspnoea: this.form.controls.dyspnoea.value,
          delirium: this.form.controls.delirium.value,
          total: this.totalPpi,
          classification: this.classPpi,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ pps: '', oral: '', edema: '', dyspnoea: '', delirium: '', total: '', classification: '' });
          if (this.saved) {
            this.saved()

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

    if (escale_id == 19) {
      this.form.controls.q_one.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_two.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_three.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_four.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_five.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_six.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_seven.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_eight.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_nine.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_ten.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_eleven.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_twelve.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_thirteen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_fourteen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_fifteen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_sixteen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_seventeen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_eighteen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_nineteen.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_twenty.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_twenty_one.setValidators(Validators.compose([Validators.required]));
      this.form.controls.q_twenty_two.setValidators(Validators.compose([Validators.required]));
      this.form.controls.totalZarit.setValidators(Validators.compose([Validators.required]));
      this.form.controls.classZarit.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveZarit({
          q_one: this.form.controls.q_one.value,
          q_two: this.form.controls.q_two.value,
          q_three: this.form.controls.q_three.value,
          q_four: this.form.controls.q_four.value,
          q_five: this.form.controls.q_five.value,
          q_six: this.form.controls.q_six.value,
          q_seven: this.form.controls.q_seven.value,
          q_eight: this.form.controls.q_eight.value,
          q_nine: this.form.controls.q_nine.value,
          q_ten: this.form.controls.q_ten.value,
          q_eleven: this.form.controls.q_eleven.value,
          q_twelve: this.form.controls.q_twelve.value,
          q_thirteen: this.form.controls.q_thirteen.value,
          q_fourteen: this.form.controls.q_fourteen.value,
          q_fifteen: this.form.controls.q_fifteen.value,
          q_sixteen: this.form.controls.q_sixteen.value,
          q_seventeen: this.form.controls.q_seventeen.value,
          q_eighteen: this.form.controls.q_eighteen.value,
          q_nineteen: this.form.controls.q_nineteen.value,
          q_twenty: this.form.controls.q_twenty.value,
          q_twenty_one: this.form.controls.q_twenty_one.value,
          q_twenty_two: this.form.controls.q_twenty_two.value,
          total: this.totalZarit,
          classification: this.classZarit,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ q_one: '', q_two: '', q_three: '', q_four: '', q_five: '', q_six: '', q_seven: '', q_eight: '', q_nine: '', q_ten: '', q_eleven: '', q_twelve: '', q_thirteen: '', q_fourteen: '', q_fifteen: '', q_sixteen: '', q_seventeen: '', q_eighteen: '', q_nineteen: '', q_twenty: '', q_twenty_one: '', q_twenty_two: '', total: '', classification: '' });
          if (this.saved) {
            this.saved()
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

      if (escale_id == 20) {
        this.form.controls.rangePain.setValidators(Validators.compose([Validators.required]));
        this.loading = true;
        this.showTable = false;
        if (!this.form.invalid) {
          await this.chScalesS.SavePain({
            range: this.form.controls.rangePain.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          }).then(x => {
            this.toastService.success('', x.message);
            this.form.setValue({ range: ''});
            if (this.saved) {
              this.saved()
  
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

      if (escale_id == 21) {
        this.form.controls.painWong.setValidators(Validators.compose([Validators.required]));
        this.loading = true;
        this.showTable = false;
        if (!this.form.invalid) {
          await this.chScalesS.SaveWongBaker({
            pain: this.form.controls.painWong.value,
            type_record_id: 1,
            ch_record_id: this.record_id,
          }).then(x => {
            this.toastService.success('', x.message);
            this.form.setValue({ range: ''});
            if (this.saved) {
              this.saved()
  
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

      if (escale_id == 22) {
        this.form.controls.question_one.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_two.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_three.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_four.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_five.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_six.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_seven.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_eight.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_nine.setValidators(Validators.compose([Validators.required]));
        this.form.controls.question_ten.setValidators(Validators.compose([Validators.required]));
        this.form.controls.totalPfeiffer.setValidators(Validators.compose([Validators.required]));
        this.form.controls.classPfeiffer.setValidators(Validators.compose([Validators.required]));
        this.loading = true;
        this.showTable = false;
        if (!this.form.invalid) {
          await this.chScalesS.SavePfeiffer({
            study:this.form.controls.study.value,
            question_one: this.form.controls.question_one.value,
            question_two: this.form.controls.question_two.value,
            question_three: this.form.controls.question_three.value,
            question_four: this.form.controls.question_four.value,
            question_five: this.form.controls.question_five.value,
            question_six: this.form.controls.question_six.value,
            question_seven: this.form.controls.question_seven.value,
            question_eight: this.form.controls.question_eight.value,
            question_nine: this.form.controls.question_nine.value,
            question_ten: this.form.controls.question_ten.value,
            total: this.totalPfeiffer,
            classification: this.classPfeiffer,
            type_record_id: 1,
            ch_record_id: this.record_id,
          }).then(x => {
            this.toastService.success('', x.message);
            this.form.setValue({ range: ''});
            if (this.saved) {
              this.saved()
  
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

      if (escale_id == 23) {
        this.form.controls.falls.setValidators(Validators.compose([Validators.required]));
        this.form.controls.medication.setValidators(Validators.compose([Validators.required]));
        this.form.controls.deficiency.setValidators(Validators.compose([Validators.required]));
        this.form.controls.mental.setValidators(Validators.compose([Validators.required]));
        this.form.controls.wandering.setValidators(Validators.compose([Validators.required]));
        this.form.controls.totalJhDowton.setValidators(Validators.compose([Validators.required]));
        this.form.controls.riskJhDowtown.setValidators(Validators.compose([Validators.required]));
        this.loading = true;
        this.showTable = false;
        if (!this.form.invalid) {
          await this.chScalesS.SaveJhDowton({
            falls: this.form.controls.falls.value,
            medication: this.form.controls.medication.value,
            deficiency: this.form.controls.deficiency.value,
            mental: this.form.controls.mental.value,
            wandering: this.form.controls.wandering.value,
            total: this.totalJhDowton,
            risk: this.riskJhDowtown,
            type_record_id: 1,
            ch_record_id: this.record_id,
          }).then(x => {
            this.toastService.success('', x.message);
            this.form.setValue({ range: ''});
            if (this.saved) {
              this.saved()
  
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

      // SaveJhDowton
      

        }
}