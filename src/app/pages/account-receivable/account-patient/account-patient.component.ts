import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountPatientActionsComponent } from './account-patient-actions.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { AuthService } from '../../../services/auth.service';
import { RoleBusinessService } from '../../../business-controller/role-business.service';

@Component({
  selector: 'ngx-account-patient',
  templateUrl: './account-patient.component.html',
  styleUrls: ['./account-patient.component.scss'],
})
export class AccountPatientComponent implements OnInit {

  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title: string = 'Servicios por paciente';
  public subtitle: string = 'Pacintes';
  public headerFields: any[] = ['Tipo de documento', 'Número de documento', 'Nombre completo', 'Email', 'Ciudad', 'Barrio', 'Dirección'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public arrayBuffer: any;
  public file: File;
  public user_id;
  public patient_id;
  public user;
  public patients: any;
  public dialog;
  public currentRole;
  public selectedOptions: any[] = [];
  public company: any[] = [];
  public result: any = null;
  public eps_id = null;
  public campus_id;


  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public settings = {
    pager: {
      display: true,
      perPage: 30,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'user': this.user,
            'refresh': this.RefreshData.bind(this),
            'currentRole': this.currentRole.role_type_id,
          };
        },
        renderComponent: AccountPatientActionsComponent,
      },
      identification_type: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      nombre_completo: {
        title: this.headerFields[2],
        type: 'string',
      },
      email: {
        title: this.headerFields[3],
        type: 'string',
      },
      residence_municipality: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction(value) {
          return value?.name;
        },
      },
      residence_address: {
        title: this.headerFields[6],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Servicios por paciente',
      route: '../account-patient',
    },
  ];

  constructor(
    private authService: AuthService,
    public roleBS: RoleBusinessService,

  ) {
  }
  public status;
  public objetion_code_response: any[] = null;
  public objetion_response: any[] = null;
  public saved: any = null;




  async ngOnInit() {
    this.user = this.authService.GetUser();
    this.user_id = this.user.id;
    this.campus_id = +localStorage.getItem('campus');
    var curr = this.authService.GetRole();
    this.currentRole = this.user.roles.find(x => {
      return x.id == curr;
    });
    this.entity = 'account_receivable/getPatientsServices/0' + "?campus_id=" + this.campus_id;
    

  }

  RefreshData() {
    this.table.refresh();
  }
}
