import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InterventionTlService } from '../../../../../../business-controller/intervention-tl.service';
import { ChRecordService } from '../../../../../../business-controller/ch_record.service';

@Component({
  selector: 'ngx-form-language-intervention',
  templateUrl: './form-language-intervention.component.html',
  styleUrls: ['./form-language-intervention.component.scss'],
})
export class FormLanguageInterventionComponent implements OnInit {
  @Input() title: string;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() record_id: any = null;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;


  constructor(

    private formBuilder: FormBuilder,
    private InterventionTlS: InterventionTlService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;


    if (!this.data) {
      this.data = {
        text: '',

      };
    }
    this.form = this.formBuilder.group({
      text: [this.data.text, Validators.compose([Validators.required]),],
      
     
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.InterventionTlS
          .Update({
            id: this.data.id,
            text: this.form.controls.text.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.InterventionTlS
          .Save({
            text: this.form.controls.text.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ text: ''});
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
          this.messageEvent.emit(true);
      }
    } else{
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
    
  }

 
}
