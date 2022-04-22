import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChDietsEvoService } from '../../../../business-controller/ch-diets-evo.service';
import { DietComponentService } from '../../../../business-controller/diet-componet.service';
import { DietConsistencyService } from '../../../../business-controller/diet-consistency.service';


@Component({
  selector: 'ngx-form-diets-evo',
  templateUrl: './form-diets-evo.component.html',
  styleUrls: ['./form-diets-evo.component.scss'],
})
export class FormDietsEvoComponent implements OnInit {
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
  public diet_component_id;
  public diet_consistency_id;
 


  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private ChDietsEvoS: ChDietsEvoService,
    private DietComponentS: DietComponentService,
    private DietConsistencyS: DietConsistencyService,
    
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data ) {
      this.data = {
        diet_component_id: '',
        diet_consistency_id: '',
        
      };
    };

    this.DietComponentS.GetCollection().then(x => {
      this.diet_component_id = x;
    });
    this.DietConsistencyS.GetCollection().then(x => {
      this.diet_consistency_id = x;
    });
   
    this.form = this.formBuilder.group({
      diet_component_id: [this.data.diet_component_id, Validators.compose([Validators.required])],
      diet_consistency_id: [this.data.diet_consistency_id, Validators.compose([Validators.required])],
 
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
          diet_component_id: this.form.controls.diet_component_id.value,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
          type_record_id: 3,
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
        await this.ChDietsEvoS.Save({
          diet_component_id: this.form.controls.diet_component_id.value,
          diet_consistency_id: this.form.controls.diet_consistency_id.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ diet_component_id: '', diet_consistency_id: '' });
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