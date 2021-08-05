import {Component, OnInit,ViewChild} from '@angular/core';
import {InscriptionStatus} from '../../../models/inscription-status';
import {InscriptionStatusBusinessService} from '../../../business-controller/inscription-status-business.service';
import {StatsComponent} from './stats.component';
import { ConcatPrograms } from './course/concat-programs';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import {ValidityService} from '../../../business-controller/validity.service';
import {OriginBusinessService} from '../../../business-controller/origin-business.service';
import {CategoryBusinessService} from '../../../business-controller/category-business.service';

@Component({
  selector: 'ngx-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  public messageError = null;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  public title = 'Discentes';
  public subtitle = 'Admisiones';
  public headerFields: any[] = ['Código', 'Programa', 'Curso', 'Sede'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}`;
  public validity = 0;
  public origin = 0;
  public category = 0;
  public validities = [];
  public origins = [];
  public categories = [];

  public routes = [
    {
      name: 'Admisiones Discentes',
      route: '/pages/admissions/students',
    },
  ];

  public inscriptionStatus: InscriptionStatus[] = [];

  public settings = {
    columns: {
      id: {
        title: 'Código',
        width: '5%',
      },
      program: {
        title: 'Programa',

        type: 'custom',
        valuePrepareFunction: (value, row) => {
          let date = new Date(row.finish_date);
          row.finish_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          return {
            'data': row,
          };
        },
        renderComponent: ConcatPrograms,
      },
      course: {
        title: 'Curso',
      },
      campus: {
        title: 'Sede',
      },
      pendiente: {
        title: '# Pendiente',
        sort: false,
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          return {
            'amount': this.GetAmount(row.stats, null),
            'data': row,
          };
        },
        renderComponent: StatsComponent,
      },
    },
  };

  public loading = true;

  constructor(
    private inscriptionStatusBs: InscriptionStatusBusinessService,
    private validityBS: ValidityService,
    private originBS: OriginBusinessService,
    private categoryBS: CategoryBusinessService,
  ) {

  }

  ngOnInit(): void {
    this.inscriptionStatusBs.GetCollection({
      pagination: false,
    }).then(x => {
      this.inscriptionStatus = x;

      this.inscriptionStatus.map(status => {
        this.settings.columns[status.name] = {
          title: '# ' + status.name,
          sort: false,
          type: 'custom',
          valuePrepareFunction: (value, row) => {
            return {
              'amount': this.GetAmount(row.stats, status.id),
              'data': row,
            };
          },
          renderComponent: StatsComponent,
        };
      });

      this.loading = false;
    }).catch(x => {
    });
    this.validityBS.GetCollection({
      pagination: false,
    }).then(x => {
      this.validities = x;
    });
  }
  getOrigins(validity_id) {
    this.originBS.GetCollection({
      validity_id,
      pagination: false,
    }).then(x => {
      this.origins = x;
    });
  }

  getCategories(origin_id) {
    this.categoryBS.GetByOrigin(origin_id, false).then(x => {
      this.categories = x;
    });
  }
  ChangeValidity(validity) {
    this.validity = validity;
    this.origin=0;
    this.category=0;
    this.table.changeEntity(`statsInscriptionsByFilter/${this.validity}/${this.origin}/${this.category}`);
    this.getOrigins(validity);
    // this.RefreshData();
}
ChangeOrigin(origin) {
  this.validity = 0;
  this.origin=origin;
  this.category=0;
  this.table.changeEntity(`statsInscriptionsByFilter/${this.validity}/${this.origin}/${this.category}`);
  this.getCategories(origin);
  // this.RefreshData();
}
ChangeCategory(category) {
  this.validity = 0;
  this.origin=0;
  this.category=category;
  this.table.changeEntity(`statsInscriptionsByFilter/${this.validity}/${this.origin}/${this.category}`);
  // this.RefreshData();
}
  GetAmount(stats, status_id) {
    let amount = {
      cant: 0,
      inscription_status_id: 'pendientes',
    };

    stats.map((stat) => {
      if (stat.inscription_status_id === status_id) {
        amount = stat;
      }
    });

    if (!amount.inscription_status_id) amount.inscription_status_id = 'pendientes';

    return amount;
  }

}
