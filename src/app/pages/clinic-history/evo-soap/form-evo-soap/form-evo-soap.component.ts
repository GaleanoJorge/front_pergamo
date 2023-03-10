import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChEvoSoapService } from '../../../../business-controller/ch-evo-soap.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-form-evo-soap',
  templateUrl: './form-evo-soap.component.html',
  styleUrls: ['./form-evo-soap.component.scss'],
})
export class FormEvoSoapComponent implements OnInit {

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
  public admissions_id;
 



  constructor(

    private formBuilder: FormBuilder,
    private ChEvoSoapS: ChEvoSoapService,
    private toastService: NbToastrService,
    private chRecord: ChRecordService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;

    this.chRecord.GetCollection(this.record_id).then((x) => {
      this.admissions_id = x;
    });

    if (!this.data) {
      this.data = {
        subjective: '',
        objective: '',

      };
    }
    this.form = this.formBuilder.group({
      subjective: [this.data.subjective, Validators.compose([Validators.required]),],
      objective: [this.data.objective, Validators.compose([Validators.required]),],
      
     
    });

  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.ChEvoSoapS
          .Update({
            id: this.data.id,
            subjective: this.form.controls.subjective.value,
            objective: this.form.controls.objective.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            if (this.saved) {
              this.saved();
            }
          })
          .catch((x) => {
            this.isSubmitted = false;
            this.loading = false;
          });
      } else {
        await this.ChEvoSoapS
          .Save({
            subjective: this.form.controls.subjective.value,
            objective: this.form.controls.objective.value,
            type_record_id: 3,
            ch_record_id: this.record_id,
          })
          .then((x) => {
            this.toastService.success('', x.message);
            this.messageEvent.emit(true);
            this.form.setValue({ subjective: '', objective:''});
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




































