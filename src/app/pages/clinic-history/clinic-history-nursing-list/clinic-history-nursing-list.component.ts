import { AdmissionsService } from '../../../business-controller/admissions.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormClinicHistoryNursingComponent } from './form-clinic-history-nursing/form-clinic-history-nursing.component';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsNursingComponent } from './actionsNursing.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { filter, pairwise } from 'rxjs/operators';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ConfirmDialogCHComponent } from '../clinic-history-list/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'ngx-clinic-history-nursing-list',
  templateUrl: './clinic-history-nursing-list.component.html',
  styleUrls: ['./clinic-history-nursing-list.component.scss'],
})
export class ClinicHistoryNursingListComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() ch_record2:number=null;
  linearMode = true;
  public messageError = null;
  public title;
  public subtitle = 'por usuario';
  public headerFields: any[] = ['Consecutivo de ingreso', 'Ruta', 'Ambito', 'Programa', 'Sede', 'Piso', 'Pabellón', 'Cama/Consultorio', 'Contrato', 'Fecha Ingreso', 'Fecha Egreso', 'Salida Medica'];
  public routes = [];
  public course;
  public data = [];
  public user_id;
  public date_end: boolean = true;
  public cont = 0;
  public ambit;
  public program;
  public flat;
  public user;
  public admission;
  public own_user;
  public bed;
  public bed_id;
  public pavilion;
  public record_id;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public is_pad: boolean = false;
  public loading: boolean = false;
  public currentRole: any;
  public show: any;
  public int: 0;s
  public signatureImage: string;
  public previousUrl: string;
  public has_input;


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  constructor(
    private route: ActivatedRoute,
    private admissionsS: AdmissionsService,
    private router: Router,
    private dialogFormService: NbDialogService,
    private UserBS: UserBusinessService,
    private deleteConfirmService: NbDialogService,
    private chRecord: ChRecordService,
    private toastService: NbToastrService,
    private location: Location,
    private authService: AuthService,
    public datePipe: DateFormatPipe,

  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      },
      {
        name: 'Historia Clínica',
        route: '../../clinic-history/' + this.route.snapshot.params.user_id,
      },
    ];

  }

  GetParams() {
    return {
      user_id: this.route.snapshot.params.user_id,
    };
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id==undefined?this.ch_record2:this.route.snapshot.params.id;
    this.currentRole = this.authService.GetRole();
    this.own_user = this.authService.GetUser();

    if (this.own_user.assistance != null) {
      if (this.own_user.assistance.length > 0) {
        this.is_pad = true;
      }
    }

    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.admission = x[0]['admissions'];
      this.user = x[0]['admissions']['patients'];
      this.title = 'Admisiones de paciente: ' + this.user.firstname + ' ' + this.user.lastname;
    });
  }

  public back(): void {
    this.location.back();
  }

  close() {
    this.deleteConfirmService.open(ConfirmDialogCHComponent, {
      context: {
        signature: true,
        title: 'Finalizar registro.',
        delete: this.finish.bind(this),
        showImage: this.showImage.bind(this),
        // save: this.saveSignature.bind(this),
        textConfirm: 'Finalizar registro'
      },
    });
  }

  showImage(data) {
    this.int++;
    if (this.int == 1) {
      this.signatureImage = null;
    } else {
      this.signatureImage = data;

    }
  }
  async saveSignature() {
    var formData = new FormData();
    formData.append('firm_file', this.signatureImage);
    console.log(this.signatureImage);
  }

  // async finish() {

  //   await this.chRecord.Update({
  //     id: this.record_id,
  //     status: 'CERRADO',
  //     user: this.user,
  //     role: this.currentRole,
  //     user_id: this.own_user.id,
  //   }).then(x => {
  //     this.toastService.success('', x.message);
  //     this.location.back();
  //     if (this.saved) {
  //       this.saved();
  //     }
  //   }).catch(x => {
  //     this.isSubmitted = false;
  //     this.loading = false;
  //   });
  // }

  async finish(firm) {
    if(this.signatureImage!=null){
      var formData = new FormData();
      formData.append('id', this.record_id,);
      formData.append('status', 'CERRADO');
      formData.append('user', this.user);
      formData.append('role', this.currentRole);
      formData.append('user_id', this.own_user.id);
      formData.append('firm_file', this.signatureImage);
      
      try {
        
        let response;
        
        response = await this.chRecord.UpdateCH(formData, this.record_id);
        this.location.back();
        this.toastService.success('', response.message);
        //this.router.navigateByUrl('/pages/clinic-history/ch-record-list/1/2/1');
        this.messageError = null;
        if (this.saved) {
          this.saved();
        }
      } catch (response) {
        this.messageError = response;
        this.isSubmitted = false;
        this.loading = false;
        throw new Error(response);
      }
    }else{
      this.toastService.danger('Debe diligenciar la firma');
  
    }
      
    }

  RefreshData() {

    this.table.refresh();
  }

  NewAdmissions() {
    this.dialogFormService.open(FormClinicHistoryNursingComponent, {
      context: {
        title: 'Crear nuevo ingreso',
        user_id: this.user_id,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditAdmissions(data) {
    this.dialogFormService.open(FormClinicHistoryNursingComponent, {
      context: {
        title: 'Editar tipo de ingreso',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  tablock(e) {
    // console.log(e.tabTitle);
    switch (e.tabTitle) {
      case "INGRESO": {
        this.show = 1;
        break;
      }
      case "NOTA DE ENFERMERÍA": {
        this.show = 2;
        break;
      }
      case "VALORACIÓN DE LA PIEL": {
        this.show = 3;
        break;
      }
      case "ESCALAS": {
        this.show = 4;
        break;
      }
      case "APLICACIÓN DE MEDICAMENTOS": {
        this.show = 5;
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
