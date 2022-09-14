import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChNutritionInterpretationService } from '../../../../../business-controller/ch-nutrition-interpretation.service';
import { DateFormatPipe } from '../../../../../pipe/date-format.pipe';
import { BaseTableComponent } from '../../../../components/base-table/base-table.component';


@Component({
  selector: 'ngx-form-analysis-and-interpretation',
  templateUrl: './form-analysis-and-interpretation.component.html',
  styleUrls: ['./form-analysis-and-interpretation.component.scss']
})
export class FormAnalysisAndInterpretationComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() type_record_id: any = null;
  @Input() record_id: any = null;
  @Input() user_id: any = null;
  

  linearMode = false;
  public form: FormGroup;
  public messageError: string = null;
  public rips_typefile: any[];
  public subtitle: string = null;
  public messageToltip: string = `Búsqueda por:`;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public botton_title: string = 'Guardar';
  public ch_nutrition_interpretation = null;
  public has_input: any = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      created_at: {
        title: 'Fecha Observación',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.datePipe.transform2(value);
        }
      },
      observation: {
        title: 'Observación',
        type: 'string',
      },
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private ChNutritionAnalysisAndInterpretationS: ChNutritionInterpretationService,
    private toastService: NbToastrService,
    public datePipe: DateFormatPipe,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      observation: ['', Validators.required],
    });

    this.ChNutritionAnalysisAndInterpretationS.GetCollection({
      type_record_id: this.type_record_id,
      ch_record_id: this.record_id,
    }).then(x => {
      this.ch_nutrition_interpretation = x[0];
      if (this.ch_nutrition_interpretation != null) {
        this.form.patchValue({ observation: this.ch_nutrition_interpretation.observation });
        this.botton_title = 'Actualizar';
      }
    });
  }

  RefreshData() {
    this.table.refresh();
  }

  save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.messageError = null;
      if (this.ch_nutrition_interpretation != null) {
        this.ChNutritionAnalysisAndInterpretationS.Update({
          id: this.ch_nutrition_interpretation.id,
          ch_record_id: this.record_id,
          type_record_id: this.type_record_id,
          observation: this.form.controls.observation.value,
        }).then(x => {
          this.saved = x;
          this.loading = false;
          this.ch_nutrition_interpretation = x.data.ch_nutrition_interpretation;
          this.RefreshData();
          this.botton_title = 'Actualizar';
          this.toastService.success('Registro actualizado correctamente', 'Correcto');
        }).catch(x => {
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      } else {
        this.ChNutritionAnalysisAndInterpretationS.Save({
          ch_record_id: this.record_id,
          type_record_id: this.type_record_id,
          observation: this.form.controls.observation.value,
        }).then(x => {
          this.saved = x;
          this.loading = false;
          this.RefreshData();
          this.ch_nutrition_interpretation = x.data.ch_nutrition_interpretation;
          this.botton_title = 'Actualizar';
          this.toastService.success('Registro guardado correctamente', 'Correcto');
        }).catch(x => {
          this.loading = false;
          this.toastService.danger(x, 'Error');
        });
      }
    }
  }

}
