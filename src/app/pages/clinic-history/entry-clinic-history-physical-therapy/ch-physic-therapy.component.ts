import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserChangeService } from '../../../business-controller/user-change.service';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ChEValorationFTService } from '../../../business-controller/ch_e_valoration_f_t.service';


@Component({
  selector: 'ngx-ch-physic-therapy.component',
  templateUrl: './ch-physic-therapy.component.html',
  styleUrls: ['./ch-physic-therapy.component.scss'],
})
export class ClinicHistoryPhysicTherapy implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  //@Input() vital: any;
  linearMode = false;
  public messageError = null;
  public title;
  public routes = [];
  public user;
  public nameForm: String;
  public movieForm: String;
  public show: any;
  public signatureImage: string;
  public currentRole: any;
  public own_user;
  public saved: any = null;
  public chftvaloration: any[];


  public record_id;
  public isSubmitted: boolean = false;
  public form: FormGroup;
  public all_changes: any[];
  public saveEntry: any = 0;
  public loading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ChEValorationFTService: ChEValorationFTService,
    public userChangeS: UserChangeService,
    private chRecord: ChRecordService,
    public datePipe: DateFormatPipe,
    private admissionsS: AdmissionsService,
    private deleteConfirmService: NbDialogService,
    private toastService: NbToastrService,
    private location: Location,
    private authService: AuthService,

  ) {

  }

  async ngOnInit() {
    this.record_id = this.route.snapshot.params.id;
    this.own_user = this.authService.GetUser();
    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.user = x[0]['admissions']['patients'];
    });
    if (!this.data) {
      this.data = {
        ch_diagnosis_id: '',
      };
    }
    

    this.ChEValorationFTService.GetCollection({ ch_record_id: this.record_id }).then(x => {
      this.chftvaloration = x;
      
    });

    this.form = this.formBuilder.group({
      ch_e_valoration_f_t: [this.data.ch_e_valoration_f_t, Validators.compose([Validators.required])],

    });
  }
  save() {
    this.isSubmitted = true;
    if (!this.form.invalid && this.saveEntry) {
      this.loading = true;
      if (this.data.id) { }
      this.ChEValorationFTService.Update({});


    }
  }

  public back(): void {
    this.location.back();
  }

  close() {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        //signature: true, 
        title: 'Finalizar registro.',
        delete: this.finish.bind(this),
        //showImage: this.showImage.bind(this),
        // save: this.saveSignature.bind(this),
        textConfirm:'Finalizar registro'
      },
    });
  }

  showImage(data) {
    this.signatureImage = data;
  }

  // async saveSignature() {
  //   var formData = new FormData();
  //   formData.append('firm_file', this.signatureImage);
  //   console.log(this.signatureImage);
  // }

  async finish() {

   await this.chRecord.Update({
      id: this.record_id,
      status: 'CERRADO',
      user: this.user,
      role: this.currentRole,
      user_id: this.own_user.id,
    }).then(x => {
      this.toastService.success('', x.message);
      this.location.back();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }

  RefreshData() {

    this.table.refresh();
  }





  receiveMessage($event) {
    if ($event == true) {
      this.messageEvent.emit($event);
    }
  }

  tablock(e) {
    switch (e.tabTitle) {
      case "INGRESO": {
        this.show = 1;
        break;
      }
      case "NOTA REGULAR": {
        this.show = 2;
        break;
      }
    }
  }

 

  DeleteAdmissions(data) {
    return this.admissionsS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}

