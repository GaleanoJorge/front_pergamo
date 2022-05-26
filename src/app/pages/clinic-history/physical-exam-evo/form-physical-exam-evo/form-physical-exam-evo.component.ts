import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChTypePhysicalExamService } from '../../../../business-controller/ch_type_physical_exam.service';
import { ChPhysicalExamService } from '../../../../business-controller/ch_physical_exam.service';




@Component({
  selector: 'ngx-form-physical-exam-evo',
  templateUrl: './form-physical-exam-evo.component.html',
  styleUrls: ['./form-physical-exam-evo.component.scss']
})

export class FormPhysicalExamEvoComponent implements OnInit {

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
  public type_ch_physical_exam : any[];
  public revision: any[];
  public showrevision: boolean = false;
  public type_ch_physical_exam_id : any[];


  constructor(
    private formBuilder: FormBuilder,
    private typeChPhysical: ChTypePhysicalExamService,
    private PhysicalExamS: ChPhysicalExamService,
    private toastService: NbToastrService,
    
  ) {
  }

 async ngOnInit() {
    if (!this.data) {
      this.data = {
        revision: '',
        type_ch_physical_exam_id: '',
      };
    }

    this.typeChPhysical.GetCollection({ status_id: 1 }).then(x => {
      this.type_ch_physical_exam= x;
    });



    this.form = this.formBuilder.group({
      revision: [this.data.revision, Validators.compose([Validators.required])],
      type_ch_physical_exam_id: [this.data.type_ch_physical_exam_id, Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });


    //this.onChanges1(); //Función de Validacion, de habilitar campo de observaciones

  }
  /*onChange1(tipoId) {
    if (tipoId == 1) {
      this.showrevision = true;
    } else {
      this.showrevision = false;
    }
  } */

  async save() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      this.loading = true;
      this.showTable = false;

      if (this.data.id) {
        await this.PhysicalExamS.Update({
          id: this.data.id,
          revision: this.form.controls.revision.value,
          type_ch_physical_exam_id: this.form.controls.type_ch_physical_exam_id.value,
          type_record_id: 3,
          ch_record_id: this.record_id,

        }).then(x => {
          this.toastService.success('', x.message);
          this.form.setValue({ revision: '', type_ch_physical_exam:''});
          if (this.saved) {
            this.saved();
          }
        }).catch(x => {
          this.isSubmitted = false;
          this.loading = false;
        });
      } else {
        await this.PhysicalExamS.Save({
          revision: this.form.controls.revision.value,
          type_ch_physical_exam_id: this.form.controls.type_ch_physical_exam_id.value,
          type_record_id: 3,
          ch_record_id: this.record_id,
        }).then(x => {
          this.toastService.success('', x.message);
          this.messageEvent.emit(true);
          this.form.setValue({ revision: '', type_ch_physical_exam_id:''});
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

 /* onChanges1() {
    this.form.get('revision').valueChanges.subscribe(val => {
      console.log(val);
      if (val === '') {
        this.revision = [];
      }
      if (val == "0") {
        this.showrevision = true;
      } else {
        this.showrevision = false;
      }
    });
  }*/

  onDescriptionChange(event) {
    this.type_ch_physical_exam_id.forEach(x => {
      if (x.id == event) {
        this.form.controls.description.setValue(x.description);
      }
    });
  }

  
  
}


