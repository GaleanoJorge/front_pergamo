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
  public diet_consistency;
  
  public diet_type = [
    { id: "LIQUIDA CLARA", name: "LIQUIDA CLARA" },
    { id: "LIQUIDA COMPLETA", name: "LIQUIDA COMPLETA" },
    { id: "BLANDA - TODO MIEL ", name: "BLANDA - TODO MIEL " },
    { id: "BLANDA - TODO MOLIDO", name: "BLANDA - TODO MOLIDO" },
    { id: "BLANDA - PURE", name: "BLANDA - PURE" },
    { id: "BLANDA - TODO PICADO", name: "BLANDA - TODO PICADO" },
    { id: "BLANDA - ESTIMULO", name: "BLANDA - ESTIMULO" },
    { id: "SEMIBLANDA", name: "SEMIBLANDA" },
    { id: "NORMAL", name: "NORMAL" },
    { id: "HIPOCALORICA", name: "HIPOCALORICA" },
    { id: "HIPERCALORICA", name: "HIPERCALORICA" },
    { id: "HIPOPROTEICA", name: "HIPOPROTEICA" },
    { id: "HIPERPROTEICA", name: "HIPERPROTEICA" },
    { id: "HIPOGLUCIDA", name: "HIPOGLUCIDA" },
    { id: "HIPOSODICA", name: "HIPOSODICA" },
    { id: "HIPOGRASA", name: "HIPOGRASA" },
    { id: "ALTA EN FIBRA", name: "ALTA EN FIBRA" },
    { id: "VEGETARIANA", name: "VEGETARIANA" },
    { id: "CETOGENICA", name: "CETOGENICA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - GASTROSTOMIA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - GASTROSTOMIA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA NASOGASTRICA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA NASOGASTRICA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA OROGASTRICA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - SONDA OROGASTRICA" },
    { id: "SOPORTE NUTRICIONAL ESPECIALIZADO - YEYUNOSTOMIA", name: "SOPORTE NUTRICIONAL ESPECIALIZADO - YEYUNOSTOMIA" },
  ];


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
        diet_consistency: [],
        observation:'',
        
      };
    };

    this.ChDietsEvoS.GetCollection({
      ch_record_id: this.record_id,
      type_record_id: this.record_id,
    }).then(x => {
      if (x.length > 0) {
        this.messageEvent.emit(true);
      }
    });

    this.EnterallyDietS.GetCollection().then(x => {
      this.enterally_diet_id = x;
    });
   
    this.form = this.formBuilder.group({
      enterally_diet_id: [this.data.enterally_diet_id ],
      diet_consistency: [this.data.diet_consistency],
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
          diet_consistency:  JSON.stringify(this.form.controls.diet_consistency.value),
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({ diet_component: '', diet_consistency: '', observation: ''});
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
          diet_consistency:  this.form.controls.diet_consistency.value.length>0? JSON.stringify(this.form.controls.diet_consistency.value):null,
          observation: this.form.controls.observation.value,
          type_record_id: this.type_record,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({  diet_consistency: [], enterally_diet_id: '', observation:'' });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
            this.isSubmitted = false;
            this.loading = false;
        });
      }
    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
    
  }


}