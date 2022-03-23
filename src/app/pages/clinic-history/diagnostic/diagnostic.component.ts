import { UserBusinessService } from '../../../business-controller/user-business.service';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DiagnosisService } from '../../../business-controller/diagnosis.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Actions2Component } from './actions.component';
import { FormDiagnosticComponent } from './form-diagnostic/form-diagnostic.component';
import { ActivatedRoute } from '@angular/router';
import { ChDiagnosisService } from '../../../business-controller/ch-diagnosis.service';

@Component({
  selector: 'ngx-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss'],
})
export class DiagnosticListComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any;
  public messageError = null;
  public isSubmitted = false;
  public title: string = 'BUSCAR CIE10';
  public subtitle: string = 'SELECCIÓN MULTIPLE';
  public headerFields: any[] = ['ID', 'Código', 'Nombre'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];
  public flat;
  public sede;
  public selectedOptions2: any[] = [];
  public selectedOptions: any[] = [];
  public component_package_id: number;
  public routes = [];
  public dialog;

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    columns: {
      actions: {
        title: 'CHECK',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          // DATA FROM HERE GOES TO renderComponent
          return {
            'data': row,
            'valid': (!this.selectedOptions.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: Actions2Component,
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
    },
  };

  constructor(
    private route: ActivatedRoute,
    private dialogFormService: NbDialogService,
    private dialogService: NbDialogService,
    private chDiagnosticS: ChDiagnosisService,
  ) {
  }

  ngOnInit(): void {
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData;
  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions.push(row.id);
    } else {
      let i = this.selectedOptions.indexOf(row.id);
      i !== -1 && this.selectedOptions.splice(i, 1);
    }
    this.messageEvent.emit(this.selectedOptions);
  }

  RefreshData() {
    this.table.refresh();
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  NewDiagnosis() {
    this.dialogFormService.open(FormDiagnosticComponent, {
      context: {
        title: 'Crear nuevo diagnóstico',
        saved: this.RefreshData.bind(this),
      },
    });
  }
}