import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-form-food-history',
  templateUrl: './form-food-history.component.html',
  styleUrls: ['./form-food-history.component.scss']
})
export class FormFoodHistoryComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() user_id: any = null;

  linearMode = false;
  public form: FormGroup;
  public messageError: string = null;
  public subtitle: string = null;
  public messageToltip: string = `Búsqueda por:`;
  public rips_typefile: any[];
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public is_allergic = [
    { id: 'SI', name: 'Si' },
    { id: 'NO', name: 'NO' },
  ];
  public appetite = [
    { id: 'AUMENTADO', name: 'AUMENTADO' },
    { id: 'BUENO', name: 'BUENO' },
    { id: 'DISMINUIDO', name: 'DISMINUIDO' },
    { id: 'MALO', name: 'MALO' },
    { id: 'REGULAR', name: 'REGULAR' },
  ];
  public intake = [
    { id: 'LENTA', name: 'LENTA' },
    { id: 'NORMAL', name: 'NORMAL' },
    { id: 'RAPIDA', name: 'RAPIDA' },
  ];
  public swallowing = [
    { id: 'DEFICIENTE', name: 'DEFICIENTE' },
    { id: 'NORMAL', name: 'NORMAL' },
  ];
  public parenteral_nutrition = [
    { id: 'PERIFÉRICA', name: 'PERIFÉRICA' },
    { id: 'TOTAL', name: 'TOTAL' },
  ];



  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      name: {
        title: 'Diagnóstico',
        type: 'string',
      },
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      is_allergic: ['', Validators.required],
      allergy: ['', Validators.required],
      appetite: ['', Validators.required],
      intake: ['', Validators.required],
      swallowing: ['', Validators.required],
      diet_type: ['', Validators.required],
      parenteral_nutrition: ['', Validators.required],
      intake_control: ['', Validators.required],
    });

    this.form.get('is_allergic').valueChanges.subscribe(val => {
      console.log(val);
      if (val == 'SI') {
        this.form.controls.allergy.setValidators([Validators.required]);
        this.form.controls.allergy.updateValueAndValidity();
      } else {
        this.form.controls.allergy.setValidators([]);
        this.form.controls.allergy.updateValueAndValidity();
      }
    });
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {

    }
  }

}
