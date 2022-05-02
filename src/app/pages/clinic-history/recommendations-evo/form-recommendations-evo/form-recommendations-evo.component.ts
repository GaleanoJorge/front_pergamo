import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChRecommendationsEvoService } from '../../../../business-controller/ch-recommendations-evo.service';
import { RecommendationsEvoService } from '../../../../business-controller/recommendations_evo.service';


@Component({
  selector: 'ngx-form-recommendations-evo',
  templateUrl: './form-recommendations-evo.component.html',
  styleUrls: ['./form-recommendations-evo.component.scss'],
})
export class FormRecommendationsEvoComponent implements OnInit {
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
  public recommendations_evo_id : any[];;
 


  constructor(
    private toastService: NbToastrService,
    private formBuilder: FormBuilder,
    private ChRecommendationsEvoS: ChRecommendationsEvoService,
    private RecommendationsEvoS: RecommendationsEvoService,
    
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {
        recommendations_evo_id: '',
        
      };
    };

    this.RecommendationsEvoS.GetCollection().then(x => {
      this.recommendations_evo_id = x; //variable que trae toda la info de la tabla
    });
   
    this.form = this.formBuilder.group({
      recommendations_evo_id: [this.data.recommendations_evo_id, Validators.compose([Validators.required])],
 
    });
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChRecommendationsEvoS.Update({
          id: this.data.id,
          recommendations_evo_id: this.form.controls.recommendations_evo_id.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ recommendations_evo: ''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.ChRecommendationsEvoS.Save({
          id: this.data.id, 
          recommendations_evo_id: this.form.controls.recommendations_evo_id.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ recommendations_evo_id: '', });
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