import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';
import { TcPareBaseService } from '../../../business-controller/tc-pare-base.service';

@Component({
  selector: 'ngx-tc-pare-base',
  templateUrl: './tc-pare-base.component.html',
  styleUrls: ['./tc-pare-base.component.scss']
})
export class TcPareBaseComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'BASE PURA';
  public subtitle: string = 'REGISTROS';
  public headerFields: any[] = ['Phone', 'Status Call', 'Agente', 'Date & Time', 'Duration(Seg)', 'Uniqueid', 'Cedula-RUC', 'First Name', 'Last Name', 'Observaciones', 'Cola'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[2]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      phone: {
        title: this.headerFields[0],
        type: 'string',
      },
      status_call: {
        title: this.headerFields[1],
        type: 'string',
      },
      agent: {
        title: this.headerFields[2],
        type: 'string',
      },
      date_time: {
        title: this.headerFields[3],
        type: 'string',
      },
      duration_seg: {
        title: this.headerFields[4],
        type: 'string',
      },
      uniqueid: {
        title: this.headerFields[5],
        type: 'string',
      },
      cedula_RUC: {
        title: this.headerFields[6],
        type: 'string',
      },
      first_name: {
        title: this.headerFields[7],
        type: 'string',
      },
      last_name: {
        title: this.headerFields[8],
        type: 'string',
      },
      observations: {
        title: this.headerFields[9],
        type: 'string',
      },
      fila: {
        title: this.headerFields[10],
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'Abandonos',
      route: '../../setting/tc-pare-base',
    },
  ];

  constructor(
    private TcPareBaseS: TcPareBaseService,
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
      response = await this.TcPareBaseS.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }
}




