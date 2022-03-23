import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  linearMode = true;
  public messageError = null;
  public title = "Registo Historia Clinica";
  public subtitle = 'Gestión';
  public headerFields: any[] = ['Fecha de registro', 'Personal Asistencial', 'Estado'];
  public routes = [];
  public data = [];
  public admissions_id;
  public saved: any = null;
  public loading: boolean = false;
  public isSubmitted: boolean = false;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'refresh': this.RefreshData.bind(this),
          };
        },

        renderComponent: Actions5Component,
      },
      date_attention: {
        title: this.headerFields[0],
        width: '5%',
      },
      user_id: {
        title: this.headerFields[1],
        width: '5%',
      },
      status: {
        title: this.headerFields[2],
        width: '5%',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private chRecordS: ChRecordService,
    private toastService: NbToastrService,
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

  ngOnInit(): void {
    this.admissions_id = this.route.snapshot.params.id;


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
      if (this.saved) {
        this.saved();
      }
    }).catch(x => {
      this.isSubmitted = false;
      this.loading = false;
    });
  }
 
}
