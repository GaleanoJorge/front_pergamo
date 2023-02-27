import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';
import { TcServiceLevelService } from '../../../business-controller/tc-service-level.service';

@Component({
  selector: 'ngx-tc-service-level',
  templateUrl: './tc-service-level.component.html',
  styleUrls: ['./tc-service-level.component.scss']
})
export class TcServiceLevelComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'NIVEL DE SERVICIO';
  public subtitle: string = 'REGISTROS';
  public headerFields: any[] = ['COLA', '0 - 10', '11 - 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', 'MAYOR A 60', 'TOTAL LLAMADAS RECIBIDAS', 'CONTESTADAS ANTES DE 20 SEG', 'NIVEL DE SERVICIO'];
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
      line: {
        title: this.headerFields[0],
        type: 'string',
      },
      i0_10: {
        title: this.headerFields[1],
        type: 'string',
      },
      i11_20: {
        title: this.headerFields[2],
        type: 'string',
      },
      i21_30: {
        title: this.headerFields[3],
        type: 'string',
      },
      i31_40: {
        title: this.headerFields[4],
        type: 'string',
      },
      i41_50: {
        title: this.headerFields[5],
        type: 'string',
      },
      i51_60: {
        title: this.headerFields[6],
        type: 'string',
      },
      older_than_60: {
        title: this.headerFields[7],
        type: 'string',
      },
      total_calls_received: {
        title: this.headerFields[8],
        type: 'string',
      },
      replied_20: {
        title: this.headerFields[9],
        type: 'string',
      },
      service_level: {
        title: this.headerFields[10],
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'Abandonos',
      route: '../../setting/tc-service-level',
    },
  ];

  constructor(
    private TcServiceLevelS: TcServiceLevelService,
    private toastrService: NbToastrService,
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
      response = await this.TcServiceLevelS.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }
}




