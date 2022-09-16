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
      description: "Fortalecer musculatura respiratoria para mejorar niveles de oxigenación"
    },
    {
      id: 2,
      description: "Promover y vigilar decanulación traqueal"
    },
    {
      id: 3,
      description: "Titulacion de flujo de oxigenoterapia en cumplimiento a metas de oximetrias"
    },
    {
      id: 4,
      description: "Mejorar/mantener cualidades fisicas de musculatura respiratoria"
    },
    {
      id: 5,
      description: "Reeducacion de patron ventilatorio"
    },
    {
      id: 6,
      description: "Mantener/ reeducar cinetica diafragmatica y costal"
    },
    {
      id: 7,
      description: "Controlar la hiperventilacion y fatiga muscular"
    },
    {
      id: 8,
      description: "Entrenar uso de inhaloterapia / farmacoterapia de acuerdo a prescripción medica"
    },
    {
      id: 9,
      description: "Titular parametros ventilatorios en relación a dinamica ventilatoria"
    },
    {
      id: 10,
      description: "Vigilar presencia de signos de dificultad respiratoria"
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

        occupational_con:  '',
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
      occupational_con: [this.data.occupational_con, Validators.compose([Validators.required])],
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
          occupational_con: this.form.controls.occupational_con.value,
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
          this.form.patchValue({occupational_con:'',  check1_hold:'', check2_improve:'', check3_structure:'', check4_promote:'',
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
          occupational_con: this.form.controls.occupational_con.value,
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
          this.form.patchValue({occupational_con:'',  check1_hold:'', check2_improve:'', check3_structure:'', check4_promote:'',
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

