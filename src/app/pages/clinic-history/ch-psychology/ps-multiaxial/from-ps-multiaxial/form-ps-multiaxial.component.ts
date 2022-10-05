import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ChPsMultiaxialService } from '../../../../../business-controller/ch-ps-multiaxial.service';
import { DiagnosisDmsService } from '../../../../../business-controller/diagnosis-dms.service';
import { DiagnosisDms } from '../../../../../models/diagnosis_dms';


@Component({
  selector: 'ngx-form-ps-multiaxial',
  templateUrl: './form-ps-multiaxial.component.html',
  styleUrls: ['./form-ps-multiaxial.component.scss']
})
export class FormPsMultiaxialComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Input() type_record_id: Boolean = false;
  @Input() has_input: boolean = false;
  @Output() messageEvent = new EventEmitter<any>();


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;

  public psychomotricity: any[] = [];
  public introspection: any[] = [];
  public judgment: any[] = [];
  public prospecting: any[] = [];
  public intelligence: any[] = [];
  public diagnosis_id;
  public diagnosis_dms: any[];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,    
    private multiaxialS: ChPsMultiaxialService,    
    private dmsS: DiagnosisDmsService,    

  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.data || this.data.length == 0) {
      this.data = {

       axis_one: '',
       axis_two: '',
       axis_three: '',
       axis_four: '',
       eeag: ''

      };
    }

    this.form = this.formBuilder.group({

      axis_one: [this.data[0] ? this.data[0].axis_one : this.data.axis_one, Validators.compose([Validators.required])],
      axis_two: [this.data[0] ? this.data[0].axis_two : this.data.axis_two, Validators.compose([Validators.required])],
      axis_three: [this.data[0] ? this.data[0].axis_three : this.data.axis_three, Validators.compose([Validators.required])],
      axis_four: [this.data[0] ? this.data[0].axis_four : this.data.axis_four, Validators.compose([Validators.required])],
      eeag: [this.data[0] ? this.data[0].eeag : this.data.eeag, Validators.compose([Validators.required])],
     

    });

  

  }

  public diagnosticConut = 0;

  searchDiagnostic($event) {
    this.diagnosticConut++;
    if (this.diagnosticConut == 3) {
      this.diagnosticConut = 0;
      if ($event.length >= 3) {
        this.dmsS.GetCollection({
          search: $event,
        }).then(x => {
          this.diagnosis_dms = x;
        });
      } else {
        this.dmsS.GetCollection({
          search: '',
        }).then(x => {
          this.diagnosis_dms = x;
        });
      }
    }
  }

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        this.multiaxialS.Update({
          id: this.data.id,
          axis_one: this.form.controls.axis_one.value,
          axis_two: this.form.controls.axis_two.value,
          axis_three: this.form.controls.axis_three.value,
          axis_four: this.form.controls.axis_four.value,
          eeag: this.form.controls.eeag.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          // this.close();
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        this.multiaxialS.Save({
          axis_one: this.form.controls.axis_one.value,
          axis_two: this.form.controls.axis_two.value,
          axis_three: this.form.controls.axis_three.value,
          axis_four: this.form.controls.axis_four.value,
          eeag: this.form.controls.eeag.value,
          type_record_id: this.type_record_id,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.patchValue({
            axis_one:'',
            axis_two:'',
            axis_three:'',
            axis_four:'',
            eeag:'',
           });
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      }

    } else {
      this.toastService.warning('', "Debe diligenciar los campos obligatorios");
    }
  }

  saveCode(e): void {
    var localidentify = this.diagnosis_dms.find(item => item.name == e);

    if (localidentify) {
      this.diagnosis_id = localidentify.id;
    } else {
      this.diagnosis_id = null;
      this.toastService.warning('', 'Debe seleccionar un diagnostico de la lista');
      this.form.controls.diagnosis_id.setErrors({ 'incorrect': true });
    }
  }




}
