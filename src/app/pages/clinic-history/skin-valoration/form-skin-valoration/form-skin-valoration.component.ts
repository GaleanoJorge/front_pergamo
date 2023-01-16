import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChFailedService } from '../../../../business-controller/ch-failed.service';
import { ChReasonService } from '../../../../business-controller/ch-reason.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from '../../../../business-controller/diagnosis.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BodyRegionService } from '../../../../business-controller/body-region.service';
import { SkinStatusService } from '../../../../business-controller/skin-status.service';
import { ChSkinValorationService } from '../../../../business-controller/ch-skin-valoration.service';

@Component({
  selector: 'ngx-form-skin-valoration',
  templateUrl: './form-skin-valoration.component.html',
  styleUrls: ['./form-skin-valoration.component.scss'],
})
export class FormSkinValorationComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = true;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public ch_reason_id: any[];
  public diagnosis: any[] = [];
  public diagnosis_id: any;
  public previewFile = null;
  public show1: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;
  public show4: boolean = false;
  public show5: boolean = false;
  public show6: boolean = false;
  public show7: boolean = false;
  public show8: boolean = false;
  public show9: boolean = false;


  public body_region: any[] = [];
  public skin_status =
    [
      {
        id: 1,
        name: 'PIEL SANA',
      },
      {
        id: 2,
        name: 'G I',
      },
      {
        id: 3,
        name: 'G II',
      },
      {
        id: 4,
        name: 'G III',
      },
      {
        id: 5,
        name: 'G IV',
      },
      {
        id: 6,
        name: 'NO VAROLABLE POR TEJIDO NECROTICO',
      }
    ];
  public exudate_type =
    [
      {
        id: 1,
        name: 'PURULENTA',
      },
      {
        id: 2,
        name: 'SANGUINOLENTA',
      },
      {
        id: 3,
        name: 'SEROSANGUINOLENTO',
      },
      {
        id: 4,
        name: 'SEROSO',
      },
      {
        id: 5,
        name: 'TRANSPARENTE',
      },
    ];

  public sendArray: any = [];
  public loadAuxData = true;



  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChFailedS: ChFailedService,
    private ChReasonS: ChReasonService,
    private route: ActivatedRoute,
    private DiagnosisS: DiagnosisService,
    private bodyRegionS: BodyRegionService,
    private skinStatusS: SkinStatusService,
    private chSkinValorationS: ChSkinValorationService
  ) { }

  async ngOnInit(): Promise<void> {

    if (!this.data) {
      this.data = {
        diagnosis_id: '',
        skin_status_id1: '',
        pressure_ulcers1: false,
        exudate1: '',
        concentrated1: '',
        infection_sign1: '',
        surrounding_skin1: '',
        observation1: '',
        skin_status_id2: '',
        pressure_ulcers2: false,
        exudate2: '',
        concentrated2: '',
        infection_sign2: '',
        surrounding_skin2: '',
        observation2: '',
        skin_status_id3: '',
        pressure_ulcers3: false,
        exudate3: '',
        concentrated3: '',
        infection_sign3: '',
        surrounding_skin3: '',
        observation3: '',
        skin_status_id4: '',
        pressure_ulcers4: false,
        exudate4: '',
        concentrated4: '',
        infection_sign4: '',
        surrounding_skin4: '',
        observation4: '',
        skin_status_id5: '',
        pressure_ulcers5: false,
        exudate5: '',
        concentrated5: '',
        infection_sign5: '',
        surrounding_skin5: '',
        observation5: '',
        skin_status_id6: '',
        pressure_ulcers6: false,
        exudate6: '',
        concentrated6: '',
        infection_sign6: '',
        surrounding_skin6: '',
        observation6: '',
        skin_status_id7: '',
        pressure_ulcers7: false,
        exudate7: '',
        concentrated7: '',
        infection_sign7: '',
        surrounding_skin7: '',
        observation7: '',
        skin_status_id8: '',
        pressure_ulcers8: false,
        exudate8: '',
        concentrated8: '',
        infection_sign8: '',
        surrounding_skin8: '',
        observation8: '',
        skin_status_id9: '',
        pressure_ulcers9: false,
        exudate9: '',
        concentrated9: '',
        infection_sign9: '',
        surrounding_skin9: '',
        observation9: '',

      };
    }

    this.loadForm(false).then();

    await Promise.all([
      this.GetAuxData(),
    ]);
    this.loadAuxData = false;
    this.loadForm();

  }


  async GetAuxData() {

    // await this.DiagnosisS.GetCollection().then(x => {
    //   this.diagnosis = x;
    // });

    await this.skinStatusS.GetCollection().then(x => {
      this.skin_status = x;
    });

    await this.bodyRegionS.GetCollection().then(x => {
      this.body_region = x;
    });

    await this.chSkinValorationS.ByRecord(this.record_id, this.type_record_id).then(x => {
      x;
      if (x.length > 0) {
        this.data = x
        this.disabled = true
      }
      this.loading = false;
    });
    // this.onChange();
    this.loading = false;

    return Promise.resolve(true);
  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.DiagnosisS.GetCollection({
          search: $event,
        }).then(x => {
          this.diagnosis = x;
        });
      } else {
        this.DiagnosisS.GetCollection({
          search: '',
        }).then(x => {
          this.diagnosis = x;
        });
      }
    }
  }

  async loadForm(force = true) {
    if (this.loadAuxData && force) return false;

    this.form = this.formBuilder.group({
      diagnosis_id: [
        this.data[0] ? this.returnDiagnosis(this.data[0].diagnosis_id) : this.data.diagnosis_id,
        Validators.compose([Validators.required]),
      ],
      skin_status_id1: [
        this.data[0] ? this.data[0].skin_status_id : this.data.skin_status_id1,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers1: [
        this.data[0] ? this.data[0].pressure_ulcers : this.data.pressure_ulcers1,
        // Validators.compose([Validators.required]),
      ],
      exudate1: [
        this.data[0] ? this.data[0].exudate : this.data.exudate1,
        // Validators.compose([Validators.required]),
      ],
      concentrated1: [
        this.data[0] ? this.data[0].concentrated : this.data.concentrated1,
        // Validators.compose([Validators.required]),
      ],
      observation1: [
        this.data[0] ? this.data[0].observation : this.data.observation1,
        // Validators.compose([Validators.required]),
      ],
      infection_sign1: [
        this.data[0] ? this.data[0].infection_sign : this.data.infection_sign1,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin1: [
        this.data[0] ? this.data[0].surrounding_skin : this.data.surrounding_skin1,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id2: [
        this.data[1] ? this.data[1].skin_status_id : this.data.skin_status_id2,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers2: [
        this.data[1] ? this.data[1].pressure_ulcers : this.data.pressure_ulcers2,
        // Validators.compose([Validators.required]),
      ],
      exudate2: [
        this.data[1] ? this.data[1].exudate : this.data.exudate2,
        // Validators.compose([Validators.required]),
      ],
      concentrated2: [
        this.data[1] ? this.data[1].concentrated : this.data.concentrated2,
        // Validators.compose([Validators.required]),
      ],
      observation2: [
        this.data[1] ? this.data[1].observation : this.data.observation2,
        // Validators.compose([Validators.required]),
      ],
      infection_sign2: [
        this.data[1] ? this.data[1].infection_sign : this.data.infection_sign2,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin2: [
        this.data[1] ? this.data[1].surrounding_skin : this.data.surrounding_skin2,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id3: [
        this.data[2] ? this.data[2].skin_status_id : this.data.skin_status_id3,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers3: [
        this.data[2] ? this.data[2].pressure_ulcers : this.data.pressure_ulcers3,
        // Validators.compose([Validators.required]),
      ],
      exudate3: [
        this.data[2] ? this.data[2].exudate : this.data.exudate3,
        // Validators.compose([Validators.required]),
      ],
      concentrated3: [
        this.data[2] ? this.data[2].concentrated : this.data.concentrated3,
        // Validators.compose([Validators.required]),
      ],
      observation3: [
        this.data[2] ? this.data[2].observation : this.data.observation3,
        // Validators.compose([Validators.required]),
      ],
      infection_sign3: [
        this.data[2] ? this.data[2].infection_sign : this.data.infection_sign3,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin3: [
        this.data[2] ? this.data[2].surrounding_skin : this.data.surrounding_skin3,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id4: [
        this.data[3] ? this.data[3].skin_status_id : this.data.skin_status_id4,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers4: [
        this.data[3] ? this.data[3].pressure_ulcers : this.data.pressure_ulcers4,
        // Validators.compose([Validators.required]),
      ],
      exudate4: [
        this.data[3] ? this.data[3].exudate : this.data.exudate4,
        // Validators.compose([Validators.required]),
      ],
      concentrated4: [
        this.data[3] ? this.data[3].concentrated : this.data.concentrated4,
        // Validators.compose([Validators.required]),
      ],
      observation4: [
        this.data[3] ? this.data[3].observation : this.data.observation4,
        // Validators.compose([Validators.required]),
      ],
      infection_sign4: [
        this.data[3] ? this.data[3].infection_sign : this.data.infection_sign4,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin4: [
        this.data[3] ? this.data[3].surrounding_skin : this.data.surrounding_skin4,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id5: [
        this.data[4] ? this.data[4].skin_status_id : this.data.skin_status_id5,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers5: [
        this.data[4] ? this.data[4].pressure_ulcers : this.data.pressure_ulcers5,
        // Validators.compose([Validators.required]),
      ],
      exudate5: [
        this.data[4] ? this.data[4].exudate : this.data.exudate5,
        // Validators.compose([Validators.required]),
      ],
      concentrated5: [
        this.data[4] ? this.data[4].concentrated : this.data.concentrated5,
        // Validators.compose([Validators.required]),
      ],
      observation5: [
        this.data[4] ? this.data[4].observation : this.data.observation5,
        // Validators.compose([Validators.required]),
      ],
      infection_sign5: [
        this.data[4] ? this.data[4].infection_sign : this.data.infection_sign5,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin5: [
        this.data[4] ? this.data[4].surrounding_skin : this.data.surrounding_skin5,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id6: [
        this.data[5] ? this.data[5].skin_status_id : this.data.skin_status_id6,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers6: [
        this.data[5] ? this.data[5].pressure_ulcers : this.data.pressure_ulcers6,
        // Validators.compose([Validators.required]),
      ],
      exudate6: [
        this.data[5] ? this.data[5].exudate : this.data.exudate6,
        // Validators.compose([Validators.required]),
      ],
      concentrated6: [
        this.data[5] ? this.data[5].concentrated : this.data.concentrated6,
        // Validators.compose([Validators.required]),
      ],
      observation6: [
        this.data[5] ? this.data[5].observation : this.data.observation6,
        // Validators.compose([Validators.required]),
      ],
      infection_sign6: [
        this.data[5] ? this.data[5].infection_sign : this.data.infection_sign6,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin6: [
        this.data[5] ? this.data[5].surrounding_skin : this.data.surrounding_skin6,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id7: [
        this.data[6] ? this.data[6].skin_status_id : this.data.skin_status_id7,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers7: [
        this.data[6] ? this.data[6].pressure_ulcers : this.data.pressure_ulcers7,
        // Validators.compose([Validators.required]),
      ],
      exudate7: [
        this.data[6] ? this.data[6].exudate : this.data.exudate7,
        // Validators.compose([Validators.required]),
      ],
      concentrated7: [
        this.data[6] ? this.data[6].concentrated : this.data.concentrated7,
        // Validators.compose([Validators.required]),
      ],
      observation7: [
        this.data[6] ? this.data[6].observation : this.data.observation7,
        // Validators.compose([Validators.required]),
      ],
      infection_sign7: [
        this.data[6] ? this.data[6].infection_sign : this.data.infection_sign7,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin7: [
        this.data[6] ? this.data[6].surrounding_skin : this.data.surrounding_skin7,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id8: [
        this.data[7] ? this.data[7].skin_status_id : this.data.skin_status_id8,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers8: [
        this.data[7] ? this.data[7].pressure_ulcers : this.data.pressure_ulcers8,
        // Validators.compose([Validators.required]),
      ],
      exudate8: [
        this.data[7] ? this.data[7].exudate : this.data.exudate8,
        // Validators.compose([Validators.required]),
      ],
      concentrated8: [
        this.data[7] ? this.data[7].concentrated : this.data.concentrated8,
        // Validators.compose([Validators.required]),
      ],
      observation8: [
        this.data[7] ? this.data[7].observation : this.data.observation8,
        // Validators.compose([Validators.required]),
      ],
      infection_sign8: [
        this.data[7] ? this.data[7].infection_sign : this.data.infection_sign8,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin8: [
        this.data[7] ? this.data[7].surrounding_skin : this.data.surrounding_skin8,
        // Validators.compose([Validators.required]),
      ],
      skin_status_id9: [
        this.data[8] ? this.data[8].skin_status_id : this.data.skin_status_id9,
        Validators.compose([Validators.required]),
      ],
      pressure_ulcers9: [
        this.data[8] ? this.data[8].pressure_ulcers : this.data.pressure_ulcers9,
        // Validators.compose([Validators.required]),
      ],
      exudate9: [
        this.data[8] ? this.data[8].exudate : this.data.exudate9,
        // Validators.compose([Validators.required]),
      ],
      concentrated9: [
        this.data[8] ? this.data[8].concentrated : this.data.concentrated9,
        // Validators.compose([Validators.required]),
      ],
      observation9: [
        this.data[8] ? this.data[8].observation : this.data.observation9,
        // Validators.compose([Validators.required]),
      ],
      infection_sign9: [
        this.data[8] ? this.data[8].infection_sign : this.data.infection_sign9,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin9: [
        this.data[8] ? this.data[8].surrounding_skin : this.data.surrounding_skin9,
        // Validators.compose([Validators.required]),
      ],
    });

    this.onChange();

  }

  returnDiagnosis(diagnosis_id): string {
    if (this.diagnosis) {
      var localIdentify = this.diagnosis.find(item => item.id == diagnosis_id);
      var diagnosis_name
      if (localIdentify) {
        diagnosis_name = localIdentify.name;
        this.diagnosis_id = localIdentify.id;
      } else {
        diagnosis_name = null;
      }
    } else {
      diagnosis_name = null;
    }
    return diagnosis_name;
  }

  onChange() {
    this.form.get('skin_status_id1').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show1 = false;
        this.form.controls.exudate1.clearValidators();
        this.form.controls.concentrated1.clearValidators();
        this.form.controls.observation1.clearValidators();
        this.form.controls.infection_sign1.clearValidators();
        this.form.controls.surrounding_skin1.clearValidators();
        this.form.controls.exudate1.setErrors(null);
        this.form.controls.concentrated1.setErrors(null);
        this.form.controls.observation1.setErrors(null);
        this.form.controls.infection_sign1.setErrors(null);
        this.form.controls.surrounding_skin1.setErrors(null);
        this.form.patchValue({
          pressure_ulcers1: false,
          exudate1: '',
          concentrated1: '',
          infection_sign1: '',
          surrounding_skin1: '',
          observation1: '',
        });
      } else {
        this.show1 = true;
        this.form.controls.exudate1.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated1.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation1.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign1.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin1.setValidators(Validators.compose([Validators.required]));
      }
    });

    this.form.get('skin_status_id2').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show2 = false;
        this.form.controls.exudate2.clearValidators();
        this.form.controls.concentrated2.clearValidators();
        this.form.controls.observation2.clearValidators();
        this.form.controls.infection_sign2.clearValidators();
        this.form.controls.surrounding_skin2.clearValidators();
        this.form.controls.exudate2.setErrors(null);
        this.form.controls.concentrated2.setErrors(null);
        this.form.controls.observation2.setErrors(null);
        this.form.controls.infection_sign2.setErrors(null);
        this.form.controls.surrounding_skin2.setErrors(null);
        this.form.patchValue({
          pressure_ulcers2: false,
          exudate2: '',
          concentrated2: '',
          infection_sign2: '',
          surrounding_skin2: '',
          observation2: '',
        });
      } else {
        this.show2 = true;
        this.form.controls.exudate2.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated2.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation2.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign2.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin2.setValidators(Validators.compose([Validators.required]));
      }
    });
    this.form.get('skin_status_id3').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show3 = false;
        this.form.controls.exudate3.clearValidators();
        this.form.controls.concentrated3.clearValidators();
        this.form.controls.observation3.clearValidators();
        this.form.controls.infection_sign3.clearValidators();
        this.form.controls.surrounding_skin3.clearValidators();
        this.form.controls.exudate3.setErrors(null);
        this.form.controls.concentrated3.setErrors(null);
        this.form.controls.observation3.setErrors(null);
        this.form.controls.infection_sign3.setErrors(null);
        this.form.controls.surrounding_skin3.setErrors(null);
        this.form.patchValue({
          pressure_ulcers3: false,
          exudate3: '',
          concentrated3: '',
          infection_sign3: '',
          surrounding_skin3: '',
          observation3: '',
        });
      } else {
        this.show3 = true;
        this.form.controls.exudate3.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated3.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation3.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign3.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin3.setValidators(Validators.compose([Validators.required]));
      }
    });
    this.form.get('skin_status_id4').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show4 = false;
        this.form.controls.exudate4.clearValidators();
        this.form.controls.concentrated4.clearValidators();
        this.form.controls.observation4.clearValidators();
        this.form.controls.infection_sign4.clearValidators();
        this.form.controls.surrounding_skin4.clearValidators();
        this.form.controls.exudate4.setErrors(null);
        this.form.controls.concentrated4.setErrors(null);
        this.form.controls.observation4.setErrors(null);
        this.form.controls.infection_sign4.setErrors(null);
        this.form.controls.surrounding_skin4.setErrors(null);
        this.form.patchValue({
          pressure_ulcers4: false,
          exudate4: '',
          concentrated4: '',
          infection_sign4: '',
          surrounding_skin4: '',
          observation4: '',
        });
      } else {
        this.show4 = true;
        this.form.controls.exudate4.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated4.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation4.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign4.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin4.setValidators(Validators.compose([Validators.required]));
      }
    });
    this.form.get('skin_status_id5').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show5 = false;
        this.form.controls.exudate5.clearValidators();
        this.form.controls.concentrated5.clearValidators();
        this.form.controls.observation5.clearValidators();
        this.form.controls.infection_sign5.clearValidators();
        this.form.controls.surrounding_skin5.clearValidators();
        this.form.controls.exudate5.setErrors(null);
        this.form.controls.concentrated5.setErrors(null);
        this.form.controls.observation5.setErrors(null);
        this.form.controls.infection_sign5.setErrors(null);
        this.form.controls.surrounding_skin5.setErrors(null);
        this.form.patchValue({
          pressure_ulcers5: false,
          exudate5: '',
          concentrated5: '',
          infection_sign5: '',
          surrounding_skin5: '',
          observation5: '',
        });
      } else {
        this.show5 = true;
        this.form.controls.exudate5.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated5.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation5.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign5.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin5.setValidators(Validators.compose([Validators.required]));
      }
    });
    this.form.get('skin_status_id6').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show6 = false;
        this.form.controls.exudate6.clearValidators();
        this.form.controls.concentrated6.clearValidators();
        this.form.controls.observation6.clearValidators();
        this.form.controls.infection_sign6.clearValidators();
        this.form.controls.surrounding_skin6.clearValidators();
        this.form.controls.exudate6.setErrors(null);
        this.form.controls.concentrated6.setErrors(null);
        this.form.controls.observation6.setErrors(null);
        this.form.controls.infection_sign6.setErrors(null);
        this.form.controls.surrounding_skin6.setErrors(null);
        this.form.patchValue({
          pressure_ulcers6: false,
          exudate6: '',
          concentrated6: '',
          infection_sign6: '',
          surrounding_skin6: '',
          observation6: '',
        });
      } else {
        this.show6 = true;
        this.form.controls.exudate6.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated6.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation6.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign6.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin6.setValidators(Validators.compose([Validators.required]));
      }
    });
    this.form.get('skin_status_id7').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show7 = false;
        this.form.controls.exudate7.clearValidators();
        this.form.controls.concentrated7.clearValidators();
        this.form.controls.observation7.clearValidators();
        this.form.controls.infection_sign7.clearValidators();
        this.form.controls.surrounding_skin7.clearValidators();
        this.form.controls.exudate7.setErrors(null);
        this.form.controls.concentrated7.setErrors(null);
        this.form.controls.observation7.setErrors(null);
        this.form.controls.infection_sign7.setErrors(null);
        this.form.controls.surrounding_skin7.setErrors(null);
        this.form.patchValue({
          pressure_ulcers7: false,
          exudate7: '',
          concentrated7: '',
          infection_sign7: '',
          surrounding_skin7: '',
          observation7: '',
        });
      } else {
        this.show7 = true;
        this.form.controls.exudate7.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated7.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation7.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign7.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin7.setValidators(Validators.compose([Validators.required]));
      }
    }); true
    this.form.get('skin_status_id8').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show8 = false;
        this.form.controls.exudate8.clearValidators();
        this.form.controls.concentrated8.clearValidators();
        this.form.controls.observation8.clearValidators();
        this.form.controls.infection_sign8.clearValidators();
        this.form.controls.surrounding_skin8.clearValidators();
        this.form.controls.exudate8.setErrors(null);
        this.form.controls.concentrated8.setErrors(null);
        this.form.controls.observation8.setErrors(null);
        this.form.controls.infection_sign8.setErrors(null);
        this.form.controls.surrounding_skin8.setErrors(null);
        this.form.patchValue({
          pressure_ulcers8: false,
          exudate8: '',
          concentrated8: '',
          infection_sign8: '',
          surrounding_skin8: '',
          observation8: '',
        });
      } else {
        this.show8 = true;
        this.form.controls.exudate8.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated8.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation8.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign8.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin8.setValidators(Validators.compose([Validators.required]));
      }
    });
    this.form.get('skin_status_id9').valueChanges.subscribe(val => {
      if (val == '' || val == 1) {
        this.show9 = false;
        this.form.controls.exudate9.clearValidators();
        this.form.controls.concentrated9.clearValidators();
        this.form.controls.observation9.clearValidators();
        this.form.controls.infection_sign9.clearValidators();
        this.form.controls.surrounding_skin9.clearValidators();
        this.form.controls.exudate9.setErrors(null);
        this.form.controls.concentrated9.setErrors(null);
        this.form.controls.observation9.setErrors(null);
        this.form.controls.infection_sign9.setErrors(null);
        this.form.controls.surrounding_skin9.setErrors(null);
        this.form.patchValue({
          pressure_ulcers9: false,
          exudate9: '',
          concentrated9: '',
          infection_sign9: '',
          surrounding_skin9: '',
          observation9: '',
        });
      } else {
        this.show9 = true;
        this.form.controls.exudate9.setValidators(Validators.compose([Validators.required]));
        this.form.controls.concentrated9.setValidators(Validators.compose([Validators.required]));
        this.form.controls.observation9.setValidators(Validators.compose([Validators.required]));
        this.form.controls.infection_sign9.setValidators(Validators.compose([Validators.required]));
        this.form.controls.surrounding_skin9.setValidators(Validators.compose([Validators.required]));
      }
    });
  }

  saveCode(e): void {
    if (this.diagnosis) {
      var localidentify = this.diagnosis.find(item => item.name == e);
  
      if (localidentify) {
        this.diagnosis_id = localidentify.id;
      } else {
        this.diagnosis_id = null;
        this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
        this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
      }
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.instanceArray()
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.chSkinValorationS.Update({
          id: this.data.id,
          diagnosis_id: this.diagnosis_id,
          body_region_id: this.form.controls.body_region_id.value,
          skin_status_id: this.form.controls.skin_status_id.value,
          exudate: this.form.controls.exudate.value,
          concentrated: this.form.controls.concentrated.value,
          infection_sign: this.form.controls.infection_sign.value,
          surrounding_skin: this.form.controls.surrounding_skin.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then((x) => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        var contador = 0
        var err = 0;
        this.sendArray.forEach(element => {
          this.chSkinValorationS.Save({
            diagnosis_id: element.diagnosis_id,
            body_region_id: element.body_region,
            skin_status_id: element.skin_status,
            pressure_ulcers: element.pressure_ulcers,
            exudate: element.exudate,
            concentrated: element.concentrated,
            infection_sign: element.infection_sign,
            surrounding_skin: element.surrounding_skin,
            observation: element.observation,
            type_record_id: this.type_record_id,
            ch_record_id: this.record_id,
          }).then((x) => {
            contador++;
            this.toastService.success('', x.message);
            this.disabled = true;
            this.loading = false;
          })
            .catch((x) => {
              err++;
              this.disabled = false;
              this.loading = false;
            });
        });
        this.loading = false;
        this.messageEvent.emit(true);
      }
    }
  }

  instanceArray() {
    this.sendArray = [];
    this.sendArray = [
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 1,
        skin_status: this.form.controls.skin_status_id1.value,
        pressure_ulcers: this.form.controls.pressure_ulcers1.value,
        exudate: this.form.controls.exudate1.value,
        concentrated: this.form.controls.concentrated1.value,
        infection_sign: this.form.controls.infection_sign1.value,
        surrounding_skin: this.form.controls.surrounding_skin1.value,
        observation: this.form.controls.observation1.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 2,
        skin_status: this.form.controls.skin_status_id2.value,
        pressure_ulcers: this.form.controls.pressure_ulcers2.value,
        exudate: this.form.controls.exudate2.value,
        concentrated: this.form.controls.concentrated2.value,
        infection_sign: this.form.controls.infection_sign2.value,
        surrounding_skin: this.form.controls.surrounding_skin2.value,
        observation: this.form.controls.observation2.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 3,
        skin_status: this.form.controls.skin_status_id3.value,
        pressure_ulcers: this.form.controls.pressure_ulcers3.value,
        exudate: this.form.controls.exudate3.value,
        concentrated: this.form.controls.concentrated3.value,
        infection_sign: this.form.controls.infection_sign3.value,
        surrounding_skin: this.form.controls.surrounding_skin3.value,
        observation: this.form.controls.observation3.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 4,
        skin_status: this.form.controls.skin_status_id4.value,
        pressure_ulcers: this.form.controls.pressure_ulcers4.value,
        exudate: this.form.controls.exudate4.value,
        concentrated: this.form.controls.concentrated4.value,
        infection_sign: this.form.controls.infection_sign4.value,
        surrounding_skin: this.form.controls.surrounding_skin4.value,
        observation: this.form.controls.observation4.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 5,
        skin_status: this.form.controls.skin_status_id5.value,
        pressure_ulcers: this.form.controls.pressure_ulcers5.value,
        exudate: this.form.controls.exudate5.value,
        concentrated: this.form.controls.concentrated5.value,
        infection_sign: this.form.controls.infection_sign5.value,
        surrounding_skin: this.form.controls.surrounding_skin5.value,
        observation: this.form.controls.observation5.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 6,
        skin_status: this.form.controls.skin_status_id6.value,
        pressure_ulcers: this.form.controls.pressure_ulcers6.value,
        exudate: this.form.controls.exudate6.value,
        concentrated: this.form.controls.concentrated6.value,
        infection_sign: this.form.controls.infection_sign6.value,
        surrounding_skin: this.form.controls.surrounding_skin6.value,
        observation: this.form.controls.observation6.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 7,
        skin_status: this.form.controls.skin_status_id7.value,
        pressure_ulcers: this.form.controls.pressure_ulcers7.value,
        exudate: this.form.controls.exudate7.value,
        concentrated: this.form.controls.concentrated7.value,
        infection_sign: this.form.controls.infection_sign7.value,
        surrounding_skin: this.form.controls.surrounding_skin7.value,
        observation: this.form.controls.observation7.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 8,
        skin_status: this.form.controls.skin_status_id8.value,
        pressure_ulcers: this.form.controls.pressure_ulcers8.value,
        exudate: this.form.controls.exudate8.value,
        concentrated: this.form.controls.concentrated8.value,
        infection_sign: this.form.controls.infection_sign8.value,
        surrounding_skin: this.form.controls.surrounding_skin8.value,
        observation: this.form.controls.observation8.value,
      },
      {
        diagnosis_id: this.diagnosis_id,
        body_region: 9,
        skin_status: this.form.controls.skin_status_id9.value,
        pressure_ulcers: this.form.controls.pressure_ulcers9.value,
        exudate: this.form.controls.exudate9.value,
        concentrated: this.form.controls.concentrated9.value,
        infection_sign: this.form.controls.infection_sign9.value,
        surrounding_skin: this.form.controls.surrounding_skin9.value,
        observation: this.form.controls.observation9.value,
      },
    ];

  }

}
