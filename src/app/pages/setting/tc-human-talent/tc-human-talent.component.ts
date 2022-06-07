import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ActionsComponent } from '../sectional-council/actions.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import { TcHumanTalentService} from '../../../business-controller/tc-human-talent.service';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'ngx-tc-human-talent',
  templateUrl: './tc-human-talent.component.html',
  styleUrls: ['./tc-human-talent.component.scss']
})
export class TcHumanTalentComponent implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'TALENTO HUMANO';
  public subtitle: string = 'DÍAS';
  public headerFields: any[] = ['MES', 'ESTADO', 'TIPO DE CONTRATO',
    'NUMERO IDENTIFICACIÓN', 'TIPO ID', 'NOMBRES Y APELLIDOS', 'COSTO DEVENGADO', 'COSTO EMPLEADOR', 'COSTO PROVISIONES', 'HONORARIOS', 'NETO A PAGAR', 'P%', 'SEDE', 'AMBITO GENERAL', 'AMBITO ESPECÍFICO', 'AMBITO ESPECÍFICO 2', 'ESPECIALIDAD', 'CARGO', 'CONVENIO', 'DIRECCION', 'TIPO DE CUENTA', 'NUM CUENTA', 'BANCO', 'CODIGOBANCO'];
  public messageToltip: string = `Búsqueda por: ${this.headerFields[0]}, ${this.headerFields[1]}`;
  public icon: string = 'nb-star';
  public data = [];

  @ViewChild(BaseTableComponent) table: BaseTableComponent;
  public settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      period: {
        title: this.headerFields[0],
        type: 'string',
      },
      status: {
        title: this.headerFields[1],
        type: 'string',
      },
      contract: {
        title: this.headerFields[2],
        type: 'string',
      },
      nrodoc: {
        title: this.headerFields[3],
        type: 'string',
      },
      typedoc: {
        title: this.headerFields[4],
        type: 'string',
      },
      name: {
        title: this.headerFields[5],
        type: 'string',
      },
      accrued_cost: {
        title: this.headerFields[6],
        type: 'string',
      },
      employer_cost: {
        title: this.headerFields[7],
        type: 'string',
      },
      provision_cost: {
        title: this.headerFields[8],
        type: 'string',
      },
      total_cost: {
        title: this.headerFields[9],
        type: 'string',
      },
      net: {
        title: this.headerFields[10],
        type: 'string',
      },
      percent: {
        title: this.headerFields[11],
        type: 'string',
      },
      campus: {
        title: this.headerFields[12],
        type: 'string',
      },
      ambit_gen: {
        title: this.headerFields[13],
        type: 'string',
      },
      ambit_esp: {
        title: this.headerFields[14],
        type: 'string',
      },
      ambit_esp2: {
        title: this.headerFields[15],
        type: 'string',
      },
      specialty: {
        title: this.headerFields[16],
        type: 'string',
      },
      position: {
        title: this.headerFields[17],
        type: 'string',
      },
      agreement: {
        title: this.headerFields[18],
        type: 'string',
      },
      direction: {
        title: this.headerFields[19],
        type: 'string',
      },
      account_type: {
        title: this.headerFields[20],
        type: 'string',
      },
      nroaccount: {
        title: this.headerFields[21],
        type: 'string',
      },
      bank: {
        title: this.headerFields[22],
        type: 'string',
      },
      codbank: {
        title: this.headerFields[23],
        type: 'string',
      },
    },
  };

  public routes = [
    {
      name: 'Talento Humano',
      route: '../../setting/tc-human-talent',
    },
  ];
  //TcHumanTalentS: any;

  constructor(
    private toastrService: NbToastrService,
    private dialogFormService: NbDialogService,
    private deleteConfirmService: NbDialogService,
    private TcTalentHumanS: TcHumanTalentService,
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
      response = await this.TcTalentHumanS.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }

}
