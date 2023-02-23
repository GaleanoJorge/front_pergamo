import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputMaterialsUsedTlService } from '../../../../../../business-controller/input-materials-used-tl.service';
import { ChRecordService } from '../../../../../../business-controller/ch_record.service';

@Component({
  selector: 'ngx-form-language-materialused',
  templateUrl: './form-language-materialused.component.html',
  styleUrls: ['./form-language-materialused.component.scss'],
})
export class FormLanguageMaterialusedComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable; 
 


  constructor(

    private formBuilder: FormBuilder,
    private InputMaterialsUsedTlS: InputMaterialsUsedTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
   
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    this.record_id = this.route.snapshot.params.id;

   
    if (!this.data || this.data.length == 0) {
      this.data = {
        materialused: ["ELEMENTOS DE BIOSEGURIDAD (BATA, GUANTES, GORRO, POLAINAS)",],

      };
    }
    
    this.form = this.formBuilder.group({
      materialused: [this.data[0] ? this.data[0].materialused : this.data.materialused,],
      
    });    

  }


  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;
      
      if (this.data.id) {
        await this.InputMaterialsUsedTlS.Update({
          id: this.data.id,
          materialused: this.form.controls.materialused.value,
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
        await this.InputMaterialsUsedTlS.Save({
          materialused: this.form.controls.materialused.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ materialused: [], });
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