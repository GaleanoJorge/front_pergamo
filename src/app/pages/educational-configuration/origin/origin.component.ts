import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {OriginBusinessService} from '../../../business-controller/origin-business.service';
import {NbToastrService, NbDialogService} from '@nebular/theme';
import {ActionsOriginComponent} from '.././origin/actions-origin.component';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {BaseTableComponent} from '../../components/base-table/base-table.component';
import {NewCategoryService} from '../../../business-controller/new-category.service';

@Component({
  selector: 'ngx-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
})
export class OriginComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public title: string = 'Plan de formación';
  public title2: string = '2';
  public subtitle: string = 'Gestión';
  public headerFields: any[] = ['ID', 'Nombre', 'Descripción', 'Vigencia', 'Creador'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}, ${this.headerFields[3]}, ${this.headerFields[4]}`;
  public icon: string = 'nb-star';
  public data = [];
  public programs = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  @ViewChild('myDiv') myDiv: ElementRef;

  public settings = {
    columns: {
      actions: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'delete': this.DeleteConfirmOrigin.bind(this),
          };
        },
        renderComponent: ActionsOriginComponent,
      },
      id: {
        title: this.headerFields[0],
        type: 'string',
      },
      name: {
        title: this.headerFields[1],
        type: 'string',
      },
      description: {
        title: this.headerFields[2],
        type: 'string',
      },
      validity: {
        title: this.headerFields[3],
        type: 'string',
        valuePrepareFunction: (value, row) => {
          return value.name;
        },
      },
    },
  };

  public routes = [
    {
      name: 'Plan de formación',
      route: '../../educational-configuration/origin',
    },
  ];

  constructor(
    private originBS: OriginBusinessService,
    private categoryBS: NewCategoryService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  DeleteConfirmOrigin(data) {
    this.deleteConfirmService.open(ConfirmDialogComponent, {
      context: {
        name: data.name,
        data: data,
        delete: this.DeleteOrigin.bind(this),
      },
    });
  }

  DeleteOrigin(data) {
    return this.originBS.Delete(data.id).then(x => {
      this.table.refresh();
      return Promise.resolve(x.message);
    }).catch(x => {
      throw x;
    });
  }

}
