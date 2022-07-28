import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChReasonConsultationService } from '../../../../business-controller/ch-reason-consultation.service';
import { ChExternalCauseService } from '../../../../business-controller/ch-external-cause.service';



@Component({
  selector: 'ngx-form-nursering-medication',
  templateUrl: './form-nursering-medication.component.html',
  styleUrls: ['./form-nursering-medication.component.scss']
})
export class FormNurseringMedicationComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() record_id: any = null;
  @Input() type_record_id: any = null;

  @Output() messageEvent = new EventEmitter<any>();
  


  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public showTable;
  public ch_external_cause: any[];
  public show;


  constructor(
    private formBuilder: FormBuilder,
    private reasonConsultationS: ChReasonConsultationService,
    private chexternalcauseS: ChExternalCauseService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {

  }

  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit(true);
    }
  }

  tablock(e) {
    switch (e.tabTitle) {
      case "Administrados": {
        // this.table.refresh();
        this.messageEvent.emit(true);
        this.show = 1;
        break;
      }
      case "Eliminados": {
        this.messageEvent.emit(true);
        this.show = 2;
        break;
      }
    }
  }

}
