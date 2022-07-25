import { Component, OnInit, ViewChild } from '@angular/core';
import { TcCollectionService} from '../../../business-controller/tc-collection.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'ngx-tc-collection',
  templateUrl: './tc-collection.component.html',
  styleUrls: ['./tc-collection.component.scss']
})
export class TcCollectionComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'RECAUDO';
  public subtitle: string = 'REGISTROS';
  public headerFields: any[] = ['FECHA DE TRANSACCIÓN', 'PERIODO', 'NIT', 'ENTIDAD', 'VR. BANCOS'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[1]}, ${this.headerFields[3]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      transaction_date: {
        title: this.headerFields[0],
        type: 'string',
      },
      period: {
        title: this.headerFields[1],
        type: 'string',
      },
      nit: {
        title: this.headerFields[2],
        type: 'string',
      },
      entity: {
        title: this.headerFields[3],
        type: 'string',
      },
      bank_value: {
        title: this.headerFields[4],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Recaudo',
      route: '../../setting/tc-collection',
    },
  ];

  constructor(
    private TcCollectionS: TcCollectionService,
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
  }

  RefreshData() {

    this.table.refresh();
  }

  async saveFile(event) {
    if (event.target.files[0]) {
      this.loading2 = true;
      this.file = event.target.files[0];
      let lectura;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        lectura = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(lectura);
        this.uploadDocumentInfo(lectura);
      }
      fileReader.readAsArrayBuffer(this.file);
    }
  }

  async uploadDocumentInfo(lectura) {
    try {
      let response;
      response = await this.TcCollectionS.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }
}




