import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AssetsSelectRequestsComponent } from './assets-select-requests.component';
import { FixedAddService } from '../../../../business-controller/fixed-add.service';

@Component({
  selector: 'ngx-assets-requests-package',
  templateUrl: './assets-requests-package.component.html',
  styleUrls: ['./assets-requests-package.component.scss'],
})
export class AssetsRequestsPackageComponent implements OnInit {
  @ViewChild(BaseTableComponent) table: BaseTableComponent;

  @Output() messageEvent = new EventEmitter<any>();
  @Input() parentData: any = [];
  public messageError = null;


  public form: FormGroup;
  public title = 'ACTIVO';
  public subtitle = '';
  public headerFields: any[] = ['DESCRIPCIÓN', 'MARCA', 'MODELO', 'COLOR'];
  public routes = [];
  public row;
  public selectedOptions: any[] = [];
  public selectedOptions2: any[] = [];
  public emit: any[] = [];
  public data = [];
  public dialog;
  public inscriptionstatus = 0;
  public selectedRows: any;
  public inscriptionId;
  public entity;
  public billing_id: any[];
  public customData;

  public component_package_id: number;
  public done = false;
  public settings;

  public settings_supplies = {
    columns: {
      select: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (value, row) => {
          if (!this.done) {
            this.selectedOptions = this.parentData.selectedOptions;
            this.emit = this.parentData.selectedOptions;
            this.parentData.selectedOptions.forEach(x => {
              this.selectedOptions2.push(x.pharmacy_request_shipping);
            });
            this.done = true;
          }
          return {
            'data': row,
            'valid': (!this.selectedOptions2.includes(row.id)) ? false : true,
            'selection': (event, row: any) => this.eventSelections(event, row),
          };
        },
        renderComponent: AssetsSelectRequestsComponent,
      },
      fixed_nom_product: {
        title: this.headerFields[0],
        type: 'string',
        valuePrepareFunction: (value, row) => {
       return value.name;
        }
      
      },
      mark: {
        title: this.headerFields[1],
        type: 'string',
      },
      model: {
        title: this.headerFields[2],
        type: 'string',
      },
      color: {
        title: this.headerFields[3],
        type: 'string',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private toastS: NbToastrService,
    private e: ElementRef,
    private FixedAddS: FixedAddService
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.component_package_id = this.route.snapshot.params.id;
    this.selectedOptions = this.parentData.parentData;
    this.settings = this.settings_supplies;
    this.entity = this.parentData.entity;
    this.customData = this.parentData.customData;

  }

  eventSelections(event, row) {
    if (event) {
      this.selectedOptions2.push(row.id);
      var diet = {
        fixed_assets_id: row.id,
        amount: 0,
      };
      this.emit.push(diet);
    } else {
      this.emit = [];
      let i = this.selectedOptions2.indexOf(row.id);
      i !== -1 && this.selectedOptions2.splice(i, 1);
      var j = 0;
      this.selectedOptions.forEach(element => {
        if (this.selectedOptions2.includes(element.fixed_assets_id)) {
          this.emit.push(element);
        }
        j++;
      });
    }
    this.selectedOptions = this.emit;
    this.messageEvent.emit(this.selectedOptions);
    this.RefreshData();
  }

   RefreshData() {
    this.table.refresh();
  }

  ConfirmAction(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }
  saveGroup() {
    var contador = 0;
    var err = 0;
    if (!this.selectedOptions.length) {
      this.toastS.danger(null, 'Debe seleccionar al menos un medicamento');
    }
    else {
      var dta = {
        component_package_id: null,
        component_id: null,
      };
      this.selectedOptions.forEach(element => {
        dta.component_package_id = this.component_package_id;
        dta.component_id = element.id;
        this.FixedAddS.Save(dta).then(x => {
        }).catch(x => {
          err++;
        });
        contador++;
      });
      if (contador > 0) {
        this.toastS.success(null, 'Se actualizaron ' + contador + ' elemetos');
      } else if (err > 0) {
        this.toastS.danger(null, 'No se actualizaron ' + contador + ' elemetos');
      }
      this.RefreshData();
      this.selectedOptions = [];
    }
  }
}
