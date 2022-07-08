import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ChFormulationService } from '../../../../business-controller/ch-formulation.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';
import { ProductGenericService } from '../../../../business-controller/product-generic.service';
import { AdministrationRouteService } from '../../../../business-controller/administration-route.service';
import { HourlyFrequencyService } from '../../../../business-controller/hourly-frequency.service';
import { ManagementPlanService } from '../../../../business-controller/management-plan.service';
import { ServicesBriefcaseService } from '../../../../business-controller/services-briefcase.service';
import { PatientService } from '../../../../business-controller/patient.service';
import { ProductDoseService } from '../../../../business-controller/product_dose.service';
import { NursingCarePlanService } from '../../../../business-controller/nursing-care-plan.service';
import { even } from '@rxweb/reactive-form-validators';
import { ChCarePlanService } from '../../../../business-controller/ch-care-plan.service';

@Component({
  selector: 'ngx-form-care-plan',
  templateUrl: './form-care-plan.component.html',
  styleUrls: ['./form-care-plan.component.scss'],
})
export class FormCarePlanComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() user: any = null;
  @Input() record_id;
  @Input() type_record_id: any = null;

  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public admissions_id;
  public management_plan_id: any[];
  public administration_route_id: any[];


  public hourly_frequency_id: any[];
  public dose;
  public treatment_days;
  public currency: any;
  public outpatient_formulation;
  public product_gen: any[];
  public product_id;
  public care_plans_ids: any[] = [];
  public localidentify;
  public user2;
  public show = true;

  public nursing_care_plans: any[] = [];

  public arrayCarePlans = [
    {
      id: 1,
      description: "Acompañar Paciente el baño"
    },
    {
      id: 2,
      description: "Asistencia a terapias de rehabilitación"
    },
    {
      id: 3,
      description: "Cambio de posición cada hora"
    },
    {
      id: 4,
      description: "Cateterismos Vesicales según orden médica "
    },
    {
      id: 5,
      description: "Cambio de fijación de sonda"
    },
    {
      id: 6,
      description: "Control de temperatura"
    },
    {
      id: 7,
      description: "Control de líquidos Administrados y eliminados"
    },
    {
      id: 8,
      description: "Curación o cambio de venopunción "
    },
    {
      id: 9,
      description: "Dieta asistida"
    },
    {
      id: 10,
      description: "Deambulación asistida"
    },
    {
      id: 11,
      description: "Mantener barandas elevadas"
    },
    {
      id: 12,
      description: "Mantener inmovilizado según orden medica"
    },
    {
      id: 13,
      description: "Mantener escucha activa"
    },
    {
      id: 14,
      description: "Mantener el espacio libre de obstáculos y en orden"
    },
    {
      id: 15,
      description: "Mantener timbre cerca"
    },
    {
      id: 16,
      description: "Proveer cuidado directo durante el baño"
    },
    {
      id: 17,
      description: "Reposo en cama"
    },
    {
      id: 18,
      description: "Retirar objetos que puedan causar lesion"
    },
    {
      id: 19,
      description: "Ronda de enfermeria continua por riesgo de lesion"
    },
    {
      id: 20,
      description: "Valorar aparición de edema"
    },
    {
      id: 21,
      description: "Valorar conductas"
    },
    {
      id: 22,
      description: "Valorar cambios de comportamiento"
    },
    {
      id: 23,
      description: "Valoración y control de signos vitales"
    },
    {
      id: 24,
      description: "Valorar el cuidado de la Piel"
    },
    {
      id: 25,
      description: "Valoración de escala del dolor"
    },
    {
      id: 26,
      description: "Valoracion de sujeccion con riesgo de lesion"
    },
    {
      id: 27,
      description: "Valoración Patrón de eliminación"
    },
    {
      id: 28,
      description: "Valorar patrón respiratorio"
    },
    {
      id: 29,
      description: "Valoracion de sujeccion con riesgo de lesion"
    },
    {
      id: 30,
      description: "Vigilar zonas de flebitis"
    },
    {
      id: 31,
      description: "Valoracion de agitacion spicomotora"
    },
    {
      id: 32,
      description: "Valoración de aspecto de la orina"
    }

  ]


  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    // private ProductGenericS: ProductGenericService,
    // private NursingCarePlanS: NursingCarePlanService,
    // private AdministrationRouteS: AdministrationRouteService,
    // private HourlyFrequencyS: HourlyFrequencyService,
    private ChFormulationS: ChFormulationService,
    private route: ActivatedRoute,
    private carePlanS: ChCarePlanService,
    // private ManagementPlanS: ManagementPlanService,
    // private servicesBriefcaseS: ServicesBriefcaseService,
    // private patienBS: PatientService,
    // private ProductGS: ProductGenericService,
    // private ProductDoseS: ProductDoseService
  ) {
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = {
        check1: '',
        check2: '',
        check3: '',
        check4: '',
        check5: '',
        check6: '',
        check7: '',
        check8: '',
        check9: '',
        check10: '',
        check11: '',
        check12: '',
        check13: '',
        check14: '',
        check15: '',
        check16: '',
        check17: '',
        check18: '',
        check19: '',
        check20: '',
        check21: '',
        check22: '',
        check23: '',
        check24: '',
        check25: '',
        check26: '',
        check27: '',
        check28: '',
        check29: '',
        check30: '',
        check31: '',
        check32: '',
      };
    };


    // this.NursingCarePlanS.GetCollection().then(x => {
    //   this.nursing_care_plans = x;
    // });


    this.form = this.formBuilder.group({
      //product_id: [this.data.product_id,],
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
      check11: [
        this.data.check11,
      ],
      check12: [
        this.data.check12,
      ],
      check13: [
        this.data.check13,
      ],
      check14: [
        this.data.check14,
      ],
      check15: [
        this.data.check15,
      ],
      check16: [
        this.data.check16,
      ],
      check17: [
        this.data.check17,
      ],
      check18: [
        this.data.check18,
      ],
      check19: [
        this.data.check19,
      ],
      check20: [
        this.data.check20,
      ],
      check21: [
        this.data.check21,
      ],
      check22: [
        this.data.check22,
      ],
      check23: [
        this.data.check23,
      ],
      check24: [
        this.data.check24,
      ],
      check25: [
        this.data.check25,
      ],
      check26: [
        this.data.check26,
      ],
      check27: [
        this.data.check27,
      ],
      check28: [
        this.data.check28,
      ],
      check29: [
        this.data.check29,
      ],
      check30: [
        this.data.check30,
      ],
      check31: [
        this.data.check31,
      ],
      check32: [
        this.data.check32,
      ],
    });
    // this.onChanges();

  }

  saveCode(event, identificator) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.care_plans_ids.push(identificator);
    } else {
      // this.care_plans_ids.indexOf(identificator);
      this.care_plans_ids = this.care_plans_ids.filter((item) => item != identificator)
    }
  }

  async save() {
    this.isSubmitted = true;
    if (this.care_plans_ids.length == 0) {
      this.form.setErrors({ 'incorrect': true });
      this.toastService.warning('error', 'Debe seleccionar al menos un plan de cuidados');
    }
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.carePlanS.Update({
          id: this.data.id,
          care_plans: JSON.stringify(this.care_plans_ids),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch(x => {
            this.isSubmitted = false;
            this.loading = false;
          });

      } else {
        await this.carePlanS.Save({
          care_plans: JSON.stringify(this.care_plans_ids),
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then((x) => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            check1: '',
            check2: '',
            check3: '',
            check4: '',
            check5: '',
            check6: '',
            check7: '',
            check8: '',
            check9: '',
            check10: '',
            check11: '',
            check12: '',
            check13: '',
            check14: '',
            check15: '',
            check16: '',
            check17: '',
            check18: '',
            check19: '',
            check20: '',
            check21: '',
            check22: '',
            check23: '',
            check24: '',
            check25: '',
            check26: '',
            check27: '',
            check28: '',
            check29: '',
            check30: '',
            check31: '',
            check32: '',
          });
          this.care_plans_ids = [];
          if (this.saved) {
            this.saved();
          }
          this.isSubmitted = false;
          this.loading = false;
        })
          .catch((x) => {
          });
      }
    }

  }

  // onChanges() {
  //   this.form.get('check1').valueChanges.subscribe(val => {
  //     console.log(val)
  //   });
  // }

}
