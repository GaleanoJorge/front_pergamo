import { Component, OnInit, ViewChild } from '@angular/core';
import { TcRadicationService } from '../../../business-controller/tc-radication.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';
import { TcRentabilityService } from '../../../business-controller/tc-rentability.service';

@Component({
  selector: 'ngx-tc-rentability',
  templateUrl: './tc-rentability.component.html',
  styleUrls: ['./tc-rentability.component.scss']
})
export class tcRentabilityComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'RENTABILIDAD';
  public subtitle: string = 'REGISTROS';
  public headerFields: any[] = ['CENTRO COSTO', 'CC1', 'CC2', 'CC3', 'CC4', 'AREA 1', 'AREA 2', 'AREA 3', 'AREA 4', 'NOMBRE CENTRO COSTO', 'CUENTA', 'NOMBRE CUENTA', 'VALOR', 'MES', 'AÑO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[13]}, ${this.headerFields[14]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      cost_center: {
        title: this.headerFields[0],
        type: 'string',
      },
      cc1: {
        title: this.headerFields[1],
        type: 'string',
      },
      cc2: {
        title: this.headerFields[2],
        type: 'string',
      },
      cc3: {
        title: this.headerFields[3],
        type: 'string',
      },
      cc4: {
        title: this.headerFields[4],
        type: 'string',
      },
      area1: {
        title: this.headerFields[5],
        type: 'string',
      },
      area2: {
        title: this.headerFields[6],
        type: 'string',
      },
      area3: {
        title: this.headerFields[7],
        type: 'string',
      },
      area4: {
        title: this.headerFields[8],
        type: 'string',
      },
      name_cost_center: {
        title: this.headerFields[9],
        type: 'string',
      }, 


       bill: {
        title: this.headerFields[10],
        type: 'string',
      }, 
       name_bill: {
        title: this.headerFields[11],
        type: 'string',
      },   
       value: {
        title: this.headerFields[12],
        type: 'string',
      },      
      month: {
        title: this.headerFields[13],
        type: 'string',
      },      
      year: {
        title: this.headerFields[14],
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'Rentabilidad',
      route: '../../setting/tc-rentability',
    },
  ];

  constructor(
    private TcRentabilityS: TcRentabilityService,
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
      response = await this.TcRentabilityS.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }
}




