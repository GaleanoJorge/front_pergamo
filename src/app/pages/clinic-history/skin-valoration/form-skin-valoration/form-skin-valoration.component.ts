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
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public ch_reason_id: any[];
  public diagnosis: any[] = [];
  public diagnosis_id: any;
  public previewFile = null;

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
        body_region_id: '',
        skin_status_id: '',
        // lower_limbs: '',
        // feet: '',
        // dorsal_region: '',
        // gluteal_region: '',
        // lumbar_region: '',
        // sacrum_region: '',
        // trochanteric_region: '',
        exudate: '',
        concentrated: '',
        infection_sign: '',
        surrounding_skin: '',
        observation: '',
      };
    }



    this.form = this.formBuilder.group({
      diagnosis_id: [
        this.data.diagnosis_id,
        Validators.compose([Validators.required]),
      ],
      body_region_id: [
        this.data.body_region_id,
        Validators.compose([Validators.required]),
      ],
      skin_status_id: [
        this.data.skin_status_id,
        Validators.compose([Validators.required]),
      ],
      // lower_limbs: [
      //   this.data.lower_limbs,
      //   Validators.compose([Validators.required]),
      // ],
      // feet: [
      //   this.data.feet,
      //   Validators.compose([Validators.required]),
      // ],
      // dorsal_region: [
      //   this.data.dorsal_region,
      //   Validators.compose([Validators.required]),
      // ],
      // gluteal_region: [
      //   this.data.gluteal_region,
      //   Validators.compose([Validators.required]),
      // ],
      // lumbar_region: [
      //   this.data.lumbar_region,
      //   Validators.compose([Validators.required]),
      // ],
      // sacrum_region: [
      //   this.data.sacrum_region,
      //   Validators.compose([Validators.required]),
      // ],
      // trochanteric_region: [
      //   this.data.trochanteric_region,
      //   Validators.compose([Validators.required]),
      // ],
      exudate: [
        this.data.exudate,
        Validators.compose([Validators.required]),
      ],
      concentrated: [
        this.data.concentrated,
        // Validators.compose([Validators.required]),
      ],
      observation: [
        this.data.observation,
        // Validators.compose([Validators.required]),
      ],
      infection_sign: [
        this.data.infection_sign,
        // Validators.compose([Validators.required]),
      ],
      surrounding_skin: [
        this.data.surrounding_skin,
        // Validators.compose([Validators.required]),
      ],

    });


    this.ChReasonS.GetCollection().then((x) => {
      this.ch_reason_id = x;
    });

    await this.DiagnosisS.GetCollection().then(x => {
      this.diagnosis = x;
    });

    this.skinStatusS.GetCollection().then(x => {
      this.skin_status = x;
    });

    this.bodyRegionS.GetCollection().then(x => {
      this.body_region = x;
    });


  }

  saveCode(e): void {
    var localidentify = this.diagnosis.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
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
          type_record_id: 7,
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
        await this.chSkinValorationS.Save({
          diagnosis_id: this.diagnosis_id,
          body_region_id: this.form.controls.body_region_id.value,
          skin_status_id: this.form.controls.skin_status_id.value,
          exudate: this.form.controls.exudate.value,
          concentrated: this.form.controls.concentrated.value,
          infection_sign: this.form.controls.infection_sign.value,
          surrounding_skin: this.form.controls.surrounding_skin.value,
          observation: this.form.controls.observation.value,
          type_record_id: 7,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({
              diagnosis_id: '',
              body_region_id: '',
              skin_status_id: '',
              exudate: '',
              concentrated: '',
              infection_sign: '',
              surrounding_skin: '',
              observation: '',
            });
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      }
    }
  }


}
