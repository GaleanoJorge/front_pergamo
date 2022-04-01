import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, } from '@angular/router';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { Actions5Component } from './actions.component';
import { ChRecordService } from '../../../business-controller/ch_record.service';


@Component({
  selector: 'ngx-ch-record-list',
  templateUrl: './ch-record-list.component.html',
  styleUrls: ['./ch-record-list.component.scss'],
})
export class ChRecordListComponent implements OnInit {
  linearMode = true;
  public isSubmitted = false;
  public entity: string;
  public loading: boolean = false;
  public loading2: boolean = false;
  public category_id: number = null;
  public messageError: string = null;
  public title = "Registo Historia Clinica";
  public subtitle: string = '';
  public headerFields: any[] = ['Fecha de registro', 'Personal Asistencial', 'Estado'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public routes = [];
  public data = [];
  public admissions_id;
  public saved: any = null;
  public user;
  public user_id;
  public disabled: boolean = false;

  
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
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
          };
        },


        renderComponent: Actions5Component,
      },
      date_attention: {
        title: this.headerFields[0],
        width: 'string',
      },
      user_id: {
        title: this.headerFields[1],
        width: 'string',
      },
      status: {
        title: this.headerFields[2],
        width: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private chRecordS: ChRecordService,
    private toastService: NbToastrService,
    private userBS: UserBusinessService,
    private dialogService: NbDialogService,

  ) {
    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      },
      {
        name: 'Registro Histotia Clinica',
        route: '../../clinic-history/' + this.route.snapshot.params.user_id,
      },
    ];

  }

  GetParams() {
    return {
      admissions_id: this.route.snapshot.params.id,
    };
  }

  async ngOnInit() {
 
    this.admissions_id = this.route.snapshot.params.id;
    this.user_id = this.route.snapshot.params.user;

    await this.userBS.GetUserById(this.user_id).then(x => {
      this.user=x;
    });
 

  }

  RefreshData() {
    this.table.refresh();
  }

  NewChRecord() {
    this.chRecordS.Save({
      status: 'ACTIVO',
      admissions_id: this.admissions_id,
    }).then(x => {
      this.toastService.success('', x.message);
      this.RefreshData();
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });

  }

}