import { Component, OnInit, ViewChild } from '@angular/core';
import { TcAssistantService } from '../../../business-controller/tc-assistant.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'ngx-tc-assistant',
  templateUrl: './tc-assistant.component.html',
  styleUrls: ['./tc-assistant.component.scss']
})
export class TcAssistantComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'AUXILIARES';
  public subtitle: string = 'REGISTROS';
  public headerFields: any[] = ['Numero agente', 'Agent Name', 'Hold', 'Almuerzo', 'Break Am', 'Break Pm', 'Llamada Saliente', 'Baño', 'Whatsapp', 'Atención al usuario', 'Reunion','Total'];
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
      agent_number: {
        title: this.headerFields[0],
        type: 'string',
      },
      agent_name: {
        title: this.headerFields[1],
        type: 'string',
      },
      hold: {
        title: this.headerFields[2],
        type: 'string',
      },
      lunch: {
        title: this.headerFields[3],
        type: 'string',
      },
      break_am: {
        title: this.headerFields[4],
        type: 'string',
      },
      break_pm: {
        title: this.headerFields[5],
        type: 'string',
      },
      outgoing_call: {
        title: this.headerFields[6],
        type: 'string',
      },
      bathroom: {
        title: this.headerFields[7],
        type: 'string',
      },
      whatsapp: {
        title: this.headerFields[8],
        type: 'string',
      },
      user_attention: {
        title: this.headerFields[9],
        type: 'string',
      },
      meeting: {
        title: this.headerFields[10],
        type: 'string',
      },
      total: {
        title: this.headerFields[11],
        type: 'string',
      }
    },
  };

  public routes = [
    {
      name: 'Radicación',
      route: '../../setting/tc-assistant',
    },
  ];

  constructor(
    private TcAssistantS: TcAssistantService,
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
      response = await this.TcAssistantS.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }
}




