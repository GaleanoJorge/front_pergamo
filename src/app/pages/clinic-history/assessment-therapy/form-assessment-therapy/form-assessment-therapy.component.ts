import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'ngx-form-assessment-therapy',
  templateUrl: './form-assessment-therapy.component.html',
  styleUrls: ['./form-assessment-therapy.component.scss']
})
export class FormAssessmentTherapyComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
 
  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
  ) {
  }

  async ngOnInit(): Promise<void> {

  }

  async save() {

   }
  

}
