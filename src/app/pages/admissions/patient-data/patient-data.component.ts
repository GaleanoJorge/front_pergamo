import { PatientDataService } from '../../../business-controller/patient-data.service';
import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormPatientDataComponent } from './form-admissions-patient/form-patient-data.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AdmissionsService } from '../../../business-controller/admissions.service';
import { AffiliateTypeService } from '../../../business-controller/affiliate-type.service';
import { SpecialAttentionService } from '../../../business-controller/special-attention.service';
import { type } from 'os';
import { ActionsComponentED } from './actionsED.component';


@Component({
  selector: 'ngx-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss'],
})
export class PatientDataComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @Input() admission_id: number;
  public messageError = null;
  public title: string = 'Acompañantes / responsables por paciente';
  public headerFields: any[] = ['Tipo de acompañante', 'Tipo identificación', 'Identificación', 'Nombre', 'Correo', 'Dirección', 'Numero'];
  public routes = [];
  public data = [];
  public date_end: boolean = true;
  public cont = 0;
  public identification;
  public entity: string;
  public showDiv: boolean;
  public afiliatte_type: any[] = [];
  public special_attention: any[] = [];



  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'edit': this.EditPatientData.bind(this),
            'delete': this.DeleteConfirmPatientData.bind(this),
            'refresh': this.RefreshData.bind(this),
          };
        },
        renderComponent: ActionsComponentED,
      },
      patient_data_type: {
        title: this.headerFields[0],
        type: 'string',
      },
      identification_type_id: {
        title: this.headerFields[1],
        type: 'string',
        valuePrepareFunction(value,row) {
          return row?.identification_type.name;
        }
      },
      identification: {
        title: this.headerFields[2],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[3],
        type: 'string',
      },
      email: {
        title: this.headerFields[4],
        type: 'string',
      },
      phone: {
        title: this.headerFields[5],
        type: 'string',
      }
    },
  };

  constructor(
    private route: ActivatedRoute,
    private PatienDataS: PatientDataService,
    private router: Router,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private userBS: UserBusinessService,
  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      },
      {
        name: 'Admisiones del paciente',
        route: '../../admissions-patient/' + this.route.snapshot.params.user_id,
      },
      {
        name: 'acompañantes',
        route: '../../patient-data/' + this.route.snapshot.params.admissions_id,
      }
    ];
  }

  GetParams() {
    return {
      admissions_id: this.route.snapshot.params.admissions_id,
    };
  }

  async ngOnInit() {
    if(this.route.snapshot.params.admissions_id){
      this.admission_id= this.route.snapshot.params.admissions_id;
      this.entity = "PatientData/PatientDatabyAdmission/" + this.route.snapshot.params.admissions_id;
      this.routes = [];
    } else if (this.admission_id!=0) {
      this.entity = "PatientData/PatientDatabyAdmission/" + this.admission_id; 
      this.routes = [];
    } else {
      this.entity = "patient_data";
    }

  }

  RefreshData() {

    this.table.refresh();
  }

  NewPatientData() {
    this.dialogFormService.open(FormPatientDataComponent, {
      context: {
        title: 'Crear nuevo acompañante',
        showTable:true,
        savedUser:false,
        saved: this.RefreshData.bind(this),
        admission_id: this.admission_id,
      },
    });
  }

  EditPatientData(data) {
    this.dialogFormService.open(FormPatientDataComponent, {
      context: {
        title: 'Editar acompañante',
        data,
        showTable:true,
        savedUser:false,
        saved: this.RefreshData.bind(this),
      },
    });
  }

  DeleteConfirmPatientData(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeletePatientData.bind(this),
      },
    });
  }

  DeletePatientData(data) {
    return this.PatienDataS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }
}
