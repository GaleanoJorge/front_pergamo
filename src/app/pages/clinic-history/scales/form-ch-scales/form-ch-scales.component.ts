import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChScalesService } from '../../../../business-controller/ch_scales.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'ngx-form-ch-scales',
  templateUrl: './form-ch-scales.component.html',
  styleUrls: ['./form-ch-scales.component.scss']
})

export class FormChScalesComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() enfermery: any = null;
  @Input() respiratory: any = null;
  @Input() medical: any = null;
  @Input() nutrition: any = null;
  @Input() record_id: any = null;
  @Input() age: any = null;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public isSelected: any = 200;
  public ageScale: number;
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

  public ppsObj;

  public arrayDefinitionsPps =
    [
      {
        id: 100,
        text: 'Deambulación:Completa. Actividad evidencia de enfermedad:Actividad normal. Sin evidencia de enfermedad. Autocuidado:Completo Ingesta:Normal. Nivel de conciencia:Normal',

      },
      {
        id: 90,
        text: 'Deambulación:Completa Actividad evidencia de enfermedad: Actividad normal. Sin evidencia de enfermedad Autocuidado:Completo Ingesta:Normal. Nivel de conciencia:Normal',
      },
      {
        id: 80,
        text: 'Deambulación:Completa. Actividad evidencia de enfermedad: Actividad normal con esfuerzo. Alguna evidencia de enfermedad. Autocuidado: Completo. Ingesta:Normal o reducida. Nivel de conciencia:Normal',
      },
      {
        id: 70,
        text: 'Deambulación:Reducida. Actividad evidencia de enfermedad: Incapaz de realizar actividad laboral normal. Alguna evidencia de enfermedad. Autocuidado:Completo. Ingesta:Normal o reducida. Nivel de conciencia:Normal',
      },
      {
        id: 60,
        text: 'Deambulación:Reducida.Actividad evidencia de enfermedad: Incapaz de realizar tareas del hogar. Enfermedad significativa. Autocuidado:Precisa asistencia ocasional. Ingesta:Normal o reducida. Nivel de conciencia:Normal o sindrome confusional',
      },
      {
        id: 50,
        text: 'Deambulación:Vida principalmente cama / sillón. Actividad evidencia de enfermedad: Incapaz para realizar cualquier tipo de trabajo. Enfermedad extensa. Autocuidado:Precisa considerable asistencia. Ingesta:Normal o reducida. Nivel de conciencia:Normal o sindrome confusional',
      },
      {
        id: 40,
        text: 'Deambulación:Pasa la mayor parte del tiempo en cama. Actividad evidencia de enfermedad:Incapaz para realizar cualquier tipo de trabajo. Enfermedad extensa. Autocuidado:Precisa ayuda para casi todas las actividades. Ingesta:Normal o reducida. Nivel de conciencia:Normal o somnoliento o sindrome confusional',
      },
      {
        id: 30,
        text: 'Deambulación:Encamado. Actividad evidencia de enfermedad:Incapaz para realizar cualquier tipo de trabajo. Enfermedad extensa. Autocuidado:Totalmente dependiente. Ingesta: Reducida. Nivel de conciencia:Normal o somnoliento o sindrome confusional',
      },
      {
        id: 20,
        text: 'Deambulación:Encamado. Actividad evidencia de enfermedad:Incapaz para realizar cualquier tipo de trabajo. Enfermedad extensa. Autocuidado:Totalmente dependiente. Ingesta: Capaz sólo de beber a sorbos. Nivel de conciencia:Normal o somnoliento o sindrome confusional',
      },
      {
        id: 10,
        text: 'Deambulación:Encamado. Actividad evidencia de enfermedad:Incapaz para realizar cualquier tipo de trabajo. Enfermedad extensa. Autocuidado:Totalmente dependiente. Ingesta:Sólo cuidados de la boca. Nivel de conciencia:Somnoliento o coma',
      },
      {
        id: 0,
        text: 'Deambulación:Exitus',
      }
    ]


  public definitionFacText = '';
  public definitionCrossText = '';
  public definitionEcogText = '';
  public definitionPpsText = '';
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
  public totalPfeiffer = 0;
  public totalJhDownton = 0;
  public totalScreening = 0;
  public totalBraden = 0;
  public totalLawton = 0;
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

  public refresh1 = false;
  public refresh2 = false;
  public refresh3 = false;
  public refresh4 = false;
  public refresh5 = false;
  public refresh7 = false;
  public refresh8 = false;
  public refresh9 = false;
  public refresh10 = false;
  public refresh11 = false;
  public refresh12 = false;
  public refresh13 = false;
  public refresh14 = false;
  public refresh15 = false;
  public refresh16 = false;
  public refresh17 = false;
  public refresh18 = false;
  public refresh19 = false;
  public refresh20 = false;
  public refresh21 = false;
  public refresh22 = false;
  public refresh23 = false;
  public refresh24 = false;
  public refresh25 = false;
  public refresh26 = false;
  public refresh27 = false;

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

  public riskJhDownton: string = '';

  public riskScreening: string = '';

  public riskBraden: string = '';

  public riskLawton: string = '';


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
    
    if(this.age) {
      this.ageScale = this.getAge(this.age.birthday);
    }
    this.form = this.formBuilder.group({

      //Escala Norton Form
      physical_value: [this.data.physical_value],
      mind_value: [this.data.mind_value],
      mobility_value: [this.data.mobility_value],
      activity_value: [this.data.activity_value],
      incontinence_value: [this.data.incontinence_value],
      totalNorton: [this.data.totalNorton],
      risk_norton: [this.data.risk_norton],

      //Escala Glasgow Form
      motor_value: [this.data.motor_value],
      verbal_value: [this.data.verbal_value],
      ocular_value: [this.data.ocular_value],
      totalGlasgow: [this.data.totalGlasgow],

      //Escala Barthel Form
      eat_value: [this.data.eat],
      move_value: [this.data.move],
      cleanliness_value: [this.data.cleanliness],
      toilet_value: [this.data.toilet],
      shower_value: [this.data.shower],
      commute_value: [this.data.commute],
      stairs_value: [this.data.stairs],
      dress_value: [this.data.dress],
      fecal_value: [this.data.fecal],
      urine_value: [this.data.urine],
      totalBarthel: [this.data.totalBarthel],
      classBarthel: [this.data.classBarthel],

      //Escala Payette
      qOnePayette_value: [this.data.qOnePayette_value],
      qTwoPayette_value: [this.data.qTwoPayette_value],
      qThreePayette_value: [this.data.qThreePayette_value],
      qFourPayette_value: [this.data.qFourPayette_value],
      qFivePayette_value: [this.data.qFivePayette_value],
      qSixPayette_value: [this.data.qSixPayette_value],
      qSevenPayette_value: [this.data.qSevenPayette_value],
      qEightPayette_value: [this.data.qEightPayette_value],
      qNinePayette_value: [this.data.qNinePayette_value],
      qTenPayette_value: [this.data.qTenPayette_value],
      totalPayette: [this.data.totalPayette],
      riskPayette: [this.data.riskPayette],
      recommendations: [this.data.recommendations],

      //Escala Fragility
      qOneFragility_value: [this.data.qOneFragility_value],
      qTwoFragility_value: [this.data.qTwoFragility_value],
      qThreeFragility_value: [this.data.qThreeFragility_value],
      qFourFragility_value: [this.data.qFourFragility_value],
      qFiveFragility_value: [this.data.qFiveFragility_value],
      qSixFragility_value: [this.data.qSixFragility_value],
      totalFragility: [this.data.totalFragility],
      classFragility: [this.data.classFragility],

      //Escala News
      pOneNews_value: [this.data.pOneNews_value],
      pTwoNews_value: [this.data.pTwoNews_value],
      pThreeNews_value: [this.data.pThreeNews_value],
      pFourNews_value: [this.data.pFourNews_value],
      pFiveNews_value: [this.data.pFiveNews_value],
      pSixNews_value: [this.data.pSixNews_value],
      pSevenNews_value: [this.data.pSevenNews_value],
      pEightNews_value: [this.data.pEightNews_value],
      totalNews: [this.data.totalNews],
      riskNews: [this.data.riskNews],
      response: [this.data.response],

      //Escala Pap
      vOnePap_value: [this.data.vOnePap_value],
      vTwoPap_value: [this.data.vTwoPap_value],
      vThreePap_value: [this.data.vThreePap_value],
      vFourPap_value: [this.data.vFourPap_value],
      vFivePap_value: [this.data.vFivePap_value],
      vSixPap_value: [this.data.vSixPap_value],
      totalPap: [this.data.totalPap],
      classPap: [this.data.classPap],

      //Esacala Hamilton
      vOneHamilton_value: [this.data.vOneHamilton_value],
      vTwoHamilton_value: [this.data.vTwoHamilton_value],
      vThreeHamilton_value: [this.data.vThreeHamilton_value],
      vFourHamilton_value: [this.data.vFourHamilton_value],
      vFiveHamilton_value: [this.data.vFiveHamilton_value],
      vSixHamilton_value: [this.data.vSixHamilton_value],
      vSevenHamilton_value: [this.data.vSevenHamilton_value],
      vEightHamilton_value: [this.data.vEightHamilton_value],
      vNineHamilton_value: [this.data.vNineHamilton_value],
      vTenHamilton_value: [this.data.vTenHamilton_value],
      vElevenHamilton_value: [this.data.vElevenHamilton_value],
      vTwelveHamilton_value: [this.data.vTwelveHamilton_value],
      vThirteenHamilton_value: [this.data.vThirteenHamilton_value],
      vFourteenHamilton_value: [this.data.vFourteenHamilton_value],
      vFifteenHamilton_value: [this.data.vFifteenHamilton_value],
      vSixteenHamilton_value: [this.data.vSixteenHamilton_value],
      vSeventeenHamilton_value: [this.data.vSeventeenHamilton_value],
      totalHamilton: [this.data.totalHamilton],
      classHamilton: [this.data.classHamilton],

      //Escala CAM
      mindCam_value: [this.data.stateMindCam],
      attentionCam_value: [this.data.attentionCam],
      thoughtCam_value: [this.data.thoughtCam],
      awarenessCam_value: [this.data.awarenessCam],
      resultCam: [this.data.resultCam],

      //Escala FAC
      level_value: [this.data.level_value],
      definitionFacText: [this.data.definitionFacText],


      //Escala Red Cross
      grade_value: [this.data.grade_value],
      definitionCrossText: [this.data.definitionCrossText],

      //Escala Karnofsky
      scoreKarnofsky_value: [this.data.scoreKarnofsky_value],


      //Escala ECOG
      gradeEcog_value: [this.data.gradeEcog_value],
      definitionEcogText: [this.data.definitionEcogText],

      //Escala tamizaje Nutricional pediátrico
      score_one_value: [this.data.score_one_value],
      score_two_value: [this.data.score_two_value],
      score_three_value: [this.data.score_three_value],
      score_four_value: [this.data.score_four_value],
      totalNPedriatic: [this.data.totalNPedriatic],
      riskNPedriatic: [this.data.riskNPedriatic],
      classNPedriatic: [this.data.classNPedriatic],

      //Escala Esas
      pain_value: [this.data.pain_value],
      tiredness_value: [this.data.tiredness_value],
      retching_value: [this.data.retching_value],
      depression_value: [this.data.depression_value],
      anxiety_value: [this.data.anxiety_value],
      drowsiness_value: [this.data.drowsiness_value],
      appetite_value: [this.data.appetite_value],
      welfare_value: [this.data.welfare_value],
      breathing_value: [this.data.breathing_value],
      sleep_value: [this.data.sleep_title],
      obsEsas: [this.data.obsEsas],

      //Escala Flacc
      face_value: [this.data.face_value],
      legs_value: [this.data.legs_value],
      activityFlacc_value: [this.data.activityFlacc_value],
      crying_value: [this.data.crying_value],
      comfort_value: [this.data.comfort_value],
      totalFlacc: [this.data.totalFlacc],
      classFlacc: [this.data.classFlacc],

      //Escala PPI
      pps_value: [this.data.pps_value],
      oral_value: [this.data.oral_value],
      edema_value: [this.data.edema_value],
      dyspnoea_value: [this.data.dyspnoea_value],
      delirium_value: [this.data.delirium_value],
      totalPpi: [this.data.total],
      classPpi: [this.data.classPpi],

      //Escala Zarit
      q_one_value: [this.data.q_one_value],
      q_two_value: [this.data.q_two_value],
      q_three_value: [this.data.q_three_value],
      q_four_value: [this.data.q_four_value],
      q_five_value: [this.data.q_five_value],
      q_six_value: [this.data.q_six_value],
      q_seven_value: [this.data.q_seven_value],
      q_eight_value: [this.data.q_eight_value],
      q_nine_value: [this.data.q_nine_value],
      q_ten_value: [this.data.q_ten_value],
      q_eleven_value: [this.data.q_eleven_value],
      q_twelve_value: [this.data.q_twelve_value],
      q_thirteen_value: [this.data.q_thirteen_value],
      q_fourteen_value: [this.data.q_fourteen_value],
      q_fifteen_value: [this.data.q_fifteen_value],
      q_sixteen_value: [this.data.q_sixteen_value],
      q_seventeen_value: [this.data.q_seventeen_value],
      q_eighteen_value: [this.data.q_eighteen_value],
      q_nineteen_value: [this.data.q_nineteen_value],
      q_twenty_value: [this.data.q_twenty_value],
      q_twenty_one_value: [this.data.q_twenty_one_value],
      q_twenty_two_value: [this.data.q_twenty_two_value],
      totalZarit: [this.data.totalZarit],
      classZarit: [this.data.classZarit],


      //Escala Pain 
      rangePain_value: [this.data.rangePain_value],

      //Escala Wong Baker
      painWong_value: [this.data.painWong_value],

      //Escala Pfeiffer
      studyValue: [this.data.studyValue],
      qOneValue: [this.data.qOneValue],
      qTwoValue: [this.data.qTwoValue],
      qThreeValue: [this.data.qThreeValue],
      qFourValue: [this.data.qFourValue],
      qFiveValue: [this.data.qFiveValue],
      qSixValue: [this.data.qSixValue],
      qSevenValue: [this.data.qSevenValue],
      qEightValue: [this.data.qEightValue],
      qNineValue: [this.data.qNineValue],
      qTenValue: [this.data.qTenValue],
      totalPfeiffer: [this.data.totalPfeiffer],
      classPfeiffer: [this.data.classPfeiffer],

      //Escala JhDowtown
      falls_value: [this.data.falls_value],
      medication_value: [this.data.medication_value],
      deficiency_value: [this.data.deficiency_value],
      mental_value: [this.data.mental_value],
      wandering_value: [this.data.wandering_value],
      totalJhDownton: [this.data.totalJhDownton],
      riskJhDownton: [this.data.riskJhDownton],

      //Escala screening
      vOneScreening_value: [this.data.vOneScreening_value],
      vTwoScreening_value: [this.data.vTwoScreening_value],
      vThreeScreening_value: [this.data.vThreeScreening_value],
      vFourScreening_value: [this.data.vFourScreening_value],
      vFiveScreening_value: [this.data.vFiveScreening_value],
      vSixScreening_value: [this.data.vSixScreening_value],
      vSevenScreening_value: [this.data.vSevenScreening_value],
      vEightScreening_value: [this.data.vEightScreening_value],
      vNineScreening_value: [this.data.vNineScreening_value],
      vTenScreening_value: [this.data.vTenScreening_value],
      totalScreening: [this.data.totalScreening],
      riskScreening: [this.data.riskScreening],

      //Escala PPS
      scorePps_value: [this.data.scorePps_value],

      //Escala braden
      sensoryBradenValue: [this.data.sensoryBradenValue],
      humidityBradenValue: [this.data.humidityBradenValue],
      activityBradenValue: [this.data.activityBradenValue],
      mobilityBradenValue: [this.data.mobilityBradenValue],
      nutritionBradenValue: [this.data.nutritionBradenValue],
      lesionBradenValue: [this.data.lesionBradenValue],
      totalBraden: [this.data.totalBraden],
      riskBraden: [this.data.riskBraden],

      //Escala Lawton
      phone_value: [this.data.phone_value],
      shopping_value: [this.data.shopping_value],
      food_value: [this.data.food_value],
      house_value: [this.data.house_value],
      clothing_value: [this.data.clothing_value],
      transport_value: [this.data.transport_value],
      medicationValue: [this.data.medicationValue],
      finance_value: [this.data.finance_value],
      totalLawton: [this.data.totalLawton],
      riskLawton: [this.data.riskLawton],

    });
    this.onChanges();
  }

  onChanges() {
    this.form.get('level_value').valueChanges.subscribe(val => {
      var result = this.separateText(val);
      if (result[0] === '') {
        this.definitionFacText = '';
      } else {
        var localidentify = this.arrayDefinitionsFac.find(item => item.id == result[0]);
        if (localidentify) {
          this.definitionFacText = localidentify.text;
        } else {
          this.definitionFacText = '';
        }
      }
    })

    this.form.get('grade_value').valueChanges.subscribe(val => {
      var result = this.separateText(val);
      if (result[0] === '') {
        this.definitionCrossText = '';
      } else {
        var localidentifyCross = this.arrayDefinitionsCross.find(item => item.id == result[0]);
        if (localidentifyCross) {
          this.definitionCrossText = localidentifyCross.text;
        } else {
          this.definitionCrossText = '';
        }
      }
    })

    this.form.get('gradeEcog_value').valueChanges.subscribe(val => {
      var result = this.separateText(val);
      if (result[0] === '') {
        this.definitionEcogText = '';
      } else {
        var localidentifyEcog = this.arrayDefinitionsEcog.find(item => item.id == result[0]);
        if (localidentifyEcog) {
          this.definitionEcogText = localidentifyEcog.text;
        } else {
          this.definitionEcogText = '';
        }
      }
    })
  }

  targeta(e) {
    var localidentify = this.arrayDefinitionsPps.find(item => item.id == e);
    if (localidentify) {
      this.isSelected = e;
      this.ppsObj = localidentify;
      console.log(this.ppsObj.id);
    } else {
      this.isSelected = 200;
      this.ppsObj = null;
    }
  }
  separateText(val) {
    return val.split("/");

  }

  calculate(e, orden?, type?): void {
    var texts = this.separateText(e);
    if (type == 1) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.totalGlasgow = this.num1 + this.num2 + this.num3;

    } else if (type == 3) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.num9 = orden == 9 ? Number(texts[0]) : this.num9;
      this.num10 = orden == 10 ? Number(texts[0]) : this.num10;
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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.num9 = orden == 9 ? Number(texts[0]) : this.num9;
      this.num10 = orden == 10 ? Number(texts[0]) : this.num10;
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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.totalFragility = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalFragility >= 1 && this.totalFragility <= 3) {
        this.classFragility = 'Prefragil';
      } else {
        this.classFragility = 'Fragil';
      }
    } else if (type == 6) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.totalNews = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8;

      if (this.totalNews == 0) {
        this.riskNews = 'Bajo';
        this.response = 'Continuar cuidados de enfermería Signos vitales cada 12 horas';
        this.form.patchValue({
          response: this.response,
          riskNews: this.riskNews,
        });

      } else if (this.totalNews >= 1 && this.totalNews <= 4) {
        this.riskNews = 'Bajo';
        this.response = 'Continuar cuidados de enfermería Signos vitales cada 4-6 horas';
        this.form.patchValue({
          response: this.response,
          riskNews: this.riskNews,
        });

      } else if (this.num1 == 3 || this.num2 == 3 || this.num3 == 3 || this.num4 == 3 || this.num5 == 3 || this.num6 == 3 || this.num7 == 3 || this.num8 == 3) {
        this.riskNews = 'Bajo / Medio';
        this.response = 'Respuesta urgente en piso o sala* Signos vitales cada hora';
        this.form.patchValue({
          response: this.response,
          riskNews: this.riskNews,
        });

      } else if (this.totalNews >= 5 && this.totalNews <= 6) {
        this.riskNews = 'Medio';
        this.response = 'Respuesta urgente en piso o sala* Signos vitales cada hora';
        this.form.patchValue({
          response: this.response,
          riskNews: this.riskNews,
        });

      } else {
        this.riskNews = 'Alto';
        this.response = 'Respuesta emergente** Monitoreo continuo de signos vitales';
                this.form.patchValue({
                  response: this.response,
                  riskNews: this.riskNews,
        });
      }
    } else if (type == 7) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.totalPap = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6;

      if (this.totalPap == 0 || this.totalPap <= 5, 5) {
        this.classPap = 'Probabilidad > 70% de supervivencia a los 30 días';
      } else {
        this.classPap = 'Probabilidad entre 30-70% de supervivencia a los 30 días';
      }
    } else if (type == 8) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.num9 = orden == 9 ? Number(texts[0]) : this.num9;
      this.num10 = orden == 10 ? Number(texts[0]) : this.num10;
      this.num11 = orden == 11 ? Number(texts[0]) : this.num11;
      this.num12 = orden == 12 ? Number(texts[0]) : this.num12;
      this.num13 = orden == 13 ? Number(texts[0]) : this.num13;
      this.num14 = orden == 14 ? Number(texts[0]) : this.num14;
      this.num15 = orden == 15 ? Number(texts[0]) : this.num15;
      this.num16 = orden == 16 ? Number(texts[0]) : this.num16;
      this.num17 = orden == 17 ? Number(texts[0]) : this.num17;
      this.totalHamilton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10 +
        this.num11 + this.num12 + this.num13 + this.num14 + this.num15 + this.num16 + this.num17;


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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;

      if (this.num1 && this.num2 == 1 && this.num3 == 1) {
        this.resultCam = 'Hay Delirium';
      } else if ((this.num1 && this.num2 == 1 && this.num4 == 1)) {
        this.resultCam = 'Hay Delirium';
      } else {
        this.resultCam = 'No hay Delirium';
      }

    } else if (type == 10) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.totalNPedriatic = this.num1 + this.num2 + this.num3 + this.num4;

      if (this.totalNPedriatic > 4 && this.totalNPedriatic <= 5) {
        this.riskNPedriatic = 'Riesgo alto';
        this.classNPedriatic = 'Interconsulta a Nutrición para un diagnóstico completo, asesoría y seguimiento Nutricional Individual.';

      } else if ((this.totalNPedriatic >= 1 && this.totalNPedriatic <= 3)) {
        this.riskNPedriatic = 'Riesgo Medio';
        this.classNPedriatic = 'Considerar la Intervención nutricional, verificar el peso dos veces a la semana y evaluar el riesgo nutricional después de una semana.';
      } else {
        this.riskNPedriatic = 'Riesgo Bajo';
        this.classNPedriatic = 'No es necesaria intervención, verificar peso y evaluar riesgo después de una semana.';
      }

    } else if (type == 11) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num4;
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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num4;
      this.totalPpi = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;

      if (this.totalPpi > 6) {
        this.classPpi = 'Predicción de supervivencia de tres semanas';

      } else if ((this.totalPpi < 4)) {
        this.classPpi = 'Predicción de supervivencia de seis semanas';

      }
    } else if (type == 13) {
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.num9 = orden == 9 ? Number(texts[0]) : this.num9;
      this.num10 = orden == 10 ? Number(texts[0]) : this.num10;

      this.num11 = orden == 11 ? Number(texts[0]) : this.num11;
      this.num12 = orden == 12 ? Number(texts[0]) : this.num12;
      this.num13 = orden == 13 ? Number(texts[0]) : this.num13;
      this.num14 = orden == 14 ? Number(texts[0]) : this.num14;
      this.num15 = orden == 15 ? Number(texts[0]) : this.num15;
      this.num16 = orden == 16 ? Number(texts[0]) : this.num16;
      this.num17 = orden == 17 ? Number(texts[0]) : this.num17;
      this.num18 = orden == 18 ? Number(texts[0]) : this.num18;
      this.num19 = orden == 19 ? Number(texts[0]) : this.num19;
      this.num20 = orden == 20 ? Number(texts[0]) : this.num20;

      this.num21 = orden == 21 ? Number(texts[0]) : this.num21;
      this.num22 = orden == 22 ? Number(texts[0]) : this.num22;
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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.num9 = orden == 9 ? Number(texts[0]) : this.num9;
      this.num10 = orden == 10 ? Number(texts[0]) : this.num10;

      this.totalPfeiffer = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10;

      if (!this.form.controls.studyValue.value) {

        if (this.totalPfeiffer >= 0 && this.totalPfeiffer <= 3) {
          this.classPfeiffer = 'Sin deterioro cognitivo';

        } else if ((this.totalPfeiffer >= 4 && this.totalPfeiffer <= 5)) {
          this.classPfeiffer = 'Deterioro cognitivo leve';

        } else if ((this.totalPfeiffer >= 6 && this.totalPfeiffer <= 8)) {
          this.classPfeiffer = 'Deterioro cognitivo moderado';

        } else if ((this.totalPfeiffer > 8)) {
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
      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;

      this.totalJhDownton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5;


      if (this.totalJhDownton > 3) {
        this.riskJhDownton = 'Riesgo Alto';

      } else if ((this.totalJhDownton == 2 || this.totalJhDownton == 3)) {
        this.riskJhDownton = 'Riesgo Mediano ';

      } else if ((this.totalJhDownton == 0 || this.totalJhDownton == 1)) {
        this.riskJhDownton = 'Deterioro cognitivo moderado';

      }

    } else if (type == 16) {

      // if (this.rangePain == 0) {
      //   this.detailPain = 'Sin dolor';

      // } else if ((this.rangePain >= 1 || this.rangePain <= 3)) {
      //   this.detailPain = 'Suave ';

      // } else if ((this.rangePain >= 4 || this.rangePain <= 6)) {
      //   this.detailPain = 'Dolor moderado';

      // } else if ((this.rangePain >= 7 || this.rangePain <= 10)) {
      //   this.detailPain = 'Dolor intenso';

      // }


      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;
      this.num9 = orden == 9 ? Number(texts[0]) : this.num9;
      this.num10 = orden == 10 ? Number(texts[0]) : this.num10;

      this.totalScreening = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8 + this.num9 + this.num10;


      if (this.totalScreening == 0 || this.totalScreening < 2) {
        this.riskScreening = 'La persona no está en riesgo nutricional.';

      } else if ((this.totalScreening > 3 || this.totalScreening < 5)) {
        this.riskScreening = 'La persona está en riesgo nutricional moderado. Asesore a la persona de cómo puede mejorar su estado nutricional y vuelva a evaluarlo en 3 meses.';

      } else if ((this.totalScreening >= 6)) {
        this.riskScreening = 'La persona está en riesgo nutricional alto. Requiere un examen más exhaustivo de su estado nutricional.';

      }

    } else if (type == 17) {

      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;

      this.totalBraden = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6;


      if (this.totalBraden < 12) {
        this.riskBraden = 'Riesgo Alto.';

      } else if ((this.totalBraden > 13 && this.totalBraden < 15)) {
        this.riskBraden = 'Riesgo Medio';

      } else if ((this.totalBraden > 16 && this.totalBraden < 18)) {
        this.riskBraden = 'Riesgo Bajo';

      } else if ((this.totalBraden > 19)) {
        this.riskBraden = 'Sin Riesgo';

      }

    } else if (type == 18) {

      this.num1 = orden == 1 ? Number(texts[0]) : this.num1;
      this.num2 = orden == 2 ? Number(texts[0]) : this.num2;
      this.num3 = orden == 3 ? Number(texts[0]) : this.num3;
      this.num4 = orden == 4 ? Number(texts[0]) : this.num4;
      this.num5 = orden == 5 ? Number(texts[0]) : this.num5;
      this.num6 = orden == 6 ? Number(texts[0]) : this.num6;
      this.num7 = orden == 7 ? Number(texts[0]) : this.num7;
      this.num8 = orden == 8 ? Number(texts[0]) : this.num8;

      this.totalLawton = this.num1 + this.num2 + this.num3 + this.num4 + this.num5 + this.num6 + this.num7 + this.num8;


      if (this.totalLawton == 0) {
        this.riskLawton = 'Máxima dependencia';

      } else if ((this.totalLawton == 8)) {
        this.riskLawton = 'Independencia total';

      }

    }


  }

  receiveMessage(event) {
    console.log(event.target.checked);
  }

  async save(escale_id) {

    if (escale_id == 1) {
      this.refresh1 = false;
      this.form.controls.physical_value.setValidators(Validators.compose([Validators.required]));
      var physical = this.separateText(this.form.controls.physical_value.value);
      this.form.controls.mind_value.setValidators(Validators.compose([Validators.required]));
      var mind = this.separateText(this.form.controls.mind_value.value);
      this.form.controls.mobility_value.setValidators(Validators.compose([Validators.required]));
      var mobility = this.separateText(this.form.controls.mobility_value.value);
      this.form.controls.activity_value.setValidators(Validators.compose([Validators.required]));
      var activity = this.separateText(this.form.controls.activity_value.value);
      this.form.controls.incontinence_value.setValidators(Validators.compose([Validators.required]));
      var incontinence = this.separateText(this.form.controls.incontinence_value.value);
      // this.form.controls.totalNorton.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.risk_norton.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;
        await this.chScalesS.SaveNorton({
          physical_title: 'Estado Físico General',
          physical_value: physical[0],
          physical_detail: physical[1],
          mind_title: 'Estado Mental',
          mind_value: mind[0],
          mind_detail: mind[1],
          mobility_title: 'Movilidad',
          mobility_value: mobility[0],
          mobility_detail: mobility[1],
          activity_title: 'Actividad',
          activity_value: activity[0],
          activity_detail: activity[1],
          incontinence_title: 'Incontinencia',
          incontinence_value: incontinence[0],
          incontinence_detail: incontinence[1],
          total: this.totalNorton,
          risk: this.risk_norton,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh1 = true;
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ physical_value: '', mind_value: '', mobility_value: '', activity_value: '', incontinence_value: '', totalNorton: '', risk_norton: '' });
          this.form.controls.physical_value.clearValidators();
          this.form.controls.mind_value.clearValidators();
          this.form.controls.mobility_value.clearValidators();
          this.form.controls.activity_value.clearValidators();
          this.form.controls.incontinence_value.clearValidators();
          this.form.controls.physical_value.setErrors(null);
          this.form.controls.mind_value.setErrors(null);
          this.form.controls.mobility_value.setErrors(null);
          this.form.controls.activity_value.setErrors(null);
          this.form.controls.incontinence_value.setErrors(null);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;

        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 2) {
      this.refresh2 = false;
      this.form.controls.ocular_value.setValidators(Validators.compose([Validators.required]));
      var ocular = this.separateText(this.form.controls.ocular_value.value);
      this.form.controls.verbal_value.setValidators(Validators.compose([Validators.required]));
      var verbal = this.separateText(this.form.controls.verbal_value.value);
      this.form.controls.motor_value.setValidators(Validators.compose([Validators.required]));
      var motor = this.separateText(this.form.controls.motor_value.value);
      // this.form.controls.totalGlasgow.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;
        await this.chScalesS.SaveGlasgow({
          motor_title: 'Respuesta Motora',
          motor_value: motor[0],
          motor_detail: motor[1],
          verbal_title: 'Respuesta Verbal',
          verbal_value: verbal[0],
          verbal_detail: verbal[1],
          ocular_title: 'Apertura Ocular',
          ocular_value: ocular[0],
          ocular_detail: ocular[1],
          total: this.totalGlasgow,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh2 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ ocular_value: '', verbal_value: '', motor_value: '', totalGlasgow: '' });
          this.form.controls.ocular_value.clearValidators();
          this.form.controls.verbal_value.clearValidators();
          this.form.controls.motor_value.clearValidators();
          this.form.controls.ocular_value.setErrors(null);
          this.form.controls.verbal_value.setErrors(null);
          this.form.controls.motor_value.setErrors(null);
          if (this.saved) {
            this.saved();
          }

        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 3) {
      this.refresh3 = false;
      this.form.controls.eat_value.setValidators(Validators.compose([Validators.required]));
      var eat = this.separateText(this.form.controls.eat_value.value);
      this.form.controls.move_value.setValidators(Validators.compose([Validators.required]));
      var move = this.separateText(this.form.controls.move_value.value);
      this.form.controls.cleanliness_value.setValidators(Validators.compose([Validators.required]));
      var cleanliness = this.separateText(this.form.controls.cleanliness_value.value);
      this.form.controls.toilet_value.setValidators(Validators.compose([Validators.required]));
      var toilet = this.separateText(this.form.controls.toilet_value.value);
      this.form.controls.shower_value.setValidators(Validators.compose([Validators.required]));
      var shower = this.separateText(this.form.controls.shower_value.value);
      this.form.controls.commute_value.setValidators(Validators.compose([Validators.required]));
      var commute = this.separateText(this.form.controls.commute_value.value);
      this.form.controls.stairs_value.setValidators(Validators.compose([Validators.required]));
      var stairs = this.separateText(this.form.controls.stairs_value.value);
      this.form.controls.dress_value.setValidators(Validators.compose([Validators.required]));
      var dress = this.separateText(this.form.controls.dress_value.value);
      this.form.controls.fecal_value.setValidators(Validators.compose([Validators.required]));
      var fecal = this.separateText(this.form.controls.fecal_value.value);
      this.form.controls.urine_value.setValidators(Validators.compose([Validators.required]));
      var urine = this.separateText(this.form.controls.urine_value.value);
      // this.form.controls.totalBarthel.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classBarthel.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveBarthel({
          eat_title: 'Comer',
          eat_value: eat[0],
          eat_detail: eat[1],
          move_title: 'Trasladarse entre la silla y la cama',
          move_value: move[0],
          move_detail: move[1],
          cleanliness_title: 'Aseo personal',
          cleanliness_value: cleanliness[0],
          cleanliness_detail: cleanliness[1],
          toilet_title: 'Uso del retrete',
          toilet_value: toilet[0],
          toilet_detail: toilet[1],
          shower_title: 'Bañarse o Ducharse',
          shower_value: shower[0],
          shower_detail: shower[1],
          commute_title: 'Desplazarse',
          commute_value: commute[0],
          commute_detail: commute[1],
          stairs_title: 'Subir y bajar escaleras',
          stairs_value: stairs[0],
          stairs_detail: stairs[1],
          dress_title: 'Vestirse y desvestirse',
          dress_value: dress[0],
          dress_detail: dress[1],
          fecal_title: 'Control de heces',
          fecal_value: fecal[0],
          fecal_detail: fecal[1],
          urine_title: 'Control de orina',
          urine_value: urine[0],
          urine_detail: urine[1],
          score: this.totalBarthel,
          classification: this.classBarthel,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh3 = true;
          // var results = x.data.ch_scale_payette;
          this.toastService.success('', x.message);
          this.form.patchValue({ eat_value: '', move_value: '', cleanliness_value: '', toilet_value: '', shower_value: '', commute_value: '', stairs_value: '', dress_value: '', fecal_value: '', urine_value: '', totalBarthel: '', classBarthel: '' });
          this.form.controls.eat_value.clearValidators();
          this.form.controls.move_value.clearValidators();
          this.form.controls.cleanliness_value.clearValidators();
          this.form.controls.toilet_value.clearValidators();
          this.form.controls.shower_value.clearValidators();
          this.form.controls.commute_value.clearValidators();
          this.form.controls.stairs_value.clearValidators();
          this.form.controls.dress_value.clearValidators();
          this.form.controls.fecal_value.clearValidators();
          this.form.controls.urine_value.clearValidators();
          this.form.controls.eat_value.setErrors(null);
          this.form.controls.move_value.setErrors(null);
          this.form.controls.cleanliness_value.setErrors(null);
          this.form.controls.toilet_value.setErrors(null);
          this.form.controls.shower_value.setErrors(null);
          this.form.controls.commute_value.setErrors(null);
          this.form.controls.stairs_value.setErrors(null);
          this.form.controls.dress_value.setErrors(null);
          this.form.controls.fecal_value.setErrors(null);
          this.form.controls.urine_value.setErrors(null);

          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 4) {
      this.refresh4 = false;
      this.form.controls.qOnePayette_value.setValidators(Validators.compose([Validators.required]));
      var qOnePayette = this.separateText(this.form.controls.qOnePayette_value.value);
      this.form.controls.qTwoPayette_value.setValidators(Validators.compose([Validators.required]));
      var qTwoPayette = this.separateText(this.form.controls.qTwoPayette_value.value);
      this.form.controls.qThreePayette_value.setValidators(Validators.compose([Validators.required]));
      var qThreePayette = this.separateText(this.form.controls.qThreePayette_value.value);
      this.form.controls.qFourPayette_value.setValidators(Validators.compose([Validators.required]));
      var qFourPayette = this.separateText(this.form.controls.qFourPayette_value.value);
      this.form.controls.qFivePayette_value.setValidators(Validators.compose([Validators.required]));
      var qFivePayette = this.separateText(this.form.controls.qFivePayette_value.value);
      this.form.controls.qSixPayette_value.setValidators(Validators.compose([Validators.required]));
      var qSixPayette = this.separateText(this.form.controls.qSixPayette_value.value);
      this.form.controls.qSevenPayette_value.setValidators(Validators.compose([Validators.required]));
      var qSevenPayette = this.separateText(this.form.controls.qSevenPayette_value.value);
      this.form.controls.qEightPayette_value.setValidators(Validators.compose([Validators.required]));
      var qEightPayette = this.separateText(this.form.controls.qEightPayette_value.value);
      this.form.controls.qNinePayette_value.setValidators(Validators.compose([Validators.required]));
      var qNinePayette = this.separateText(this.form.controls.qNinePayette_value.value);
      this.form.controls.qTenPayette_value.setValidators(Validators.compose([Validators.required]));
      var qTenPayette = this.separateText(this.form.controls.qTenPayette_value.value);
      // this.form.controls.totalPayette.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.riskPayette.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.recommendations.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePayette({
          q_one_title: '¿La persona es muy delgada?',
          q_one_value: qOnePayette[0],
          q_one_detail: qOnePayette[1],
          q_two_title: '¿La persona ha perdido peso en el curso del último año?',
          q_two_value: qTwoPayette[0],
          q_two_detail: qTwoPayette[1],
          q_three_title: '¿La persona sufre de artritis con repercusión en su funcionalidad global?',
          q_three_value: qThreePayette[0],
          q_three_detail: qThreePayette[1],
          q_four_title: '¿La persona incluso con anteojos, su visión es?',
          q_four_value: qFourPayette[0],
          q_four_detail: qFourPayette[1],
          q_five_title: '¿La persona tiene buen apetito?',
          q_five_value: qFivePayette[0],
          q_five_detail: qFivePayette[1],
          q_six_title: '¿La persona ha vivido recientemente algún acontecimiento que le ha afectado profundamente(enfermedad personal, pérdida de un familiar)?',
          q_six_value: qSixPayette[0],
          q_six_detail: qSixPayette[1],
          q_seven_title: '¿La persona come habitualmente fruta o jugo de frutas?',
          q_seven_value: qSevenPayette[0],
          q_seven_detail: qSevenPayette[1],
          q_eight_title: '¿La persona come habitualmente huevos, queso, mantequilla o aceite vegetal?',
          q_eight_value: qEightPayette[0],
          q_eight_detail: qEightPayette[1],
          q_nine_title: '¿La persona come habitualmente tortilla, pan o cereal?',
          q_nine_value: qNinePayette[0],
          q_nine_detail: qNinePayette[1],
          q_ten_title: '¿La persona come habitualmente leche (1 vaso o más de 1/4 de taza en el café?',
          q_ten_value: qTenPayette[0],
          q_ten_detail: qTenPayette[1],
          classification: this.totalPayette,
          risk: this.riskPayette,
          recommendations: this.recommendations,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh1 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ qOnePayette_value: '', qTwoPayette_value: '', qThreePayette_value: '', qFourPayette_value: '', qFivePayette_value: '', qSixPayette_value: '', qSevenPayette_value: '', qEightPayette_value: '', qNinePayette_value: '', qTenPayette_value: '', totalPayette: '', riskPayette: '', recommendations: '', });
          this.form.controls.qOnePayette_value.clearValidators();
          this.form.controls.qTwoPayette_value.clearValidators();
          this.form.controls.qThreePayette_value.clearValidators();
          this.form.controls.qFourPayette_value.clearValidators();
          this.form.controls.qFivePayette_value.clearValidators();
          this.form.controls.qSixPayette_value.clearValidators();
          this.form.controls.qSevenPayette_value.clearValidators();
          this.form.controls.qEightPayette_value.clearValidators();
          this.form.controls.qNinePayette_value.clearValidators();
          this.form.controls.qTenPayette_value.clearValidators();

          this.form.controls.qTwoPayette_value.setErrors(null);
          this.form.controls.qOnePayette_value.setErrors(null);
          this.form.controls.qThreePayette_value.setErrors(null);
          this.form.controls.qFourPayette_value.setErrors(null);
          this.form.controls.qFivePayette_value.setErrors(null);
          this.form.controls.qSixPayette_value.setErrors(null);
          this.form.controls.qSevenPayette_value.setErrors(null);
          this.form.controls.qEightPayette_value.setErrors(null);
          this.form.controls.qNinePayette_value.setErrors(null);
          this.form.controls.qTenPayette_value.setErrors(null);

          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
    }

    if (escale_id == 5) {
      this.refresh5 = false;
      this.form.controls.qOneFragility_value.setValidators(Validators.compose([Validators.required]));
      var qOneFragilitty = this.separateText(this.form.controls.qOneFragility_value.value);
      this.form.controls.qTwoFragility_value.setValidators(Validators.compose([Validators.required]));
      var qTwoFragilitty = this.separateText(this.form.controls.qTwoFragility_value.value);
      this.form.controls.qThreeFragility_value.setValidators(Validators.compose([Validators.required]));
      var qThreeFragilitty = this.separateText(this.form.controls.qThreeFragility_value.value);
      this.form.controls.qFourFragility_value.setValidators(Validators.compose([Validators.required]));
      var qFourFragilitty = this.separateText(this.form.controls.qFourFragility_value.value);
      this.form.controls.qFiveFragility_value.setValidators(Validators.compose([Validators.required]));
      var qFiveFragilitty = this.separateText(this.form.controls.qFiveFragility_value.value);
      this.form.controls.qSixFragility_value.setValidators(Validators.compose([Validators.required]));
      var qSixFragilitty = this.separateText(this.form.controls.qSixFragility_value.value);
      // this.form.controls.totalFragility.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classFragility.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveFragility({
          q_one_title: '¿Está cansado?',
          q_one_value: qOneFragilitty[0],
          q_one_detail: qOneFragilitty[1],
          q_two_title: '¿Es incapaz de subir un piso de escaleras?',
          q_two_value: qTwoFragilitty[0],
          q_two_detail: qTwoFragilitty[1],
          q_three_title: '¿Es incapaz de caminar una manzana?',
          q_three_value: qThreeFragilitty[0],
          q_three_detail: qThreeFragilitty[1],
          q_four_title: '¿Tiene más de 5 enfermedades?',
          q_four_value: qFourFragilitty[0],
          q_four_detail: qFourFragilitty[1],
          q_five_title: '¿La persona ha vivido recientemente algún acontecimiento que le ha afectado profundamente(enfermedad personal, pérdida de un familiar)?',
          q_five_value: qFiveFragilitty[0],
          q_five_detail: qFiveFragilitty[1],
          q_six_title: '¿Ha perdido más del 5% de su peso en los últimos 6 meses?',
          q_six_value: qSixFragilitty[0],
          q_six_detail: qSixFragilitty[1],
          total: this.totalFragility,
          classification: this.classFragility,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh5 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ qOneFragility_value: '', qTwoFragility_value: '', qThreeFragility_value: '', qFourFragility_value: '', qFiveFragility_value: '', qSixFragility_value: '', totalFragility: '', classFragility: '' });
          this.form.controls.qOneFragility_value.clearValidators();
          this.form.controls.qTwoFragility_value.clearValidators();
          this.form.controls.qThreeFragility_value.clearValidators();
          this.form.controls.qFourFragility_value.clearValidators();
          this.form.controls.qFiveFragility_value.clearValidators();
          this.form.controls.qSixFragility_value.clearValidators();

          this.form.controls.qOneFragility_value.setErrors(null);
          this.form.controls.qTwoFragility_value.setErrors(null);
          this.form.controls.qThreeFragility_value.setErrors(null);
          this.form.controls.qFourFragility_value.setErrors(null);
          this.form.controls.qFiveFragility_value.setErrors(null);
          this.form.controls.qSixFragility_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }
      else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 7) {
      this.refresh7 = false;
      this.form.controls.pOneNews_value.setValidators(Validators.compose([Validators.required]));
      var pOneNews = this.separateText(this.form.controls.pOneNews_value.value);
      this.form.controls.pTwoNews_value.setValidators(Validators.compose([Validators.required]));
      var pTwoNews = this.separateText(this.form.controls.pTwoNews_value.value);
      this.form.controls.pThreeNews_value.setValidators(Validators.compose([Validators.required]));
      var pThreeNews = this.separateText(this.form.controls.pThreeNews_value.value);
      this.form.controls.pFourNews_value.setValidators(Validators.compose([Validators.required]));
      var pFourNews = this.separateText(this.form.controls.pFourNews_value.value);
      this.form.controls.pFiveNews_value.setValidators(Validators.compose([Validators.required]));
      var pFiveNews = this.separateText(this.form.controls.pFiveNews_value.value);
      this.form.controls.pSixNews_value.setValidators(Validators.compose([Validators.required]));
      var pSixNews = this.separateText(this.form.controls.pSixNews_value.value);
      this.form.controls.pSevenNews_value.setValidators(Validators.compose([Validators.required]));
      var pSevenNews = this.separateText(this.form.controls.pSevenNews_value.value);
      this.form.controls.pEightNews_value.setValidators(Validators.compose([Validators.required]));
      var pEightNews = this.separateText(this.form.controls.pEightNews_value.value);
      // this.form.controls.totalNews.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.riskNews.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.response.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveNews({
          p_one_title: 'Frecuencia respiratoria',
          p_one_value: pOneNews[0],
          p_one_detail: pOneNews[1],
          p_two_title: 'Saturación de oxígeno (SpO2)',
          p_two_value: pTwoNews[0],
          p_two_detail: pTwoNews[1],
          p_three_title: 'SpO2 en caso de EPOC',
          p_three_value: pThreeNews[0],
          p_three_detail: pThreeNews[1],
          p_four_title: 'Frecuencia cardiaca',
          p_four_value: pFourNews[0],
          p_four_detail: pFourNews[1],
          p_five_title: '¿Oxígeno suplementario?',
          p_five_value: pFiveNews[0],
          p_five_detail: pFiveNews[1],
          p_six_title: 'Tensión arterial sistólica',
          p_six_value: pSixNews[0],
          p_six_detail: pSixNews[1],
          p_seven_title: 'Nivel de consciencia',
          p_seven_value: pSevenNews[0],
          p_seven_detail: pSevenNews[1],
          p_eight_title: 'Temperatura',
          p_eight_value: pEightNews[0],
          p_eight_detail: pEightNews[1],
          qualification: this.totalNews,
          risk: this.riskNews,
          response: this.response,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh7 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ pOneNews_value: '', pTwoNews_value: '', pThreeNews_value: '', pFourNews_value: '', pFiveNews_value: '', pSixNews_value: '', pSevenNews_value: '', pEightNews_value: '', totalNews: '', riskNews: '', response: '', });
          this.form.controls.pOneNews_value.clearValidators();
          this.form.controls.pTwoNews_value.clearValidators();
          this.form.controls.pThreeNews_value.clearValidators();
          this.form.controls.pFourNews_value.clearValidators();
          this.form.controls.pFiveNews_value.clearValidators();
          this.form.controls.pSixNews_value.clearValidators();
          this.form.controls.pSevenNews_value.clearValidators();
          this.form.controls.pEightNews_value.clearValidators();

          this.form.controls.pTwoNews_value.setErrors(null);
          this.form.controls.pOneNews_value.setErrors(null);
          this.form.controls.pThreeNews_value.setErrors(null);
          this.form.controls.pFourNews_value.setErrors(null);
          this.form.controls.pFiveNews_value.setErrors(null);
          this.form.controls.pSixNews_value.setErrors(null);
          this.form.controls.pSevenNews_value.setErrors(null);
          this.form.controls.pEightNews_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 8) {
      this.refresh8 = false;
      this.form.controls.vOnePap_value.setValidators(Validators.compose([Validators.required]));
      var vOnePap = this.separateText(this.form.controls.vOnePap_value.value);
      this.form.controls.vTwoPap_value.setValidators(Validators.compose([Validators.required]));
      var vTwoPap = this.separateText(this.form.controls.vTwoPap_value.value);
      this.form.controls.vThreePap_value.setValidators(Validators.compose([Validators.required]));
      var vThreePap = this.separateText(this.form.controls.vThreePap_value.value);
      this.form.controls.vFourPap_value.setValidators(Validators.compose([Validators.required]));
      var vFourPap = this.separateText(this.form.controls.vFourPap_value.value);
      this.form.controls.vFivePap_value.setValidators(Validators.compose([Validators.required]));
      var vFivePap = this.separateText(this.form.controls.vFivePap_value.value);
      this.form.controls.vSixPap_value.setValidators(Validators.compose([Validators.required]));
      var vSixPap = this.separateText(this.form.controls.vSixPap_value.value);
      // this.form.controls.totalPap.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classPap.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePap({
          v_one_title: 'Disnea',
          v_one_value: vOnePap[0],
          v_one_detail: vOnePap[1],
          v_two_title: 'Anorexia',
          v_two_value: vTwoPap[0],
          v_two_detail: vTwoPap[1],
          v_three_title: 'stimación Clínica de Supervivencia (Semanas)',
          v_three_value: vThreePap[0],
          v_three_detail: vThreePap[1],
          v_four_title: 'Leucocitos',
          v_four_value: vFourPap[0],
          v_four_detail: vFourPap[1],
          v_five_title: 'Índice de Karnofsky',
          v_five_value: vFivePap[0],
          v_five_detail: vFivePap[1],
          v_six_title: 'Porcentaje de Linfocitos',
          v_six_value: vSixPap[0],
          v_six_detail: vSixPap[1],
          total: this.totalPap,
          classification: this.classPap,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh8 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ vOnePap_value: '', vTwoPap_value: '', vThreePap_value: '', vFourPap_value: '', vFivePap_value: '', vSixPap_value: '', totalPap: '', classPap: '' });
          this.form.controls.vOnePap_value.clearValidators();
          this.form.controls.vTwoPap_value.clearValidators();
          this.form.controls.vThreePap_value.clearValidators();
          this.form.controls.vFourPap_value.clearValidators();
          this.form.controls.vFivePap_value.clearValidators();
          this.form.controls.vSixPap_value.clearValidators();

          this.form.controls.vOnePap_value.setErrors(null);
          this.form.controls.vTwoPap_value.setErrors(null);
          this.form.controls.vThreePap_value.setErrors(null);
          this.form.controls.vFourPap_value.setErrors(null);
          this.form.controls.vFivePap_value.setErrors(null);
          this.form.controls.vSixPap_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 9) {
      this.refresh9 = false;
      this.form.controls.vOneHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vOneHamilton = this.separateText(this.form.controls.vOneHamilton_value.value);
      this.form.controls.vTwoHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vTwoHamilton = this.separateText(this.form.controls.vTwoHamilton_value.value);
      this.form.controls.vThreeHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vThreeHamilton = this.separateText(this.form.controls.vThreeHamilton_value.value);
      this.form.controls.vFourHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vFourHamilton = this.separateText(this.form.controls.vFourHamilton_value.value);
      this.form.controls.vFiveHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vFiveHamilton = this.separateText(this.form.controls.vFiveHamilton_value.value);
      this.form.controls.vSixHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vSixHamilton = this.separateText(this.form.controls.vSixHamilton_value.value);
      this.form.controls.vSevenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vSevenHamilton = this.separateText(this.form.controls.vSevenHamilton_value.value);
      this.form.controls.vEightHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vEightHamilton = this.separateText(this.form.controls.vEightHamilton_value.value);
      this.form.controls.vNineHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vNineHamilton = this.separateText(this.form.controls.vNineHamilton_value.value);
      this.form.controls.vTenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vTenHamilton = this.separateText(this.form.controls.vTenHamilton_value.value);
      this.form.controls.vElevenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vElevenHamilton = this.separateText(this.form.controls.vElevenHamilton_value.value);
      this.form.controls.vTwelveHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vTwelveHamilton = this.separateText(this.form.controls.vTwelveHamilton_value.value);
      this.form.controls.vThirteenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vThirteenHamilton = this.separateText(this.form.controls.vThirteenHamilton_value.value);
      this.form.controls.vFourteenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vFourteenHamilton = this.separateText(this.form.controls.vFourteenHamilton_value.value);
      this.form.controls.vFifteenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vFifteenHamilton = this.separateText(this.form.controls.vFifteenHamilton_value.value);
      this.form.controls.vSixteenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vSixteenHamilton = this.separateText(this.form.controls.vSixteenHamilton_value.value);
      this.form.controls.vSeventeenHamilton_value.setValidators(Validators.compose([Validators.required]));
      var vSeventeenHamilton = this.separateText(this.form.controls.vSeventeenHamilton_value.value);
      // this.form.controls.totalHamilton.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classHamilton.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveHamilton({
          v_one_title: 'Humor depresivo (tristeza, desesperanza, desamparo, sentimiento de inutilidad)',
          v_one_value: vOneHamilton[0],
          v_one_detail: vOneHamilton[1],
          v_two_title: 'Sentimientos de culpa',
          v_two_value: vTwoHamilton[0],
          v_two_detail: vTwoHamilton[1],
          v_three_title: 'Suicidio',
          v_three_value: vThreeHamilton[0],
          v_three_detail: vThreeHamilton[1],
          v_four_title: 'Insomnio precoz',
          v_four_value: vFourHamilton[0],
          v_four_detail: vFourHamilton[1],
          v_five_title: 'Insomnio intermedio',
          v_five_value: vFiveHamilton[0],
          v_five_detail: vFiveHamilton[1],
          v_six_title: 'Insomnio tardío',
          v_six_value: vSixHamilton[0],
          v_six_detail: vSixHamilton[1],
          v_seven_title: 'Trabajo y actividades',
          v_seven_value: vSevenHamilton[0],
          v_seven_detail: vSevenHamilton[1],
          v_eight_title: 'Inhibición psicomotora lentitud de pensamiento y lenguaje, facultad de concentración disminuida, disminución de la actividad motora)',
          v_eight_value: vEightHamilton[0],
          v_eight_detail: vEightHamilton[1],
          v_nine_title: 'Agitación psicomotora',
          v_nine_value: vNineHamilton[0],
          v_nine_detail: vNineHamilton[1],
          v_ten_title: 'Ansiedad',
          v_ten_value: vTenHamilton[0],
          v_ten_detail: vTenHamilton[1],
          v_eleven_title: 'Ansiedad somática (signos físicos de ansiedad: gastrointestinales: sequedad de boca, diarrea, eructos, indigestión, etc; cardiovasculares: palpitaciones, cefaleas; respiratorios: hiperventilación, suspiros; frecuencia de micción incrementada; transpiración)',
          v_eleven_value: vElevenHamilton[0],
          v_eleven_detail: vElevenHamilton[1],
          v_twelve_title: 'Síntomas somáticos gastrointestinales',
          v_twelve_value: vTwelveHamilton[0],
          v_twelve_detail: vTwelveHamilton[1],
          v_thirteen_title: 'Síntomas somáticos generales',
          v_thirteen_value: vThirteenHamilton[0],
          v_thirteen_detail: vThirteenHamilton[1],
          v_fourteen_title: 'Síntomas genitales (tales como: disminución de la libido y trastornos menstruales)',
          v_fourteen_value: vFourteenHamilton[0],
          v_fourteen_detail: vFourteenHamilton[1],
          v_fifteen_title: 'Hipocondría',
          v_fifteen_value: vFifteenHamilton[0],
          v_fifteen_detail: vFifteenHamilton[1],
          v_sixteen_title: 'Pérdida de peso',
          v_sixteen_value: vSixteenHamilton[0],
          v_sixteen_detail: vSixteenHamilton[1],
          v_seventeen_value: 'Introspeccción',
          v_seventeen_title: vSeventeenHamilton[0],
          v_seventeen_detail: vSeventeenHamilton[1],
          total: this.totalHamilton,
          qualification: this.classHamilton,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh9 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({
            vOneHamilton_value: '', vTwoHamilton_value: '', vThreeHamilton_value: '', vFourHamilton_value: '', vFiveHamilton_value: '', vSixHamilton_value: '', vSevenHamilton_value: '',
            vEightHamilton_value: '', vNineHamilton_value: '', vTenHamilton_value: '', vElevenHamilton_value: '', vTwelveHamilton_value: '', vThirteenHamilton_value: '', vFourteenHamilton_value: '',
            vFifteenHamilton_value: '', vSixteenHamilton_value: '', vSeventeenHamilton_value: '', totalHamilton: '', classHamilton: ''
          });
          this.form.controls.vOneHamilton_value.clearValidators();
          this.form.controls.vTwoHamilton_value.clearValidators();
          this.form.controls.vThreeHamilton_value.clearValidators();
          this.form.controls.vFourHamilton_value.clearValidators();
          this.form.controls.vFiveHamilton_value.clearValidators();
          this.form.controls.vSixHamilton_value.clearValidators();
          this.form.controls.vSevenHamilton_value.clearValidators();
          this.form.controls.vEightHamilton_value.clearValidators();
          this.form.controls.vNineHamilton_value.clearValidators();
          this.form.controls.vTenHamilton_value.clearValidators();
          this.form.controls.vElevenHamilton_value.clearValidators();
          this.form.controls.vTwelveHamilton_value.clearValidators();
          this.form.controls.vThirteenHamilton_value.clearValidators();
          this.form.controls.vFourteenHamilton_value.clearValidators();
          this.form.controls.vFifteenHamilton_value.clearValidators();
          this.form.controls.vSixteenHamilton_value.clearValidators();
          this.form.controls.vSeventeenHamilton_value.clearValidators();

          this.form.controls.vOneHamilton_value.setErrors(null);
          this.form.controls.vTwoHamilton_value.setErrors(null);
          this.form.controls.vThreeHamilton_value.setErrors(null);
          this.form.controls.vFourHamilton_value.setErrors(null);
          this.form.controls.vFiveHamilton_value.setErrors(null);
          this.form.controls.vSixHamilton_value.setErrors(null);
          this.form.controls.vSevenHamilton_value.setErrors(null);
          this.form.controls.vEightHamilton_value.setErrors(null);
          this.form.controls.vNineHamilton_value.setErrors(null);
          this.form.controls.vTenHamilton_value.setErrors(null);
          this.form.controls.vElevenHamilton_value.setErrors(null);
          this.form.controls.vTwelveHamilton_value.setErrors(null);
          this.form.controls.vThirteenHamilton_value.setErrors(null);
          this.form.controls.vFourteenHamilton_value.setErrors(null);
          this.form.controls.vFifteenHamilton_value.setErrors(null);
          this.form.controls.vSixteenHamilton_value.setErrors(null);
          this.form.controls.vSeventeenHamilton_value.setErrors(null);
          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 10) {
      this.refresh10 = false;
      this.form.controls.mindCam_value.setValidators(Validators.compose([Validators.required]));
      var mindCam = this.separateText(this.form.controls.mindCam_value.value);
      this.form.controls.attentionCam_value.setValidators(Validators.compose([Validators.required]));
      var attentionCam = this.separateText(this.form.controls.attentionCam_value.value);
      this.form.controls.thoughtCam_value.setValidators(Validators.compose([Validators.required]));
      var thoughtCam = this.separateText(this.form.controls.thoughtCam_value.value);
      this.form.controls.awarenessCam_value.setValidators(Validators.compose([Validators.required]));
      var awarenessCam = this.separateText(this.form.controls.awarenessCam_value.value);
      this.form.controls.resultCam.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveCam({
          mind_title: 'Comienzo agudo y curso fluctuante: ¿Ha observado un cambio agudo en el estado mental del paciente? ¿Ha observado un cambio agudo en el estado mental del paciente?',
          mind_value: mindCam[0],
          mind_detail: mindCam[1],
          attention_title: 'Alteración de la atención: ¿El paciente se distrae con facilidad o tiene dificultad para seguir una conversación?',
          attention_value: attentionCam[0],
          attention_detail: attentionCam[1],
          thought_title: 'Pensamiento desorganizado: ¿El paciente manifiesta ideas o conversaciones incoherentes o confunde a las personas?',
          thought_value: thoughtCam[0],
          thought_detail: thoughtCam[1],
          awareness_title: 'Alteración del nivel de conciencia: ¿Está alterado el nivel de conciencia del paciente (Vigilante, Letárgico, Estuporoso)?',
          awareness_value: awarenessCam[0],
          awareness_detail: awarenessCam[1],
          result: this.resultCam,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh10 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ mindCam_value: '', attentionCam_value: '', thoughtCam_value: '', awarenessCam_value: '', resultCam: '' });
          this.form.controls.mindCam_value.clearValidators();
          this.form.controls.attentionCam_value.clearValidators();
          this.form.controls.thoughtCam_value.clearValidators();
          this.form.controls.awarenessCam_value.clearValidators();
          this.form.controls.resultCam.clearValidators();

          this.form.controls.mindCam_value.setErrors(null);
          this.form.controls.attentionCam_value.setErrors(null);
          this.form.controls.thoughtCam_value.setErrors(null);
          this.form.controls.awarenessCam_value.setErrors(null);
          this.form.controls.resultCam.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 11) {
      this.refresh11 = false;
      this.form.controls.level_value.setValidators(Validators.compose([Validators.required]));
      var level = this.separateText(this.form.controls.level_value.value);
      this.form.controls.definitionFacText.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveFac({
          level_title: level[1],
          level_value: level[0],
          definition: this.definitionFacText,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh11 = false;
          this.toastService.success('', x.message);
          this.form.patchValue({ level_value: '', definitionFacText: '' });
          this.form.controls.level_value.clearValidators();
          this.form.controls.definitionFacText.clearValidators();

          this.form.controls.level_value.setErrors(null);
          this.form.controls.definitionFacText.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 12) {
      this.refresh12 = false;
      this.form.controls.grade_value.setValidators(Validators.compose([Validators.required]));
      var grade = this.separateText(this.form.controls.grade_value.value);
      //this.form.controls.definitionCrossText.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveRedCross({
          grade_title: grade[1],
          grade_value: grade[0],
          definition: this.definitionCrossText,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh12 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ grade_value: '', definitionCrossText: '' });
          this.form.controls.grade_value.clearValidators();
          this.form.controls.grade_value.setErrors(null);


          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 13) {
      this.refresh13 = false;
      this.form.controls.scoreKarnofsky_value.setValidators(Validators.compose([Validators.required]));
      var scoreKarnofsky = this.separateText(this.form.controls.scoreKarnofsky_value.value);
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveKarnofsky({
          score_title: scoreKarnofsky[1],
          score_value: scoreKarnofsky[0],
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh13 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ scoreKarnofsky_value: '', });
          this.form.controls.scoreKarnofsky_value.clearValidators();
          this.form.controls.scoreKarnofsky_value.setErrors(null);


          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 14) {
      this.refresh14 = false;
      this.form.controls.gradeEcog_value.setValidators(Validators.compose([Validators.required]));
      var gradeEcog = this.separateText(this.form.controls.gradeEcog_value.value);
      //this.form.controls.definitionEcogText.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveEcog({
          grade_title: gradeEcog[1],
          grade_value: gradeEcog[0],
          definition: this.definitionEcogText,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh14 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ gradeEcog_value: '', definitionEcogText: '', });
          this.form.controls.gradeEcog_value.clearValidators();
          this.form.controls.gradeEcog_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 15) {
      this.refresh15 = false;
      this.form.controls.score_one_value.setValidators(Validators.compose([Validators.required]));
      var score_one = this.separateText(this.form.controls.score_one_value.value);
      this.form.controls.score_two_value.setValidators(Validators.compose([Validators.required]));
      var score_two = this.separateText(this.form.controls.score_two_value.value);
      this.form.controls.score_three_value.setValidators(Validators.compose([Validators.required]));
      var score_three = this.separateText(this.form.controls.score_three_value.value);
      this.form.controls.score_four_value.setValidators(Validators.compose([Validators.required]));
      var score_four = this.separateText(this.form.controls.score_four_value.value);
      // this.form.controls.totalNPedriatic.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.riskNPedriatic.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classNPedriatic.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePNutrition({
          score_one_title: 'Existe alguna enfermedad subyacente con riesgo de malnutrición?',
          score_one_value: score_one[0],
          score_one_detail: score_one[1],
          score_two_title: 'Está presente alguna de las siguientes situaciones?',
          score_two_value: score_two[0],
          score_two_detail: score_two[1],
          score_three_title: 'Ha presentado pérdida de peso o ningún aumento de peso (lactantes menos de 1 año) en las últimas semanas/meses?',
          score_three_value: score_three[0],
          score_three_detail: score_three[1],
          score_four_title: 'El Paciente tiene pobre estado nutricional según la evaluación clínica subjetiva (disminución de la grasa subcutánea y-o la masa muscular y-o por su rostro demacrado)?',
          score_four_value: score_four[0],
          score_four_detail: score_four[1],
          total: this.totalNPedriatic,
          risk: this.riskNPedriatic,
          classification: this.classNPedriatic,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh15 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ score_one: '', score_two: '', score_three: '', score_four: '', total: '', risk: '', classification: '', });
          this.form.controls.score_one_value.clearValidators();
          this.form.controls.score_two_value.clearValidators();
          this.form.controls.score_three_value.clearValidators();
          this.form.controls.score_four_value.clearValidators();

          this.form.controls.score_one_value.setErrors(null);
          this.form.controls.score_two_value.setErrors(null);
          this.form.controls.score_three_value.setErrors(null);
          this.form.controls.score_four_value.setErrors(null);
          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 16) {
      this.refresh16 = false;
      this.form.controls.pain_value.setValidators(Validators.compose([Validators.required]));
      var pain = this.separateText(this.form.controls.pain_value.value);
      this.form.controls.tiredness_value.setValidators(Validators.compose([Validators.required]));
      var tiredness = this.separateText(this.form.controls.tiredness_value.value);
      this.form.controls.retching_value.setValidators(Validators.compose([Validators.required]));
      var retching = this.separateText(this.form.controls.retching_value.value);
      this.form.controls.depression_value.setValidators(Validators.compose([Validators.required]));
      var depression = this.separateText(this.form.controls.depression_value.value);
      this.form.controls.anxiety_value.setValidators(Validators.compose([Validators.required]));
      var anxiety = this.separateText(this.form.controls.anxiety_value.value);
      this.form.controls.drowsiness_value.setValidators(Validators.compose([Validators.required]));
      var drowsiness = this.separateText(this.form.controls.drowsiness_value.value);
      this.form.controls.appetite_value.setValidators(Validators.compose([Validators.required]));
      var appetite = this.separateText(this.form.controls.appetite_value.value);
      this.form.controls.welfare_value.setValidators(Validators.compose([Validators.required]));
      var welfare = this.separateText(this.form.controls.welfare_value.value);
      this.form.controls.breathing_value.setValidators(Validators.compose([Validators.required]));
      var breathing = this.separateText(this.form.controls.breathing_value.value);
      this.form.controls.sleep_value.setValidators(Validators.compose([Validators.required]));
      var sleep = this.separateText(this.form.controls.sleep_value.value);
      this.form.controls.obsEsas.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveEsas({
          pain_title: pain[1],
          pain_value: pain[0],
          tiredness_title: tiredness[1],
          tiredness_value: tiredness[0],
          retching_title: retching[1],
          retching_value: retching[0],
          depression_title: depression[1],
          depression_value: depression[0],
          anxiety_title: anxiety[1],
          anxiety_value: anxiety[0],
          drowsiness_title: drowsiness[1],
          drowsiness_value: drowsiness[0],
          appetite_title: appetite[1],
          appetite_value: appetite[0],
          breathing_title: breathing[1],
          breathing_value: breathing[0],
          welfare_title: welfare[1],
          welfare_value: welfare[0],
          sleep_title: sleep[1],
          sleep_value: sleep[0],
          observation: this.form.controls.obsEsas.value,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh16 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ pain_value: '', tiredness_value: '', retching_value: '', depression_value: '', anxiety_value: '', drowsiness_value: '', appetite_value: '', welfare_value: '', breathing_value: '', sleep_value: '', obsEsas: '' });

          this.form.controls.pain_value.clearValidators();
          this.form.controls.tiredness_value.clearValidators();
          this.form.controls.retching_value.clearValidators();
          this.form.controls.depression_value.clearValidators();
          this.form.controls.anxiety_value.clearValidators();
          this.form.controls.drowsiness_value.clearValidators();
          this.form.controls.appetite_value.clearValidators();
          this.form.controls.welfare_value.clearValidators();
          this.form.controls.breathing_value.clearValidators();
          this.form.controls.sleep_value.clearValidators();
          this.form.controls.obsEsas.clearValidators();

          this.form.controls.pain_value.setErrors(null);
          this.form.controls.tiredness_value.setErrors(null);
          this.form.controls.retching_value.setErrors(null);
          this.form.controls.depression_value.setErrors(null);
          this.form.controls.anxiety_value.setErrors(null);
          this.form.controls.drowsiness_value.setErrors(null);
          this.form.controls.appetite_value.setErrors(null);
          this.form.controls.welfare_value.setErrors(null);
          this.form.controls.breathing_value.setErrors(null);
          this.form.controls.sleep_value.setErrors(null);
          this.form.controls.obsEsas.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 17) {
      this.refresh17 = false;
      this.form.controls.face_value.setValidators(Validators.compose([Validators.required]));
      var face = this.separateText(this.form.controls.face_value.value);
      this.form.controls.legs_value.setValidators(Validators.compose([Validators.required]));
      var legs = this.separateText(this.form.controls.legs_value.value);
      this.form.controls.activityFlacc_value.setValidators(Validators.compose([Validators.required]));
      var activityFlacc = this.separateText(this.form.controls.activityFlacc_value.value);
      this.form.controls.crying_value.setValidators(Validators.compose([Validators.required]));
      var crying = this.separateText(this.form.controls.crying_value.value);
      this.form.controls.comfort_value.setValidators(Validators.compose([Validators.required]));
      var comfort = this.separateText(this.form.controls.comfort_value.value);
      // this.form.controls.totalFlacc.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classFlacc.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveFlacc({
          face_title: 'Cara',
          face_value: face[0],
          face_detail: face[1],
          leg_titles: 'Piernas',
          legs_value: legs[0],
          legs_detail: legs[1],
          activity_title: 'Actividad',
          activity_value: activityFlacc[0],
          activity_detail: activityFlacc[1],
          crying_title: 'Llanto',
          crying_value: crying[0],
          crying_detail: crying[1],
          comfor_titlet: 'Capacidad de Consuelo',
          comfort_value: comfort[0],
          comfort_detail: comfort[1],
          total: this.totalFlacc,
          classification: this.classFlacc,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh17 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ face: '', legs: '', activity: '', crying: '', comfort: '', total: '', qualification: '' });
          this.form.controls.face_value.clearValidators();
          this.form.controls.legs_value.clearValidators();
          this.form.controls.activityFlacc_value.clearValidators();
          this.form.controls.crying_value.clearValidators();
          this.form.controls.comfort_value.clearValidators();

          this.form.controls.face_value.setErrors(null);
          this.form.controls.legs_value.setErrors(null);
          this.form.controls.activityFlacc_value.setErrors(null);
          this.form.controls.crying_value.setErrors(null);
          this.form.controls.comfort_value.setErrors(null);


          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 18) {
      this.refresh18 = false;
      this.form.controls.pps_value.setValidators(Validators.compose([Validators.required]));
      var pps = this.separateText(this.form.controls.pps_value.value);
      this.form.controls.oral_value.setValidators(Validators.compose([Validators.required]));
      var oral = this.separateText(this.form.controls.oral_value.value);
      this.form.controls.edema_value.setValidators(Validators.compose([Validators.required]));
      var edema = this.separateText(this.form.controls.edema_value.value);
      this.form.controls.dyspnoea_value.setValidators(Validators.compose([Validators.required]));
      var dyspnoea = this.separateText(this.form.controls.dyspnoea_value.value);
      this.form.controls.delirium_value.setValidators(Validators.compose([Validators.required]));
      var delirium = this.separateText(this.form.controls.delirium_value.value);
      //this.form.controls.totalPpi.setValidators(Validators.compose([Validators.required]));
      //this.form.controls.classPpi.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePpi({
          pps_title: 'Paliative Performance Status (PPS)',
          pps_value: pps[0],
          pps_detail: pps[1],
          oral_title: 'Síntomas Clínicos - Vía Oral Libre',
          oral_value: oral[0],
          oral_detail: oral[1],
          edema_title: 'Síntomas Clínicos - Edemas',
          edema_value: edema[0],
          edema_detail: edema[1],
          dyspnoea_title: 'Síntomas Clínicos - Disnea de Reposo',
          dyspnoea_value: dyspnoea[0],
          dyspnoea_detail: dyspnoea[1],
          delirium_title: 'Síntomas Clínicos - Delirium',
          delirium_value: delirium[0],
          delirium_detail: delirium[1],
          total: this.totalPpi,
          classification: this.classPpi,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh18 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ pps_value: '', oral_value: '', edema_value: '', dyspnoea_value: '', delirium_value: '', totalPpi: '', classPpi: '' });
          this.form.controls.pps_value.clearValidators();
          this.form.controls.oral_value.clearValidators();
          this.form.controls.edema_value.clearValidators();
          this.form.controls.dyspnoea_value.clearValidators();
          this.form.controls.delirium_value.clearValidators();

          this.form.controls.pps_value.setErrors(null);
          this.form.controls.oral_value.setErrors(null);
          this.form.controls.edema_value.setErrors(null);
          this.form.controls.dyspnoea_value.setErrors(null);
          this.form.controls.delirium_value.setErrors(null);


          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 19) {
      this.refresh19 = false;
      this.form.controls.q_one_value.setValidators(Validators.compose([Validators.required]));
      var q_one = this.separateText(this.form.controls.q_one_value.value);
      this.form.controls.q_two_value.setValidators(Validators.compose([Validators.required]));
      var q_two = this.separateText(this.form.controls.q_two_value.value);
      this.form.controls.q_three_value.setValidators(Validators.compose([Validators.required]));
      var q_three = this.separateText(this.form.controls.q_three_value.value);
      this.form.controls.q_four_value.setValidators(Validators.compose([Validators.required]));
      var q_four = this.separateText(this.form.controls.q_four_value.value);
      this.form.controls.q_five_value.setValidators(Validators.compose([Validators.required]));
      var q_five = this.separateText(this.form.controls.q_five_value.value);
      this.form.controls.q_six_value.setValidators(Validators.compose([Validators.required]));
      var q_six = this.separateText(this.form.controls.q_six_value.value);
      this.form.controls.q_seven_value.setValidators(Validators.compose([Validators.required]));
      var q_seven = this.separateText(this.form.controls.q_seven_value.value);
      this.form.controls.q_eight_value.setValidators(Validators.compose([Validators.required]));
      var q_eight = this.separateText(this.form.controls.q_eight_value.value);
      this.form.controls.q_nine_value.setValidators(Validators.compose([Validators.required]));
      var q_nine = this.separateText(this.form.controls.q_nine_value.value);
      this.form.controls.q_ten_value.setValidators(Validators.compose([Validators.required]));
      var q_ten = this.separateText(this.form.controls.q_ten_value.value);
      this.form.controls.q_eleven_value.setValidators(Validators.compose([Validators.required]));
      var q_eleven = this.separateText(this.form.controls.q_eleven_value.value);
      this.form.controls.q_twelve_value.setValidators(Validators.compose([Validators.required]));
      var q_twelve = this.separateText(this.form.controls.q_twelve_value.value);
      this.form.controls.q_thirteen_value.setValidators(Validators.compose([Validators.required]));
      var q_thirteen = this.separateText(this.form.controls.q_thirteen_value.value);
      this.form.controls.q_fourteen_value.setValidators(Validators.compose([Validators.required]));
      var q_fourteen = this.separateText(this.form.controls.q_fourteen_value.value);
      this.form.controls.q_fifteen_value.setValidators(Validators.compose([Validators.required]));
      var q_fifteen = this.separateText(this.form.controls.q_fifteen_value.value);
      this.form.controls.q_sixteen_value.setValidators(Validators.compose([Validators.required]));
      var q_sixteen = this.separateText(this.form.controls.q_sixteen_value.value);
      this.form.controls.q_seventeen_value.setValidators(Validators.compose([Validators.required]));
      var q_seventeen = this.separateText(this.form.controls.q_seventeen_value.value);
      this.form.controls.q_eighteen_value.setValidators(Validators.compose([Validators.required]));
      var q_eighteen = this.separateText(this.form.controls.q_eighteen_value.value);
      this.form.controls.q_nineteen_value.setValidators(Validators.compose([Validators.required]));
      var q_nineteen = this.separateText(this.form.controls.q_nineteen_value.value);
      this.form.controls.q_twenty_value.setValidators(Validators.compose([Validators.required]));
      var q_twenty = this.separateText(this.form.controls.q_twenty_value.value);
      this.form.controls.q_twenty_one_value.setValidators(Validators.compose([Validators.required]));
      var q_twenty_one = this.separateText(this.form.controls.q_twenty_one_value.value);
      this.form.controls.q_twenty_two_value.setValidators(Validators.compose([Validators.required]));
      var q_twenty_two = this.separateText(this.form.controls.q_twenty_two_value.value);
      // this.form.controls.totalZarit.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.classZarit.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveZarit({
          q_one_title: '¿Piensa que su familiar le pide más ayuda de la que realmente necesita?',
          q_one_value: q_one[0],
          q_one_detail: q_one[1],
          q_two_title: '¿Piensa que debido al tiempo que dedica a su familiar, no tiene suficiente tiempo para usted?',
          q_two_value: q_two[0],
          q_two_detail: q_two[1],
          q_three_title: '¿Se siente agobiado por intentar combinar el cuidado de su familiar con otras responsabilidades (trabajo, familia)?',
          q_three_value: q_three[0],
          q_three_detail: q_three[1],
          q_four_title: '¿Siente vergüenza por la conducta de su familiar?',
          q_four_value: q_four[0],
          q_four_detail: q_four[1],
          q_five_title: '¿Se siente enfadado cuando está cerca de su familiar?',
          q_five_value: q_five[0],
          q_five_detail: q_five[1],
          q_six_title: '¿Piensa que el cuidar de su familiar afecta negativamente la relación que tiene con otros miembros de su familia?',
          q_six_value: q_six[0],
          q_six_detail: q_six[1],
          q_seven_title: '¿Tiene miedo por el futuro de su familiar?',
          q_seven_value: q_seven[0],
          q_seven_detail: q_seven[1],
          q_eight_title: '¿Piensa que su familiar depende de usted?',
          q_eight_value: q_eight[0],
          q_eight_detail: q_eight[1],
          q_nine_title: '¿Se siente tenso cuando está cerca de su familiar?',
          q_nine_value: q_nine[0],
          q_nine_detail: q_nine[1],
          q_ten_title: '¿Piensa que su salud ha empeorado debido a tener que cuidar a su familiar?',
          q_ten_value: q_ten[0],
          q_ten_detail: q_ten[1],
          q_eleven_title: '¿Piensa que no tiene tanta intimidad como le gustaría debido al cuidado de su familiar?',
          q_eleven_value: q_eleven[0],
          q_eleven_detail: q_eleven[1],
          q_twelve_title: '¿Piensa que su vida social se ha visto afectada de manera negativa por tener que cuidar a su familiar?',
          q_twelve_value: q_twelve[0],
          q_twelve_detail: q_twelve[1],
          q_thirteen_title: '¿Se siente incómodo por distanciarte de sus amistades debido al cuidado de su familiar?',
          q_thirteen_value: q_thirteen[0],
          q_thirteen_detail: q_thirteen[1],
          q_fourteen_title: '¿Piensa que su familiar lo considera la única persona que le puede cuidar?',
          q_fourteen_value: q_fourteen[0],
          q_fourteen_detail: q_fourteen[1],
          q_fifteen_title: '¿Piensa que no tiene suficientes ingresos económicos para los gastos de su familiar, además de los suyos?',
          q_fifteen_value: q_fifteen[0],
          q_fifteen_detail: q_fifteen[1],
          q_sixteen_title: '¿Piensa que no será capaz de cuidar a su familiar por mucho más tiempo?',
          q_sixteen_value: q_sixteen[0],
          q_sixteen_detail: q_sixteen[1],
          q_seventeen_title: '¿Siente que ha perdido el control de su vida desde que empezó la enfermedad de su familiar?',
          q_seventeen_value: q_seventeen[0],
          q_seventeen_detail: q_seventeen[1],
          q_eighteen_title: '¿Desearía poder delegar el cuidado de su familiar a otra persona?',
          q_eighteen_value: q_eighteen[0],
          q_eighteen_detail: q_eighteen[1],
          q_nineteen_title: '¿Se siente indeciso sobre qué hacer con su familiar?',
          q_nineteen_value: q_nineteen[0],
          q_nineteen_detail: q_nineteen[1],
          q_twenty_title: '¿Piensa que debería hacer más por su familiar?',
          q_twenty_value: q_twenty[0],
          q_twenty_detail: q_twenty[1],
          q_twenty_one_title: '¿Piensa que podría cuidar mejor a su familiar?',
          q_twenty_one_value: q_twenty_one[0],
          q_twenty_one_detail: q_twenty_one[1],
          q_twenty_two_title: '¿Globalmente, ¿qué grado de “carga” experimentas por el hecho de cuidar a su familiar?',
          q_twenty_two_value: q_twenty_two[0],
          q_twenty_two_detail: q_twenty_two[1],
          total: this.totalZarit,
          classification: this.classZarit,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh19 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ q_one_value: '', q_two_value: '', q_three_value: '', q_four_value: '', q_five_value: '', q_six_value: '', q_seven_value: '', q_eight_value: '', q_nine_value: '', q_ten_value: '', q_eleven_value: '', q_twelve_value: '', q_thirteen_value: '', q_fourteen_value: '', q_fifteen_value: '', q_sixteen_value: '', q_seventeen_value: '', q_eighteen_value: '', q_nineteen_value: '', q_twenty_value: '', q_twenty_one_value: '', q_twenty_two_value: '', totalZarit: '', classZarit: '' });
          this.form.controls.q_one_value.clearValidators();
          this.form.controls.q_two_value.clearValidators();
          this.form.controls.q_three_value.clearValidators();
          this.form.controls.q_four_value.clearValidators();
          this.form.controls.q_five_value.clearValidators();
          this.form.controls.q_six_value.clearValidators();
          this.form.controls.q_seven_value.clearValidators();
          this.form.controls.q_eight_value.clearValidators();
          this.form.controls.q_nine_value.clearValidators();
          this.form.controls.q_ten_value.clearValidators();
          this.form.controls.q_eleven_value.clearValidators();
          this.form.controls.q_twelve_value.clearValidators();
          this.form.controls.q_thirteen_value.clearValidators();
          this.form.controls.q_fourteen_value.clearValidators();
          this.form.controls.q_fifteen_value.clearValidators();
          this.form.controls.q_sixteen_value.clearValidators();
          this.form.controls.q_seventeen_value.clearValidators();
          this.form.controls.q_eighteen_value.clearValidators();
          this.form.controls.q_nineteen_value.clearValidators();
          this.form.controls.q_twenty_value.clearValidators();
          this.form.controls.q_twenty_one_value.clearValidators();
          this.form.controls.q_twenty_two_value.clearValidators();

          this.form.controls.q_one_value.setErrors(null);
          this.form.controls.q_two_value.setErrors(null);
          this.form.controls.q_three_value.setErrors(null);
          this.form.controls.q_four_value.setErrors(null);
          this.form.controls.q_five_value.setErrors(null);
          this.form.controls.q_six_value.setErrors(null);
          this.form.controls.q_seven_value.setErrors(null);
          this.form.controls.q_eight_value.setErrors(null);
          this.form.controls.q_nine_value.setErrors(null);
          this.form.controls.q_ten_value.setErrors(null);
          this.form.controls.q_eleven_value.setErrors(null);
          this.form.controls.q_twelve_value.setErrors(null);
          this.form.controls.q_thirteen_value.setErrors(null);
          this.form.controls.q_fourteen_value.setErrors(null);
          this.form.controls.q_fifteen_value.setErrors(null);
          this.form.controls.q_sixteen_value.setErrors(null);
          this.form.controls.q_seventeen_value.setErrors(null);
          this.form.controls.q_eighteen_value.setErrors(null);
          this.form.controls.q_nineteen_value.setErrors(null);
          this.form.controls.q_twenty_value.setErrors(null);
          this.form.controls.q_twenty_one_value.setErrors(null);
          this.form.controls.q_twenty_two_value.setErrors(null);


          if (this.saved) {
            this.saved()
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 20) {
      this.refresh20 = false;
      this.form.controls.rangePain_value.setValidators(Validators.compose([Validators.required]));
      var rangePain = this.separateText(this.form.controls.rangePain_value.value);
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePain({
          range_title: rangePain[1],
          range_value: rangePain[0],
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh20 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ rangePain_value: '' });
          this.form.controls.rangePain_value.clearValidators();
          this.form.controls.rangePain_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 21) {
      this.refresh21 = false;
      this.form.controls.painWong_value.setValidators(Validators.compose([Validators.required]));
      var painWong = this.separateText(this.form.controls.painWong_value.value);
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveWongBaker({
          pain_title: painWong[1],
          pain_value: painWong[0],
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh21 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ painWong_value: '' });
          this.form.controls.painWong_value.clearValidators();
          this.form.controls.painWong_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 22) {
      this.refresh22 = false;
      this.form.controls.studyValue.setValidators(Validators.compose([Validators.required]));
      this.form.controls.qOneValue.setValidators(Validators.compose([Validators.required]));
      var qOneValue = this.separateText(this.form.controls.qOneValue.value);
      this.form.controls.qTwoValue.setValidators(Validators.compose([Validators.required]));
      var qTwoValue = this.separateText(this.form.controls.qTwoValue.value);
      this.form.controls.qThreeValue.setValidators(Validators.compose([Validators.required]));
      var qThreeValue = this.separateText(this.form.controls.qThreeValue.value);
      this.form.controls.qFourValue.setValidators(Validators.compose([Validators.required]));
      var qFourValue = this.separateText(this.form.controls.qFourValue.value);
      this.form.controls.qFiveValue.setValidators(Validators.compose([Validators.required]));
      var qFiveValue = this.separateText(this.form.controls.qFiveValue.value);
      this.form.controls.qSixValue.setValidators(Validators.compose([Validators.required]));
      var qSixValue = this.separateText(this.form.controls.qSixValue.value);
      this.form.controls.qSevenValue.setValidators(Validators.compose([Validators.required]));
      var qSevenValue = this.separateText(this.form.controls.qSevenValue.value);
      this.form.controls.qEightValue.setValidators(Validators.compose([Validators.required]));
      var qEightValue = this.separateText(this.form.controls.qEightValue.value);
      this.form.controls.qNineValue.setValidators(Validators.compose([Validators.required]));
      var qNineValue = this.separateText(this.form.controls.qNineValue.value);
      this.form.controls.qTenValue.setValidators(Validators.compose([Validators.required]));
      var qTenValue = this.separateText(this.form.controls.qTenValue.value);
      //this.form.controls.totalPfeiffer.setValidators(Validators.compose([Validators.required]));
      //this.form.controls.classPfeiffer.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SavePfeiffer({
          study_title: '¿Tiene estudios?',
          study_value: this.form.controls.studyValue.value == true ? 0 : 1,
          study_detail: this.form.controls.studyValue.value == true ? 'SI' : 'NO',
          q_one_title: '¿Cuál es la fecha de hoy? (Día, Mes y Año)',
          q_one_value: qOneValue[0],
          q_one_detail: qOneValue[1],
          q_two_title: '¿Qué día de la semana es hoy?',
          q_two_value: qTwoValue[0],
          q_two_detail: qTwoValue[1],
          q_three_title: '¿En que lugar estamos? (Descripción o Nombre)',
          q_three_value: qThreeValue[0],
          q_three_detail: qThreeValue[1],
          q_four_title: '¿Cuál es su número de teléfono? (O direccion completa)',
          q_four_value: qFourValue[0],
          q_four_detail: qFourValue[1],
          q_five_title: '¿Dónde nació?',
          q_five_value: qFiveValue[0],
          q_five_detail: qFiveValue[1],
          q_six_title: '¿Cuál es el nombre del presidente?',
          q_six_value: qSixValue[0],
          q_six_detail: qSixValue[1],
          q_seven_title: '¿Cuál es el nombre del presidente anterior?',
          q_seven_value: qSevenValue[0],
          q_seven_detail: qSevenValue[1],
          q_eight_title: '¿Cuál es el nombre de soltera de madre?',
          q_eight_value: qEightValue[0],
          q_eight_detail: qEightValue[1],
          q_nine_title: '¿Cuál es su edad?',
          q_nine_value: qNineValue[0],
          q_nine_detail: qNineValue[1],
          q_ten_title: 'A 20 réstele 3 y continúe restando 3 a cada resultado, hasta el final (20-17-14-12-11-8-5-2).',
          q_ten_value: qTenValue[0],
          q_ten_detail: qTenValue[1],
          total: this.totalPfeiffer,
          classification: this.classPfeiffer,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh22 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ studyValue: '', qOneValue: '', qTwoValue: '', qThreeValue: '', qFourValue: '', qFiveValue: '', qSixValue: '', qSevenValue: '', qEightValue: '', qNineValue: '', qTenValue: '', totalPfeiffer: '', classPfeiffer: '' });
          this.form.controls.studyValue.clearValidators();
          this.form.controls.qOneValue.clearValidators();
          this.form.controls.qTwoValue.clearValidators();
          this.form.controls.qThreeValue.clearValidators();
          this.form.controls.qFourValue.clearValidators();
          this.form.controls.qFiveValue.clearValidators();
          this.form.controls.qSixValue.clearValidators();
          this.form.controls.qSevenValue.clearValidators();
          this.form.controls.qEightValue.clearValidators();
          this.form.controls.qNineValue.clearValidators();
          this.form.controls.qTenValue.clearValidators();

          this.form.controls.studyValue.setErrors(null);
          this.form.controls.qOneValue.setErrors(null);
          this.form.controls.qTwoValue.setErrors(null);
          this.form.controls.qThreeValue.setErrors(null);
          this.form.controls.qFourValue.setErrors(null);
          this.form.controls.qFiveValue.setErrors(null);
          this.form.controls.qSixValue.setErrors(null);
          this.form.controls.qSevenValue.setErrors(null);
          this.form.controls.qEightValue.setErrors(null);
          this.form.controls.qNineValue.setErrors(null);
          this.form.controls.qTenValue.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 23) {
      this.refresh23 = false;
      this.form.controls.falls_value.setValidators(Validators.compose([Validators.required]));
      var falls = this.separateText(this.form.controls.falls_value.value);
      this.form.controls.medication_value.setValidators(Validators.compose([Validators.required]));
      var medication = this.separateText(this.form.controls.medication_value.value);
      this.form.controls.deficiency_value.setValidators(Validators.compose([Validators.required]));
      var deficiency = this.separateText(this.form.controls.deficiency_value.value);
      this.form.controls.mental_value.setValidators(Validators.compose([Validators.required]));
      var mental = this.separateText(this.form.controls.mental_value.value);
      this.form.controls.wandering_value.setValidators(Validators.compose([Validators.required]));
      var wandering = this.separateText(this.form.controls.wandering_value.value);
      // this.form.controls.totalJhDownton.setValidators(Validators.compose([Validators.required]));
      // this.form.controls.riskJhDownton.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveJhDownton({
          falls_title: 'Caídas previas',
          falls_value: falls[0],
          falls_detail: falls[1],
          medication_title: 'Medicación',
          medication_value: medication[0],
          medication_detail: medication[1],
          deficiency_title: 'Déficit sensoriales',
          deficiency_value: deficiency[0],
          deficiency_detail: deficiency[1],
          mental_title: 'Estado mental',
          mental_value: mental[0],
          mental_detail: mental[1],
          wandering_title: 'Deambulación',
          wandering_value: wandering[0],
          wandering_detail: wandering[1],
          total: this.totalJhDownton,
          risk: this.riskJhDownton,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh23 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ falls_value: '', medication_value: '', deficiency_value: '', mental_value: '', wandering_value: '', totalJhDownton: '', riskJhDownton: '' });
          this.form.controls.falls_value.clearValidators();
          this.form.controls.medication_value.clearValidators();
          this.form.controls.deficiency_value.clearValidators();
          this.form.controls.mental_value.clearValidators();
          this.form.controls.wandering_value.clearValidators();

          this.form.controls.falls_value.setErrors(null);
          this.form.controls.medication_value.setErrors(null);
          this.form.controls.deficiency_value.setErrors(null);
          this.form.controls.mental_value.setErrors(null);
          this.form.controls.wandering_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }

    if (escale_id == 24) {
      this.refresh24 = false;
      this.form.controls.vOneScreening_value.setValidators(Validators.compose([Validators.required]));
      var vOneScreening = this.separateText(this.form.controls.vOneScreening_value.value);
      this.form.controls.vTwoScreening_value.setValidators(Validators.compose([Validators.required]));
      var vTwoScreening = this.separateText(this.form.controls.vTwoScreening_value.value);
      this.form.controls.vThreeScreening_value.setValidators(Validators.compose([Validators.required]));
      var vThreeScreening = this.separateText(this.form.controls.vThreeScreening_value.value);
      this.form.controls.vFourScreening_value.setValidators(Validators.compose([Validators.required]));
      var vFourScreening = this.separateText(this.form.controls.vFourScreening_value.value);
      this.form.controls.vFiveScreening_value.setValidators(Validators.compose([Validators.required]));
      var vFiveScreening = this.separateText(this.form.controls.vFiveScreening_value.value);
      this.form.controls.vSixScreening_value.setValidators(Validators.compose([Validators.required]));
      var vSixScreening = this.separateText(this.form.controls.vSixScreening_value.value);
      this.form.controls.vSevenScreening_value.setValidators(Validators.compose([Validators.required]));
      var vSevenScreening = this.separateText(this.form.controls.vSevenScreening_value.value);
      this.form.controls.vEightScreening_value.setValidators(Validators.compose([Validators.required]));
      var vEightScreening = this.separateText(this.form.controls.vEightScreening_value.value);
      this.form.controls.vNineScreening_value.setValidators(Validators.compose([Validators.required]));
      var vNineScreening = this.separateText(this.form.controls.vNineScreening_value.value);
      this.form.controls.vTenScreening_value.setValidators(Validators.compose([Validators.required]));
      var vTenScreening = this.separateText(this.form.controls.vTenScreening_value.value);
      //this.form.controls.totalScreening.setValidators(Validators.compose([Validators.required]));
      //this.form.controls.riskScreening.setValidators(Validators.compose([Validators.required]));
      this.loading = true;
      this.showTable = false;
      if (!this.form.invalid) {
        await this.chScalesS.SaveScreening({
          v_one_title: 'Tiene alguna enfermedad o condición que le ha hecho cambiar la clase de comida o la cantidad de alimento que come.',
          v_one_value: vOneScreening[0],
          v_one_detail: vOneScreening[1],
          v_two_title: 'Come menos de dos comidas al día.',
          v_two_value: vTwoScreening[0],
          v_two_detail: vTwoScreening[1],
          v_three_title: 'Come pocas frutas, vegetales o productos de leche.',
          v_three_value: vThreeScreening[0],
          v_three_detail: vThreeScreening[1],
          v_four_title: 'Toma tres o más bebidas de cerveza, licores o vino casi todos los días',
          v_four_value: vFourScreening[0],
          v_four_detail: vFourScreening[1],
          v_five_title: 'Tiene problemas con los dientes o la boca que le dificultan el comer.',
          v_five_value: vFiveScreening[0],
          v_five_detail: vFiveScreening[1],
          v_six_title: 'No siempre tiene suficiente dinero para comprar los alimentos que necesita.',
          v_six_value: vSixScreening[0],
          v_six_detail: vSixScreening[1],
          v_seven_title: 'Come a solas la mayor parte de las veces.',
          v_seven_value: vSevenScreening[0],
          v_seven_detail: vSevenScreening[1],
          v_eight_title: 'Toma al día tres o más medicinas diferentes, con o sin recetas.',
          v_eight_value: vEightScreening[0],
          v_eight_detail: vEightScreening[1],
          v_nine_title: 'Ha perdido o ganado, sin querer, 4.5 kg (10 lb) en los últimos 6 meses.',
          v_nine_value: vNineScreening[0],
          v_nine_detail: vNineScreening[1],
          v_ten_title: 'Físicamente no puede ir de compras, cocinar o alimentarse.',
          v_ten_value: vTenScreening[0],
          v_ten_detail: vTenScreening[1],
          total: this.totalScreening,
          risk: this.riskScreening,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh24 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({
            vOneScreening_value: '', vTwoScreening_value: '', vThreeScreening_value: '', vFourScreening_value: '', vFiveScreening_value: '', vSixScreening_value: '', vSevenScreening_value: '',
            vEightScreening_value: '', vNineScreening_value: '', vTenScreening_value: '', totalScreening: '', riskScreening: ''
          });
          this.form.controls.vOneScreening_value.clearValidators();
          this.form.controls.vTwoScreening_value.clearValidators();
          this.form.controls.vThreeScreening_value.clearValidators();
          this.form.controls.vFourScreening_value.clearValidators();
          this.form.controls.vFiveScreening_value.clearValidators();
          this.form.controls.vSixScreening_value.clearValidators();
          this.form.controls.vSevenScreening_value.clearValidators();
          this.form.controls.vEightScreening_value.clearValidators();
          this.form.controls.vNineScreening_value.clearValidators();
          this.form.controls.vTenScreening_value.clearValidators();

          this.form.controls.vOneScreening_value.setErrors(null);
          this.form.controls.vTwoScreening_value.setErrors(null);
          this.form.controls.vThreeScreening_value.setErrors(null);
          this.form.controls.vFourScreening_value.setErrors(null);
          this.form.controls.vFiveScreening_value.setErrors(null);
          this.form.controls.vSixScreening_value.setErrors(null);
          this.form.controls.vSevenScreening_value.setErrors(null);
          this.form.controls.vEightScreening_value.setErrors(null);
          this.form.controls.vNineScreening_value.setErrors(null);
          this.form.controls.vTenScreening_value.setErrors(null);

          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 25) {
      this.refresh25 = false;
      this.loading = true;
      this.showTable = false;
      if (this.ppsObj) {
        await this.chScalesS.SavePps({
          score_title: this.ppsObj.text,
          score_value: this.ppsObj.id,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh25 = true;
          this.toastService.success('', x.message);
          this.form.patchValue({ range: '' });
          if (this.saved) {
            this.saved()

          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.toastService.warning('', 'debe seleccionar un porcentaje de la lista');
      }
    }

    if (escale_id == 26) {
      this.refresh26 = false;
      this.form.controls.sensoryBradenValue.setValidators(Validators.compose([Validators.required]));
      var sensory = this.separateText(this.form.controls.sensoryBradenValue.value);
      this.form.controls.humidityBradenValue.setValidators(Validators.compose([Validators.required]));
      var humidity = this.separateText(this.form.controls.humidityBradenValue.value);
      this.form.controls.activityBradenValue.setValidators(Validators.compose([Validators.required]));
      var activity = this.separateText(this.form.controls.activityBradenValue.value);
      this.form.controls.mobilityBradenValue.setValidators(Validators.compose([Validators.required]));
      var mobility = this.separateText(this.form.controls.mobilityBradenValue.value);
      this.form.controls.nutritionBradenValue.setValidators(Validators.compose([Validators.required]));
      var nutrition = this.separateText(this.form.controls.nutritionBradenValue.value);
      this.form.controls.lesionBradenValue.setValidators(Validators.compose([Validators.required]));
      var lesion = this.separateText(this.form.controls.lesionBradenValue.value);
      //this.form.controls.totalBraden.setValidators(Validators.compose([Validators.required]));
      //this.form.controls.riskBraden.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;
        await this.chScalesS.SaveBraden({
          sensory_title: 'Percepción Sensorial',
          sensory_value: sensory[0],
          sensory_detail: sensory[1],
          humidity_title: 'Exposición a la Humedad',
          humidity_value: humidity[0],
          humidity_detail: humidity[1],
          activity_title: 'Actividad',
          activity_value: activity[0],
          activity_detail: activity[1],
          mobility_title: 'Movilidad',
          mobility_value: mobility[0],
          mobility_detail: mobility[1],
          nutrition_title: 'Nutrición',
          nutrition_value: nutrition[0],
          nutrition_detail: nutrition[1],
          lesion_title: 'Roce y Peligro de Lesiones',
          lesion_value: lesion[0],
          lesion_detail: lesion[1],
          total: this.totalBraden,
          risk: this.riskBraden,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh26 = true;
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ sensoryBradenValue: '', humidityBradenValue: '', activityBradenValue: '', mobilityBradenValue: '', nutritionBradenValue: '', lesionBradenValue: '', totalBraden: '', riskBraden: '' });
          this.form.controls.sensoryBradenValue.clearValidators();
          this.form.controls.humidityBradenValue.clearValidators();
          this.form.controls.activityBradenValue.clearValidators();
          this.form.controls.mobilityBradenValue.clearValidators();
          this.form.controls.nutritionBradenValue.clearValidators();
          this.form.controls.lesionBradenValue.clearValidators();

          this.form.controls.sensoryBradenValue.setErrors(null);
          this.form.controls.humidityBradenValue.setErrors(null);
          this.form.controls.activityBradenValue.setErrors(null);
          this.form.controls.mobilityBradenValue.setErrors(null);
          this.form.controls.nutritionBradenValue.setErrors(null);
          this.form.controls.lesionBradenValue.setErrors(null);

          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;

        });
      } else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }
    }

    if (escale_id == 27) {
      this.refresh27 = false;
      this.form.controls.phone_value.setValidators(Validators.compose([Validators.required]));
      var phone = this.separateText(this.form.controls.phone_value.value);
      this.form.controls.shopping_value.setValidators(Validators.compose([Validators.required]));
      var shopping = this.separateText(this.form.controls.shopping_value.value);
      this.form.controls.food_value.setValidators(Validators.compose([Validators.required]));
      var food = this.separateText(this.form.controls.food_value.value);
      this.form.controls.house_value.setValidators(Validators.compose([Validators.required]));
      var house = this.separateText(this.form.controls.house_value.value);
      this.form.controls.clothing_value.setValidators(Validators.compose([Validators.required]));
      var clothing = this.separateText(this.form.controls.clothing_value.value);
      this.form.controls.transport_value.setValidators(Validators.compose([Validators.required]));
      var transport = this.separateText(this.form.controls.transport_value.value);
      this.form.controls.medicationValue.setValidators(Validators.compose([Validators.required]));
      var medicationLawton = this.separateText(this.form.controls.medicationValue.value);
      this.form.controls.finance_value.setValidators(Validators.compose([Validators.required]));
      var finance = this.separateText(this.form.controls.finance_value.value);
      //this.form.controls.totalLawton.setValidators(Validators.compose([Validators.required]));
      //this.form.controls.riskLawton.setValidators(Validators.compose([Validators.required]));
      this.isSubmitted = true;
      if (!this.form.invalid) {
        this.loading = true;
        this.showTable = false;
        await this.chScalesS.SaveLawton({
          phone_title: 'Capacidad para usar el télefono',
          phone_value: phone[0],
          phone_detail: phone[1],
          shopping_title: 'Hacer compras',
          shopping_value: shopping[0],
          shopping_detail: shopping[1],
          food_title: 'Preparación de la comida',
          food_value: food[0],
          food_detail: food[1],
          house_title: 'Cuidado de la casa',
          house_value: house[0],
          house_detail: house[1],
          clothing_title: 'Lavado de la ropa',
          clothing_value: clothing[0],
          clothing_detail: clothing[1],
          transport_title: 'Uso de medios de transporte',
          transport_value: transport[0],
          transport_detail: transport[1],
          medication_title: 'Responsabilidad respecto a su medicación',
          medication_value: medicationLawton[0],
          medication_detail: medicationLawton[1],
          finance_title: 'Manejo de asuntos económicos',
          finance_value: finance[0],
          finance_detail: finance[1],
          total: this.totalLawton,
          risk: this.riskLawton,
          type_record_id: 4,
          ch_record_id: this.record_id,
        }).then(x => {
          this.refresh27 = true;
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({ phone_value: '', shopping_value: '', food_value: '', house_value: '', clothing_value: '', transport_value: '', medicationValue: '', finance_value: '', totalLawton: '', riskLawton: '' });
          this.form.controls.phone_value.clearValidators();
          this.form.controls.shopping_value.clearValidators();
          this.form.controls.food_value.clearValidators();
          this.form.controls.house_value.clearValidators();
          this.form.controls.clothing_value.clearValidators();
          this.form.controls.transport_value.clearValidators();
          this.form.controls.medicationValue.clearValidators();
          this.form.controls.finance_value.clearValidators();

          this.form.controls.phone_value.setErrors(null);
          this.form.controls.shopping_value.setErrors(null);
          this.form.controls.food_value.setErrors(null);
          this.form.controls.house_value.setErrors(null);
          this.form.controls.clothing_value.setErrors(null);
          this.form.controls.transport_value.setErrors(null);
          this.form.controls.medicationValue.setErrors(null);
          this.form.controls.finance_value.setErrors(null);

          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;

        });
      }else {
        this.toastService.warning('', "Debe diligenciar los campos obligatorios");
      }

    }
  }

  getAge(birthday: string): number {
    var date = new Date(birthday);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

