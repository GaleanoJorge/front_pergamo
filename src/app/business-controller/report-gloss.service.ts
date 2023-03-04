import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { ReportGloss } from '../models/report_gloss';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportGlossService {
  public report_gloss: ReportGloss[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportGloss[]> {
    let servObj = new ServiceObject(params ? 'report_gloss?pagination=false' : 'report_gloss');

    return this.webAPI.GetAction(servObj, params).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      this.report_gloss = <ReportGloss[]>servObj.data.report_gloss;
      return Promise.resolve(this.report_gloss);
    }).catch(x => {
      throw x.message;
    });
  }

  Save(report_gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_gloss');
    servObj.data = report_gloss;
    return this.webAPI.PostAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  Update(report_gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_gloss', report_gloss.id);
    servObj.data = report_gloss;
    return this.webAPI.PutAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_gloss', id);
    return this.webAPI.DeleteAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  // Glossas
  // GetExportGloss(id, params = {}): Promise<ReportGloss[]> {
  //   let servObj = new ServiceObject('report_gloss/export', id);
  //   return this.webAPI.GetAction(servObj, params)
  //     .then(x => {
  //       servObj = <ServiceObject>x;
  //       if (!servObj.status)
  //         throw new Error(servObj.message);
  //       this.report_gloss = <ReportGloss[]>servObj.data.report_gloss;
  //       return Promise.resolve(this.report_gloss);
  //     })
  //     .catch(x => {
  //       throw x.message;
  //     });
  // }
  exportGloss(id, params = {}): any {
    let servObj = new ServiceObject('report_gloss/export', id);
    return this.webAPI.GetAction(servObj, params).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj.data);
    }).catch(x => {
      throw x.message;
    });
  }
  exportGlossGeneral(): any {
    let servObj = new ServiceObject('report_gloss_General');
    return this.webAPI.GetAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj.data);
    }).catch(x => {
      throw x.message;
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let workbook = new Workbook();
    workbook.creator = 'Fabian Cabieles';
    //! Hoja 1
    let worksheet = workbook.addWorksheet("Glosas", {
      properties: { tabColor: { argb: '54BCC1' } },
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    worksheet.autoFilter = 'A1:V1';
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
      { header: 'ID', key: 'gloss_id', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 }, } },
      { header: 'Prefijo de Factura', key: 'prefix_billing', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 }, } },
      { header: 'Consecutivo de Factura', key: 'consecutive_billing', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 }, } },
      { header: 'Tipo de Objeción', key: 'objection_type', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Repetición', key: 'objection_type', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Recibido', key: 'received_date', width: 18, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Emisión', key: 'emission_date', width: 18, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Radicado', key: 'filed_date', width: 18, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Entidad Administradora de Servicios', key: 'managing_entity', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'NIT', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Sede', key: 'campus', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Modalidad', key: 'modality', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Ámbito', key: 'ambit', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Servicio', key: 'service', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Objeción', key: 'objection', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Estado', key: 'status', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor Objetado', key: 'objected_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor de Factura', key: 'invoice_value', width: 22, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Régimen', key: 'regim', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Medio', key: 'received', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Identificación de Usuario', key: 'user_identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Detalle de Objeción', key: 'object_detail', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    for (let x1 of json['h1']) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    //! Hoja 2
    let worksheet2 = workbook.addWorksheet("Respuesta", {
      properties: { tabColor: { argb: '54BCC1' } },
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    worksheet2.autoFilter = 'A1:J1';
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
      { header: 'ID', key: 'num_billing', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Respuesta', key: 'response_date', width: 20, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Respuesta', key: 'response', width: 30, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor Aceptado', key: 'acepted_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor NO Aceptado', key: 'acepted_not_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Código de Objeción', key: 'quantity', width: 18, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Objeción', key: 'objection', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Tipo', key: 'objection_response', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Apellido de Usuario', key: 'lastname', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Nombre de Usuario', key: 'name', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    for (let x1 of json['h2']) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet2.addRow(temp)
    }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      let today = formatDate(new Date(), 'hh-mm-ss a', 'es');
      FileSaver.saveAs(blob, excelFileName + today + ']' + EXCEL_EXTENSION);
    });
  }
}