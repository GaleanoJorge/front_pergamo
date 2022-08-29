import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChSwRiskFactorsService } from '../../../../../business-controller/ch-sw-risk-factors.service';


@Component({
  selector: 'ngx-form-sw-risk-factors',
  templateUrl: './form-sw-risk-factors.component.html',
  styleUrls: ['./form-sw-risk-factors.component.scss']
})
export class FormSwRiskFactorsComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
 
  public arrayRiskFactors = [
    {
      id: 1,
      description: "Red de apoyo deficiente."
    },
    {
      id: 2,
      description: "Consumo de SPA."
    },
    {
      id: 3,
      description: "Violencia intrafamiliar."
    },
    {
      id: 4,
      description: "Víctima del conflicto armado."
    },
    {
      id: 5,
      description: "Condiciones económicas  deficientes."
    },
    {
      id: 6,
      description: "Vivienda en inadecuadas condiciones."
    },
    {
      id: 7,
      description: "Inadecuada atención desde el personal."
    },
    {
      id: 8,
      description: "Estigmatización por parte de otros pacientes o personal."
    },
    {
      id: 9,
      description: "Interferencia por parte de los familiares  en el proceso psicoterapéutico."
    },
    {
      id: 10,
      description: "Falta de espacios terapéuticos."
    }

  ]

  public obj;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
    private riskS: ChSwRiskFactorsService,

  ) {
  }

  ngOnInit(): void {
    // this.record_id = this.route.snapshot.params.id;
    if (!this.data) {
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
        observations: ''
      };
    };
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
      observations: [this.data[0] ? this.data[0].observations : this.data.observations,],
    });
  
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.riskS.Update({
          id: this.data.id,
          net: this.data.check1,
          spa: this.data.check2,
          violence: this.data.check3,
          victim: this.data.check4,
          economic: this.data.check5,
          living: this.data.check6,
          attention: this.data.check7,
          stigmatization: this.data.check8,
          interference: this.data.check9,
          spaces: this.data.check10,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.riskS.Save({
          net: this.form.controls.check1.value ? this.arrayRiskFactors[0].description : null,
          spa:  this.form.controls.check2.value ? this.arrayRiskFactors[1].description : null,
          violence: this.form.controls.check3.value ? this.arrayRiskFactors[2].description : null,
          victim: this.form.controls.check4.value ? this.arrayRiskFactors[3.].description : null,
          economic: this.form.controls.check5.value ? this.arrayRiskFactors[4].description : null,
          living: this.form.controls.check6.value ? this.arrayRiskFactors[5].description : null,
          attention: this.form.controls.check7.value ? this.arrayRiskFactors[6].description : null,
          stigmatization: this.form.controls.check8.value ? this.arrayRiskFactors[7].description : null,
          interference: this.form.controls.check9.value ? this.arrayRiskFactors[8].description : null,
          spaces: this.form.controls.check10.value ? this.arrayRiskFactors[9].description : null,
          observations: this.form.controls.observations.value,
          type_record_id: 1,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ check1: false, check2: false, check3:false, check4:false, check5:false, check6:false,
           check7:false, check8:false, check9:false, check10:false, observations:''});
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
  }

}
