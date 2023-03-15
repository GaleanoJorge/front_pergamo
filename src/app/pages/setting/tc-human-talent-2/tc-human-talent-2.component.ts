import { Component, OnInit, ViewChild } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../../components/base-table/base-table.component';
import * as XLSX from 'ts-xlsx';
import { TcHumanTalent2Service } from '../../../business-controller/tc-human-talent-2.service';

@Component({
  selector: 'ngx-tc-human-talent-2',
  templateUrl: './tc-human-talent-2.component.html',
  styleUrls: ['./tc-human-talent-2.component.scss']
})
export class TcHumanTalent2Component implements OnInit {

  public isSubmitted = false;
  public messageError: string = null;
  public loading2: boolean = false;
  public arrayBuffer: any;
  public file: File;
  public title: string = 'Talento Humano';
  public subtitle: string = 'REGISTROS';
  public headerFields: any[] = ['nombre completo', 'identificacion', 'tipo documento', 'sexo', 'edad', 'honorarios', 'tipo de contrato', 'tipo de trabajo', 'ambito','centro de costo', 'codigo centro de costo', 'cargo', 'regional', 'mes', 'año'];
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
      full_name: {
        title: this.headerFields[0],
        type: 'string',
      },
      identification: {
        title: this.headerFields[1],
        type: 'string',
      },
      document_type: {
        title: this.headerFields[2],
        type: 'string',
      },
      gender: {
        title: this.headerFields[3],
        type: 'string',
      },
      age: {
        title: this.headerFields[4],
        type: 'string',
      },
      honorary: {
        title: this.headerFields[5],
        type: 'integer',
      },
      type_of_contract: {
        title: this.headerFields[6],
        type: 'string',
      },
      type_of_job: {
        title: this.headerFields[7],
        type: 'string',
      },
      ambit: {
        title: this.headerFields[8],
        type: 'string',
      },
      cost_center: {
        title: this.headerFields[9],
        type: 'string',
      },
      cost_center_code: {
        title: this.headerFields[10],
        type: 'string',
      },
      position: {
        title: this.headerFields[11],
        type: 'string',
      },
      area: {
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
      name: 'Talento Humano',
      route: '../../setting/tc-human-talent-2',
    },
  ];

  constructor(
    private TcHumanTalent2S: TcHumanTalent2Service,
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
      response = await this.TcHumanTalent2S.SaveFile(lectura);
      this.loading2 = false;
      this.toastrService.success('', response.message);
      this.RefreshData();
    } catch (e) {
      this.loading2 = false;
      throw new Error(e);
    }
  }
}




