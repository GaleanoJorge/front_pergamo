import { AdmissionsService } from '../../../business-controller/admissions.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { DateFormatPipe } from '../../../pipe/date-format.pipe';
import { ConfirmDialogCHComponent } from '../clinic-history-list/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'ngx-ch-nutrition-list',
  templateUrl: './ch-nutrition-list.component.html',
  styleUrls: ['./ch-nutrition-list.component.scss'],
})
export class ChNutritionListComponent implements OnInit {

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() data: any = null;
  @Output() messageEvent = new EventEmitter<any>();

  linearMode = true;
  public messageError = null;
  public title;
  public subtitle = 'por usuario';
  public headerFields: any[] = ['Consecutivo de ingreso', 'Ruta', 'Ambito', 'Programa', 'Sede', 'Piso', 'Pabellón', 'Cama/Consultorio', 'Contrato', 'Fecha Ingreso', 'Fecha Egreso', 'Salida Medica'];
  public routes = [];
  public course;
  //public data = [];
  public user_id;
  public date_end: boolean = true;
  public is_failed: boolean = false;
  public show_failed: boolean = true;
  public cont = 0;
  public ambit;
  public program;
  public flat;
  public user;
  public own_user;
  public admission;
  public bed;
  public bed_id;
  public pavilion;
  public record_id;
  public redo = false;
  public isSubmitted: boolean = false;
  public saved: any = null;
  public loading: boolean = false;
  public currentRole: any;
  public show: any;
  public int = 0;
  public signatureImage: string;
  public has_input: any = null; // ya existe registro de ingreso
  public input_done: boolean = false; // ya se registró algo en el ingreso

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
    this.record_id = this.route.snapshot.params.id;
    this.currentRole = this.authService.GetRole();
    this.own_user = this.authService.GetUser();

    this.chRecord.GetCollection({
      record_id: this.record_id
    }).then(x => {
      this.redo = x[0]['assigned_management_plan'] ? x[0]['assigned_management_plan']['redo'] == 0 ? false : true: false;
      this.has_input = x[0]['has_input']; // se añade el resultado de la variable has_input
      if (this.has_input == true) { // si tiene ingreso se pone como true la variable que valida si ya se realizó el registro de ingreso para dejar finalizar la HC
        this.input_done = true;
      }
      this.admission = x[0]['admissions'];
      this.user = x[0]['admissions']['patients'];
      this.admission = x[0]['admissions'];
      this.title = 'Admisiones de paciente: ' + this.user.firstname + ' ' + this.user.lastname;
      if (this.admission.location.at(-1).scope_of_attention_id == 1) {
        this.show_failed = false;
      }
    });
  }

  close() {
    if (this.input_done) { // validamos si se realizó ingreso para dejar terminal la HC, de lo contrario enviamos un mensaje de alerta 
      this.deleteConfirmService.open(ConfirmDialogCHComponent, {
        context: {
          signature: true,
          title: 'Finalizar registro.',
          delete: this.finish.bind(this),
          showImage: this.showImage.bind(this),
          admission: this.admission,
          redo: this.redo,
          // save: this.saveSignature.bind(this),
          textConfirm: 'Finalizar registro'
        },
      });
    } else {
      this.toastService.warning('Debe diligenciar el ingreso', 'AVISO')
    }
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

  public back(): void {
    this.location.back();
  }
  
  async finish(firm) {
    if(this.admission.location[this.admission.location.length -1].admission_route_id != 1 ? !this.redo ? this.signatureImage!=null : true : true){
    var formData = new FormData();
    formData.append('id', this.record_id,);
    formData.append('status', 'CERRADO');
    formData.append('user', this.user);
    formData.append('role', this.currentRole);
    formData.append('user_id', this.own_user.id);
    formData.append('firm_file', this.signatureImage);

    try {

      let response;
    
        response = await this.chRecord.UpdateCH(formData, this.record_id).then(x => {
          this.location.back();
          this.toastService.success('', x.message);
          this.messageError = null;
          if (this.saved) {
            this.saved();
          }
          return Promise.resolve(true);
        }).catch(x => {
          this.showToast(10000, x);
          return Promise.resolve(false);
        });
        return Promise.resolve(response);
      
    } catch (response) {
      this.messageError = response;
      this.isSubmitted = false;
      this.loading = false;
      throw new Error(response);
    }
  }else{
      this.toastService.danger('Debe diligenciar la firma');
      return false;
    }
  
  }

  showToast(duration, m) {
    this.toastService.warning(
        '',
        m,
        { duration });
  }

  RefreshData() {

    this.table.refresh();
  }

  // ChangeState(data) {
  //   // data.status_id = data.status_id === 1 ? 2 : 1;

  //   this.toastrService.info('', 'Cambiando estado');

  //   this.regionS.Update(data).then((x) => {
  //     this.toastrService.success('', x.message);
  //     this.table.refresh();
  //   }).catch((x) => {
  //     this.toastrService.danger(x.message);
  //   });
  // }

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
      case "ESCALAS": {
        this.show = 3;
        break;
      }
      case "FALLIDA": {
        this.show = 9;
        break;
      }
    }
  }

  receiveMessage($event) {
    if ($event.is_failed == true) {
      this.is_failed = true;
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

    // recibe la señal de que se realizó un registro en alguna de las tablas de ingreso
    inputMessage($event) {
      this.input_done = true;
    }
}
