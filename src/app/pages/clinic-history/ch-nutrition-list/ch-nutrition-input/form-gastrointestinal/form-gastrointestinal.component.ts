import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChNutritionGastrointestinalService } from '../../../../../business-controller/ch-nutrition-gastrointestinal.service';


@Component({
  selector: 'ngx-form-gastrointestinal',
  templateUrl: './form-gastrointestinal.component.html',
  styleUrls: ['./form-gastrointestinal.component.scss']
})
export class FormGastrointestinalComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() route: any = null;
  @Input() record_id: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
  public showVomit = false;
  public bowel_habit = [
    {id: 'LÍQUIDA', name: 'LÍQUIDA'},
    {id: 'BLANDA', name: 'BLANDA'},
    {id: 'NORMAL', name: 'NORMAL'},
    {id: 'DURA', name: 'DURA'},
    {id: 'MUY DURA', name: 'MUY DURA'},
  ];
  public vomit = [
    {id: true, name: 'Si'},
    {id: false, name: 'NO'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ChNutritionGastrointestinalS: ChNutritionGastrointestinalService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bowel_habit: ['', Validators.required],
      vomit: ['', Validators.required],
      amount_of_vomit: [''],
      nausea: ['', Validators.required],
      observations: ['', Validators.required],
    });

    this.form.get('vomit').valueChanges.subscribe(val => {
      if (val) {
        this.showVomit = true;
        this.form.controls.amount_of_vomit.setValidators([Validators.required]);
        this.form.controls.amount_of_vomit.updateValueAndValidity();
      } else {
        this.showVomit = false;
        this.form.controls.amount_of_vomit.setValidators([]);
        this.form.controls.amount_of_vomit.updateValueAndValidity();
      }
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.messageError = null;
      this.ChNutritionGastrointestinalS.Save({
        ch_record_id: this.record_id,
        type_record_id: this.route,
        bowel_habit: this.form.controls.bowel_habit.value,
        vomit: this.form.controls.vomit.value,
        amount_of_vomit: this.form.controls.amount_of_vomit.value,
        nausea: this.form.controls.nausea.value,
        observations: this.form.controls.observations.value,
      }).then(x => {
        this.saved = x;
        this.toastService.success('Registro guardado correctamente', 'Correcto');
      }).catch(x => {
        this.loading = false;
        this.toastService.danger(x, 'Error');
      });
    }
  }

}