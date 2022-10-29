import { Component, OnInit, ViewChild } from '@angular/core';
import { BedService } from '../../../business-controller/bed.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormBedComponent } from './form-bed/form-bed.component';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { ActionsBedComponent } from './actions-bed.component';


@Component({
  selector: 'ngx-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Camas';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID','Código','Nombre','Pabellón','Piso','Sede','Estado', 'Procedimiento'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];
  public flat;
  public sede;
  public campus_id;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      actions: {
        title: 'Acciones',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          if (row.reservation_date) {
            var c = new Date(row.reservation_date).getTime();
            var d = new Date().getTime();
            var e = (d - c) / (60 * 60 * 1000);
            var show = e <= 6 ? true : false;
            if (show) {
              row.status_bed_id = 6;
              row.status_bed.name = 'Reservada';
            } else {
              row.status_bed_id = 1;
              row.status_bed.name = 'Libre';
            }
          }
          
          return {
            'data': row,
            'edit': this.EditBed.bind(this),
            'delete': this.DeleteConfirmBed.bind(this),
          };
        },
        renderComponent: ActionsBedComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      code: {
        title: this.headerFields[1],
        type: 'string',
      },
      name: {
        title: this.headerFields[2],
        type: 'string',
      },
      pavilion: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          this.flat=value.flat.name;
          this.sede=value.flat.campus.name;
          return value.name;
        },
      },
      flat: {
        title: this.headerFields[4],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.flat;
        },
      },
      campus: {
        title: this.headerFields[5],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return this.sede;
        },
      },
      procedure: {
        title: this.headerFields[7],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
      status_bed: {
        title: this.headerFields[6],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Camas',
      route: '../../setting/bed',
    },
  ];

  constructor(
    private BedS: BedService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.campus_id = +localStorage.getItem('campus');
  }

  RefreshData() {

    this.table.refresh();
  }

  NewBed() {
    this.dialogFormService.open(FormBedComponent, {
      context: {
        title: 'Crear nueva cama',
        saved: this.RefreshData.bind(this),
      },
    });
  }

  EditBed(data) {
    this.dialogFormService.open(FormBedComponent, {
      context: {
        title: 'Editar cama',
        data,
        saved: this.RefreshData.bind(this),
      },
    });
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

  DeleteConfirmBed(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteBed.bind(this),
      },
    });
  }

  DeleteBed(data) {
    return this.BedS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
