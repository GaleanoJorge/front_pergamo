import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChNRMaterialsFTService } from '../../../../../../business-controller/ch_n_r_materials_f_t.service';

@Component({
  selector: 'ngx-nr-metarials-ft',
  templateUrl: './nr-metarials-ft.component.html',
  styleUrls: ['./nr-metarials-ft.component.scss']
})
export class FormNRMaterialsFTComponent implements OnInit {

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
      description: "TENS"
    },
    {
      id: 2,
      description: "EMS"
    },
    {
      id: 3,
      description: "ULTRASONIDO"
    },
    {
      id: 4,
      description: "VIBROMASAJEADOR"
    },
    {
      id: 5,
      description: "MASAJEADOR FACIAL"
    },
    {
      id: 6,
      description: "THERABAND VERDE"
    },
    {
      id: 7,
      description: "THERABAND ROJO"
    },
    {
      id: 8,
      description: "THERABAND AMARILLO"
    },
    {
      id: 9,
      description: "PELOTA"
    },
    {
      id: 10,
      description: "BALON BOBATH"
    },
    {
      id: 11,
      description: "POLEA DE HOMBRO"
    },
    {
      id: 12,
      description: "RUEDA DE HOMBRO"
    },
    {
      id: 13,
      description: "PELOTA DE MANO"
    },
    {
      id: 14,
      description: "PLASTILINA TERAPEUTICA"
    },
    {
      id: 15,
      description: "ROLLOS TERAPEUTICOS"
    },
    {
      id: 16,
      description: "MANCUERNAS"
    },
    {
      id: 17,
      description: "PESAS GRADUABLES"
    },
    {
      id: 18,
      description: "PARAFINA TERAPEUTICA"
    },
    {
      id: 19,
      description: "DIGIFLEZ"
    },
    {
      id: 20,
      description: "MAYA DE THERABAND"
    },
    {
      id: 21,
      description: "BOSU"
    },
    {
      id: 22,
      description: "BALANCIN"
    },
    {
      id: 23,
      description: "ESCALERILLA DE DEDOS"
    },
    {
      id: 24,
      description: "CICLOERGOMETRO"
    },
    {
      id: 25,
      description: "BARRAS PARALELAS"
    },
    {
      id: 26,
      description: "ESCALERA CON RAMPA"
    },
    {
      id: 27,
      description: "TRACCION CERVICAL"
    },
    {
      id: 28,
      description: "PAQUETE CALIENTE"
    },
    {
      id: 29,
      description: "PAQUETE FRIO"
    },

  ]

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChNRMaterialsFTService: ChNRMaterialsFTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        Material_1: false,
        Material_2: false,
        Material_3: false,
        Material_4: false,
        Material_5: false,
        Material_6: false,
        Material_7: false,
        Material_8: false,
        Material_9: false,
        Material_10: false,
        Material_11: false,
        Material_12: false,
        Material_13: false,
        Material_14: false,
        Material_15: false,
        Material_16: false,
        Material_17: false,
        Material_18: false,
        Material_19: false,
        Material_20: false,
        Material_21: false,
        Material_22: false,
        Material_23: false,
        Material_24: false,
        Material_25: false,
        Material_26: false,
        Material_27: false,
        Material_28: false,
        Material_29: false,
      };
    }
    this.form = this.formBuilder.group({
      

      Material_1: [this.data[0] ? this.data[0].Material_1 : this.data.Material_1, Validators.compose([Validators.required])],
      Material_2: [this.data[0] ? this.data[0].Material_2 : this.data.Material_2, Validators.compose([Validators.required])],
      Material_3: [this.data[0] ? this.data[0].Material_3 : this.data.Material_3, Validators.compose([Validators.required])],
      Material_4: [this.data[0] ? this.data[0].Material_4 : this.data.Material_4, Validators.compose([Validators.required])],
      Material_5: [this.data[0] ? this.data[0].Material_5 : this.data.Material_5, Validators.compose([Validators.required])],
      Material_6: [this.data[0] ? this.data[0].Material_6 : this.data.Material_6, Validators.compose([Validators.required])],
      Material_7: [this.data[0] ? this.data[0].Material_7 : this.data.Material_7, Validators.compose([Validators.required])],
      Material_8: [this.data[0] ? this.data[0].Material_8 : this.data.Material_8, Validators.compose([Validators.required])],
      Material_9: [this.data[0] ? this.data[0].Material_9 : this.data.Material_9, Validators.compose([Validators.required])],
      Material_10: [this.data[0] ? this.data[0].Material_10 : this.data.Material_10, Validators.compose([Validators.required])],
      Material_11: [this.data[0] ? this.data[0].Material_11 : this.data.Material_11, Validators.compose([Validators.required])],
      Material_12: [this.data[0] ? this.data[0].Material_12 : this.data.Material_12, Validators.compose([Validators.required])],
      Material_13: [this.data[0] ? this.data[0].Material_13 : this.data.Material_13, Validators.compose([Validators.required])],
      Material_14: [this.data[0] ? this.data[0].Material_14 : this.data.Material_14, Validators.compose([Validators.required])],
      Material_15: [this.data[0] ? this.data[0].Material_15 : this.data.Material_15, Validators.compose([Validators.required])],
      Material_16: [this.data[0] ? this.data[0].Material_16 : this.data.Material_16, Validators.compose([Validators.required])],
      Material_17: [this.data[0] ? this.data[0].Material_17 : this.data.Material_17, Validators.compose([Validators.required])],
      Material_18: [this.data[0] ? this.data[0].Material_18 : this.data.Material_18, Validators.compose([Validators.required])],
      Material_19: [this.data[0] ? this.data[0].Material_19 : this.data.Material_19, Validators.compose([Validators.required])],
      Material_20: [this.data[0] ? this.data[0].Material_20 : this.data.Material_20, Validators.compose([Validators.required])],
      Material_21: [this.data[0] ? this.data[0].Material_21 : this.data.Material_21, Validators.compose([Validators.required])],
      Material_22: [this.data[0] ? this.data[0].Material_22 : this.data.Material_22, Validators.compose([Validators.required])],
      Material_23: [this.data[0] ? this.data[0].Material_23 : this.data.Material_23, Validators.compose([Validators.required])],
      Material_24: [this.data[0] ? this.data[0].Material_24 : this.data.Material_24, Validators.compose([Validators.required])],
      Material_25: [this.data[0] ? this.data[0].Material_25 : this.data.Material_25, Validators.compose([Validators.required])],
      Material_26: [this.data[0] ? this.data[0].Material_26 : this.data.Material_26, Validators.compose([Validators.required])],
      Material_27: [this.data[0] ? this.data[0].Material_27 : this.data.Material_27, Validators.compose([Validators.required])],
      Material_28: [this.data[0] ? this.data[0].Material_28 : this.data.Material_28, Validators.compose([Validators.required])],
      Material_29: [this.data[0] ? this.data[0].Material_29 : this.data.Material_29, Validators.compose([Validators.required])],



    });

    this.form = this.formBuilder.group({
      Material_1: [
        this.data.Material_1,
      ],
      Material_2: [
        this.data.Material_2,
      ],
      Material_3: [
        this.data.Material_3,
      ],
      Material_4: [
        this.data.Material_4,
      ],
      Material_5: [
        this.data.Material_5,
      ],
      Material_6: [
        this.data.Material_6,
      ],
      Material_7: [
        this.data.Material_7,
      ],
      Material_8: [
        this.data.Material_8,
      ],
      Material_9: [
        this.data.Material_9,
      ],
      Material_10: [
        this.data.Material_10,
      ],
      Material_11: [
        this.data.Material_11,
      ],
      Material_12: [
        this.data.Material_12,
      ],
      Material_13: [
        this.data.Material_13,
      ],
      Material_14: [
        this.data.Material_14,
      ],
      Material_15: [
        this.data.Material_15,
      ],
      Material_16: [
        this.data.Material_16,
      ],
      Material_17: [
        this.data.Material_17,
      ],
      Material_18: [
        this.data.Material_18,
      ],
      Material_19: [
        this.data.Material_19,
      ],
      Material_20: [
        this.data.Material_20,
      ],
      Material_21: [
        this.data.Material_21,
      ],
      Material_22: [
        this.data.Material_22,
      ],
      Material_23: [
        this.data.Material_23,
      ],
      Material_24: [
        this.data.Material_24,
      ],
      Material_25: [
        this.data.Material_25,
      ],
      Material_26: [
        this.data.Material_26,
      ],
      Material_27: [
        this.data.Material_27,
      ],
      Material_28: [
        this.data.Material_28,
      ],
      Material_29: [
        this.data.Material_29,
      ],

    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      if (this.data.id) {
          this.ChNRMaterialsFTService.Update({
          id: this.data.id,

          Material_1: this.form.controls.Material_1.value ? this.arrayObjectives[0].description : null,
          Material_2: this.form.controls.Material_2.value ? this.arrayObjectives[1].description : null,
          Material_3: this.form.controls.Material_3.value ? this.arrayObjectives[2].description : null,
          Material_4: this.form.controls.Material_4.value ? this.arrayObjectives[3].description : null,
          Material_5: this.form.controls.Material_5.value ? this.arrayObjectives[4].description : null,
          Material_6: this.form.controls.Material_6.value ? this.arrayObjectives[5].description : null,
          Material_7: this.form.controls.Material_7.value ? this.arrayObjectives[6].description : null,
          Material_8: this.form.controls.Material_8.value ? this.arrayObjectives[7].description : null,
          Material_9: this.form.controls.Material_9.value ? this.arrayObjectives[8].description : null,
          Material_10: this.form.controls.Material_10.value ? this.arrayObjectives[9].description : null,
          Material_11: this.form.controls.Material_11.value ? this.arrayObjectives[0].description : null,
          Material_12: this.form.controls.Material_12.value ? this.arrayObjectives[1].description : null,
          Material_13: this.form.controls.Material_13.value ? this.arrayObjectives[2].description : null,
          Material_14: this.form.controls.Material_14.value ? this.arrayObjectives[3].description : null,
          Material_15: this.form.controls.Material_15.value ? this.arrayObjectives[4].description : null,
          Material_16: this.form.controls.Material_16.value ? this.arrayObjectives[5].description : null,
          Material_17: this.form.controls.Material_17.value ? this.arrayObjectives[6].description : null,
          Material_18: this.form.controls.Material_18.value ? this.arrayObjectives[7].description : null,
          Material_19: this.form.controls.Material_19.value ? this.arrayObjectives[8].description : null,
          Material_20: this.form.controls.Material_20.value ? this.arrayObjectives[9].description : null,
          Material_21: this.form.controls.Material_21.value ? this.arrayObjectives[0].description : null,
          Material_22: this.form.controls.Material_22.value ? this.arrayObjectives[1].description : null,
          Material_23: this.form.controls.Material_23.value ? this.arrayObjectives[2].description : null,
          Material_24: this.form.controls.Material_24.value ? this.arrayObjectives[3].description : null,
          Material_25: this.form.controls.Material_25.value ? this.arrayObjectives[4].description : null,
          Material_26: this.form.controls.Material_26.value ? this.arrayObjectives[5].description : null,
          Material_27: this.form.controls.Material_27.value ? this.arrayObjectives[6].description : null,
          Material_28: this.form.controls.Material_28.value ? this.arrayObjectives[7].description : null,
          Material_29: this.form.controls.Material_29.value ? this.arrayObjectives[8].description : null,

          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({Material_1:'',  Material_2:'', Material_3:'', Material_4:'', Material_5:'',
          Material_6:'',  Material_7:'',  Material_8:'',  Material_9:'',  Material_10:'',
          Material_11:'',  Material_12:'', Material_13:'', Material_14:'', Material_15:'',
          Material_16:'',  Material_17:'',  Material_18:'',  Material_19:'',  Material_20:'',
          Material_21:'',  Material_22:'', Material_23:'', Material_24:'', Material_25:'',
          Material_26:'',  Material_27:'',  Material_28:'',  Material_29:''});
          if (this.saved) {
            this.saved();
            this.messageEvent.emit(true);
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChNRMaterialsFTService.Save({

            Material_1: this.form.controls.Material_1.value ? this.arrayObjectives[0].description : null,
            Material_2: this.form.controls.Material_2.value ? this.arrayObjectives[1].description : null,
            Material_3: this.form.controls.Material_3.value ? this.arrayObjectives[2].description : null,
            Material_4: this.form.controls.Material_4.value ? this.arrayObjectives[3].description : null,
            Material_5: this.form.controls.Material_5.value ? this.arrayObjectives[4].description : null,
            Material_6: this.form.controls.Material_6.value ? this.arrayObjectives[5].description : null,
            Material_7: this.form.controls.Material_7.value ? this.arrayObjectives[6].description : null,
            Material_8: this.form.controls.Material_8.value ? this.arrayObjectives[7].description : null,
            Material_9: this.form.controls.Material_9.value ? this.arrayObjectives[8].description : null,
            Material_10: this.form.controls.Material_10.value ? this.arrayObjectives[9].description : null,
            Material_11: this.form.controls.Material_11.value ? this.arrayObjectives[0].description : null,
            Material_12: this.form.controls.Material_12.value ? this.arrayObjectives[1].description : null,
            Material_13: this.form.controls.Material_13.value ? this.arrayObjectives[2].description : null,
            Material_14: this.form.controls.Material_14.value ? this.arrayObjectives[3].description : null,
            Material_15: this.form.controls.Material_15.value ? this.arrayObjectives[4].description : null,
            Material_16: this.form.controls.Material_16.value ? this.arrayObjectives[5].description : null,
            Material_17: this.form.controls.Material_17.value ? this.arrayObjectives[6].description : null,
            Material_18: this.form.controls.Material_18.value ? this.arrayObjectives[7].description : null,
            Material_19: this.form.controls.Material_19.value ? this.arrayObjectives[8].description : null,
            Material_20: this.form.controls.Material_20.value ? this.arrayObjectives[9].description : null,
            Material_21: this.form.controls.Material_21.value ? this.arrayObjectives[0].description : null,
            Material_22: this.form.controls.Material_22.value ? this.arrayObjectives[1].description : null,
            Material_23: this.form.controls.Material_23.value ? this.arrayObjectives[2].description : null,
            Material_24: this.form.controls.Material_24.value ? this.arrayObjectives[3].description : null,
            Material_25: this.form.controls.Material_25.value ? this.arrayObjectives[4].description : null,
            Material_26: this.form.controls.Material_26.value ? this.arrayObjectives[5].description : null,
            Material_27: this.form.controls.Material_27.value ? this.arrayObjectives[6].description : null,
            Material_28: this.form.controls.Material_28.value ? this.arrayObjectives[7].description : null,
            Material_29: this.form.controls.Material_29.value ? this.arrayObjectives[8].description : null,

          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({Material_1:'',  Material_2:'', Material_3:'', Material_4:'', Material_5:'',
          Material_6:'',  Material_7:'',  Material_8:'',  Material_9:'',  Material_10:'',
          Material_11:'',  Material_12:'', Material_13:'', Material_14:'', Material_15:'',
          Material_16:'',  Material_17:'',  Material_18:'',  Material_19:'',  Material_20:'',
          Material_21:'',  Material_22:'', Material_23:'', Material_24:'', Material_25:'',
          Material_26:'',  Material_27:'',  Material_28:'',  Material_29:''});
          if (this.saved) {
            this.messageEvent.emit(true);
            this.saved();
          }
        }).catch(x => {
        });
      }
    } else{
      this.toastService.danger('ingrese todos los campos solicitados');
    }
  }
  checked = false;
  toggle(checked: boolean) {
    this.checked = checked;
  }
}

