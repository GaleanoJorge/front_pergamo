import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDietsEvoService } from '../../../../business-controller/ch-diets-evo.service';
import { DietComponentService } from '../../../../business-controller/diet-componet.service';
import { DietConsistencyService } from '../../../../business-controller/diet-consistency.service';
import { EnterallyDietService } from '../../../../business-controller/enterally-diet.service';


@Component({
  selector: 'ngx-form-diets-evo',
  templateUrl: './form-diets-evo.component.html',
  styleUrls: ['./form-diets-evo.component.scss'],
})
export class FormDietsEvoComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public enterally_diet_id;
  public diet_consistency_id;
 


  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private ChDietsEvoS: ChDietsEvoService,
    private EnterallyDietS: EnterallyDietService,
    private DietConsistencyS: DietConsistencyService,
    
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data ) {
      this.data = {
        enterally_diet_id: '',
        diet_consistency_id: '',
        observation:'',
        
      };
    };

    this.EnterallyDietS.GetCollection().then(x => {
      this.enterally_diet_id = x;
    });
    this.DietConsistencyS.GetCollection().then(x => {
      this.diet_consistency_id = x;
    });
   
    this.form = this.formBuilder.group({
      enterally_diet_id: [this.data.enterally_diet_id ],
      diet_consistency_id: [this.data.diet_consistency_id,Validators.compose([Validators.required])],
      observation: [this.data.observation, Validators.compose([Validators.required])],
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChDietsEvoS.Update({
          id: this.data.id,
          enterally_diet_id: this.form.controls.enterally_diet_id.value,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ diet_component: '', diet_consistency: '', observation: ''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChDietsEvoS.Save({
          enterally_diet_id: this.form.controls.enterally_diet_id.value,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({  diet_consistency_id: '', enterally_diet_id: '', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
        });
      }
    }
  }


}