import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ChRecordService } from '../../../../business-controller/ch_record.service';
import { ConfirmDialogCHComponent } from '../../clinic-history-list/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ngx-ps-mental-exam',
  templateUrl: './ps-mental-exam.component.html',
  styleUrls: ['./ps-mental-exam.component.scss']
})
export class PsMentalExamComponent implements OnInit {

  @Input() title: string;
  @Input() data: any = null;
  @Input() admission_id: any = null;
  @Input() savedUser: any = true;
  @Input() showTable: any = null;
  @Input() user_id: any = null;
  @Input() record_id: any = null;
  @Input() type_record: any = null;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() has_input: boolean = false;
  @Input() type_record_id: any = null;;

  public form: FormGroup;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public disabled: boolean = false;
  public total: number = 0;
  public expensesTotal = null;
  public input_done: boolean = false; // ya se registró algo en el ingreso

  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public int = 0;
  public user;
  public messageError = null;
  public show1 = false;
  public show2 = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: NbToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private chRecord: ChRecordService,
    private location: Location,
    private deleteConfirmService: NbDialogService,


  ) {
  }

  async ngOnInit(): Promise<void> {
    this.own_user = this.authService.GetUser();
    
    if (!this.data || this.data.length == 0) {
      this.data = {
      };
    }

    this.form = this.formBuilder.group({



    });
  }


  async save() {



  }

  public back(): void {
    this.location.back();
  }


  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit(true);
    }
  }

  filterStepper($event){
    return $event.target.textContent;
  }

  goto($event) {
    let selectedAccordion =  this.filterStepper($event);
    if (selectedAccordion == 'Funciones de Relación') {
      this.show1 = true;
    } else if (selectedAccordion == 'Funciones Intelectivas') {
      this.show2 = true;
    }

}
}
