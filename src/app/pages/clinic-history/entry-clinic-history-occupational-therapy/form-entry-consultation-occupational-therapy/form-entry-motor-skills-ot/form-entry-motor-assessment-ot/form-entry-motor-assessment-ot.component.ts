import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChExternalCauseService } from '../../../../../../business-controller/ch-external-cause.service';





@Component({
  selector: 'ngx-form-entry-motor-assessment-ot',
  templateUrl: './form-entry-motor-assessment-ot.component.html',
  styleUrls: ['./form-entry-motor-assessment-ot.component.scss']
})
export class FormEntryAssessmentOTComponent implements OnInit {

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
  public ch_external_cause: any[];
 
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
    private chexternalcauseS: ChExternalCauseService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data || this.data.length == 0) {
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

        occupational_con:  '',

      };
    }

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

      occupational_con: [this.data[0] ? this.data[0].occupational_con : this.data.occupational_con, Validators.compose([Validators.required])],

    });

    this.chexternalcauseS.GetCollection({ status_id: 1 }).then(x => {
      this.ch_external_cause = x;
    });
    // if (this.data.reason_consultation != '') {
    //   this.form.controls.reason_consultation.disable();
    //   this.form.controls.current_illness.disable();
    //   this.form.controls.ch_external_cause_id.disable();
    //   this.disabled = true;
    // } else {
    //   this.form.controls.reason_consultation.enable();
    //   this.form.controls.current_illness.enable();
    //   this.form.controls.ch_external_cause_id.enable();
    //   this.disabled = false;
    // }
  }

  async save() {

  }

  checked = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

}


