import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChRNMaterialsOTService } from '../../../../../../business-controller/ch_r_n_materials_o_t.service';

@Component({
  selector: 'ngx-form-r-n-materials-ot',
  templateUrl: './form-r-n-materials-ot.component.html',
  styleUrls: ['./form-r-n-materials-ot.component.scss']
})
export class FormRNMaterialsOTComponent implements OnInit {

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
      description: "Ficha cognitiva"
    },
    {
      id: 2,
      description: "Colores"
    },
    {
      id: 3,
      description: "Elementos de proteccion personal"
    },
    {
      id: 4,
      description: "Pelotas"
    },
    {
      id: 5,
      description: "Material de papeleria (marcadores, cartulina, hojas)"
    },
    {
      id: 6,
      description: "Material didactico"
    },
    {
      id: 7,
      description: "Computador"
    },
    {
      id: 8,
      description: "Plastilina"
    },
    {
      id: 9,
      description: "Arcilla"
    },
    {
      id: 10,
      description: "Vigilar presencia de signos de dificultad respiratoria"
    }

  ]

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private ChRNMaterialsOTService: ChRNMaterialsOTService,
  ) {
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = {
        check1_cognitive: false,
        check2_colors: false,
        check3_elements: false,
        check4_balls: false,
        check5_material_paper: false,
        check6_material_didactic: false,
        check7_computer: false,
        check8_clay: false,
        check9_colbon: false,
        check10_pug: false,
      };
    }

    this.form = this.formBuilder.group({
      check1_cognitive: [
        this.data.check1_cognitive,
      ],
      check2_colors: [
        this.data.check2_colors,
      ],
      check3_elements: [
        this.data.check3_elements,
      ],
      check4_balls: [
        this.data.check4_balls,
      ],
      check5_material_paper: [
        this.data.check5_material_paper,
      ],
      check6_material_didactic: [
        this.data.check6_material_didactic,
      ],
      check7_computer: [
        this.data.check7_computer,
      ],
      check8_clay: [
        this.data.check8_clay,
      ],
      check9_colbon: [
        this.data.check9_colbon,
      ],
      check10_pug: [
        this.data.check10_pug,
      ],


    });

  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      if (this.data.id) {
          this.ChRNMaterialsOTService.Update({
          id: this.data.id,
          check1_cognitive: this.form.controls.check1_cognitive.value ? this.arrayObjectives[0].description : null,
          check2_colors: this.form.controls.check2_colors.value ? this.arrayObjectives[1].description : null,
          check3_elements: this.form.controls.check3_elements.value ? this.arrayObjectives[2].description : null,
          check4_balls: this.form.controls.check4_balls.value ? this.arrayObjectives[3].description : null,
          check5_material_paper: this.form.controls.check5_material_paper.value ? this.arrayObjectives[4].description : null,
          check6_material_didactic: this.form.controls.check6_material_didactic.value ? this.arrayObjectives[5].description : null,
          check7_computer: this.form.controls.check7_computer.value ? this.arrayObjectives[6].description : null,
          check8_clay: this.form.controls.check8_clay.value ? this.arrayObjectives[7].description : null,
          check9_colbon: this.form.controls.check9_colbon.value ? this.arrayObjectives[8].description : null,
          check10_pug: this.form.controls.check10_pug.value ? this.arrayObjectives[9].description : null,

          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({check1_cognitive:'',  check2_colors:'', check3_elements:'', check4_balls:'', check5_material_paper:'',
          check6_material_didactic:'',  check7_computer:'',  check8_clay:'',  check9_colbon:'',  check10_pug:''});
          if (this.saved) {
            this.saved();
            this.messageEvent.emit(true);
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
          this.ChRNMaterialsOTService.Save({
          check1_cognitive: this.form.controls.check1_cognitive.value ? this.arrayObjectives[0].description : null,
          check2_colors: this.form.controls.check2_colors.value ? this.arrayObjectives[1].description : null,
          check3_elements: this.form.controls.check3_elements.value ? this.arrayObjectives[2].description : null,
          check4_balls: this.form.controls.check4_balls.value ? this.arrayObjectives[3].description : null,
          check5_material_paper: this.form.controls.check5_material_paper.value ? this.arrayObjectives[4].description : null,
          check6_material_didactic: this.form.controls.check6_material_didactic.value ? this.arrayObjectives[5].description : null,
          check7_computer: this.form.controls.check7_computer.value ? this.arrayObjectives[6].description : null,
          check8_clay: this.form.controls.check8_clay.value ? this.arrayObjectives[7].description : null,
          check9_colbon: this.form.controls.check9_colbon.value ? this.arrayObjectives[8].description : null,
          check10_pug: this.form.controls.check10_pug.value ? this.arrayObjectives[9].description : null,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.messageEvent.emit(true);
          this.toastService.success('', x.message);
          this.form.patchValue({check1_cognitive:'',  check2_colors:'', check3_elements:'', check4_balls:'', check5_material_paper:'',
          check6_material_didactic:'',  check7_computer:'',  check8_clay:'',  check9_colbon:'',  check10_pug:''});
          if (this.saved) {
            this.messageEvent.emit(true);
            this.saved();
          }
        }).catch(x => {
        });
      }
    }
  }
  checked = false;
  toggle(checked: boolean) {
    this.checked = checked;
  }
}

