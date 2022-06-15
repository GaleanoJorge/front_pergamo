import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-form-gastrointestinal',
  templateUrl: './form-gastrointestinal.component.html',
  styleUrls: ['./form-gastrointestinal.component.scss']
})
export class FormGastrointestinalComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() route: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public messageError = null;
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
        this.form.controls.amount_of_vomit.setValidators([Validators.required]);
        this.form.controls.amount_of_vomit.updateValueAndValidity();
      } else {
        this.form.controls.amount_of_vomit.setValidators([]);
        this.form.controls.amount_of_vomit.updateValueAndValidity();
      }
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {

    }
  }

}
