import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { ReportBilling } from '../models/report_billing';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportBillingService {
  public report_billing: ReportBilling[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportBilling[]> {
    let servObj = new ServiceObject(params ? 'report_billing?pagination=false' : 'report_billing');

    return this.webAPI.GetAction(servObj, params)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_billing = <ReportBilling[]>servObj.data.report_billing;
        return Promise.resolve(this.report_billing);
      })
      .catch((x) => {
        throw x.message;
      });
  }

  Save(report_billing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_billing');
    servObj.data = report_billing;
    return this.webAPI.PostAction(servObj)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch((x) => {
        throw x.message;
      });
  }

  Update(report_billing: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_billing', report_billing.id);
    servObj.data = report_billing;
    return this.webAPI.PutAction(servObj)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch((x) => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_billing', id);
    return this.webAPI.DeleteAction(servObj)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch((x) => {
        throw x.message;
      });
  }

  // Facturación
  GetExportBilling(id, params = {}): Promise<ReportBilling[]> {
    let servObj = new ServiceObject('report_billing/export', id);
    return this.webAPI.GetAction(servObj, params)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_billing = <ReportBilling[]>servObj.data.report_billing;
        return Promise.resolve(this.report_billing);
      })
      .catch((x) => {
        throw x.message;
      });
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let workbook = new Workbook();
    workbook.creator = 'Fabian Cabieles';
    //! Hoja 1
    let worksheet = workbook.addWorksheet("Facturadas", {
      properties: { tabColor: { argb: '54BCC1' } },
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    worksheet.autoFilter = 'A1:F1';
    worksheet.getRow(1).height = 60;
    worksheet.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getRow(1).fill = {
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: 'FFFFFF' } },
        { position: 0.5, color: { argb: '54BCC1' } },
        { position: 1, color: { argb: '54BCC1' } },
      ]
    };
    worksheet.columns = [
      { header: 'Número de Factura', key: 'num_billing', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 }, } },
      { header: 'Fecha de Facturación', key: 'billing_date', width: 20, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Identificación del Paciente', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Paciente', key: 'patient', width: 28, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Total Facturado', key: 'billing_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    for (let x1 of json['h1']) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    worksheet.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    //! Hoja 2
    let worksheet2 = workbook.addWorksheet("Anuladas", {
      properties: { tabColor: { argb: '54BCC1' } },
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    worksheet2.autoFilter = 'A1:I1';
    worksheet2.getRow(1).height = 60;
    worksheet2.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    worksheet2.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet2.getRow(1).fill = {
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: 'FFFFFF' } },
        { position: 0.5, color: { argb: '54BCC1' } },
        { position: 1, color: { argb: '54BCC1' } },
      ]
    };
    worksheet2.columns = [
      { header: 'Número de Factura', key: 'num_billing', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Facturación', key: 'billing_date', width: 20, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Identificación del Paciente', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Paciente', key: 'patient', width: 28, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Total Facturado', key: 'billing_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor del Procedimiento', key: 'manual_value', width: 24, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cantidad', key: 'quantity', width: 16, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Procedimiento', key: 'manual', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    for (let x1 of json['h2']) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet2.addRow(temp)
    }
    worksheet2.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    //! Hoja 3
    let worksheet3 = workbook.addWorksheet("Notas Crédito", {
      properties: { tabColor: { argb: '54BCC1' } },
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    worksheet3.autoFilter = 'A1:K1';
    worksheet3.getRow(1).height = 60;
    worksheet3.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    worksheet3.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet3.getRow(1).fill = {
      type: 'gradient',
      gradient: 'angle',
      degree: 90,
      stops: [
        { position: 0, color: { argb: 'FFFFFF' } },
        { position: 0.5, color: { argb: '54BCC1' } },
        { position: 1, color: { argb: '54BCC1' } },
      ]
    };
    worksheet3.columns = [
      { header: 'Prefijo de Factura', key: 'prefix_billing', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Consecutivo', key: 'conse', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Facturación', key: 'billing_date', width: 20, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Identificación de Paciente', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Paciente', key: 'patient', width: 28, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Total Facturado', key: 'billing_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor del Procedimiento', key: 'manual_value', width: 24, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cantidad', key: 'quantity', width: 16, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Procedimiento', key: 'manual', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Nota Crédito', key: 'credit_note', width: 14, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    for (let x1 of json['h3']) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet3.addRow(temp)
    }
    //? Comentarios
    worksheet3.getCell('D1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      let today = formatDate(new Date(), 'hh-mm-ss a', 'es');
      FileSaver.saveAs(blob, excelFileName + today + ']' + EXCEL_EXTENSION);
    });
  }
}