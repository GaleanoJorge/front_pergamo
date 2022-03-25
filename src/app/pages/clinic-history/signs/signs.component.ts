import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ChVitalSignsService } from '../../../business-controller/ch-vital-signs.service';
import { Actions1Component } from './actions.component';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.scss'],
})
export class SignsListComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  linearMode = true;
  public messageError = null;
  public title: string = 's';
  public subtitle: string = 's';
  public headerFields: any[] = ['ID', '# contrato', 'Estado', 'Nombre'];
  public routes = [];
  public data = [];
  public record_id;
  public loading: boolean = false;
  public saved: any = null;
  public isSubmitted = false;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
  public settings = {
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'data': row,
          };
        },
        renderComponent: Actions1Component,
      },
      cardiac_frequency: {
        title: this.headerFields[0],
        type: 'string',
      },
      respiratory_frequency: {
        title: this.headerFields[1],
        type: 'string',
      },
      temperature: {
        title: this.headerFields[2],
        type: 'string',
      },
      oxigen_saturation: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  constructor(
    private chvitalSignsS: ChVitalSignsService,
    private route: ActivatedRoute,
    private toastService: NbToastrService,

  ) {

    this.routes = [
      {
        name: 'Pacientes',
        route: '../../list',
      }, {
        name: 'Registro Histotia Clinia',
        route: '../../clinic-history/' + this.route.snapshot.params.user_id,
      },
    ];
  }
  GetParams() {
    return {
      record_id: this.route.snapshot.params.id,
    };
  }

  ngOnInit(): void {
    this.record_id = this.route.snapshot.params.id;
  }

  RefreshData() {
    this.table.refresh();
  }

  NewChVitalSigns() {
    this.chvitalSignsS.Save({

      record_id: this.record_id,
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
