import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { formatDate } from '@angular/common';
import { ReportExternalQuery } from '../models/report-external-query';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ReportExternalQueryService {
  public report_external_query: ReportExternalQuery[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportExternalQuery[]> {
    let servObj = new ServiceObject(params ? 'report_external_query?pagination=false' : 'report_external_query');

    return this.webAPI.GetAction(servObj, params)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_external_query = <ReportExternalQuery[]>servObj.data.report_external_query;
        return Promise.resolve(this.report_external_query);
      })
      .catch((x) => {
        throw x.message;
      });
  }

  Save(report_external_query: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_external_query');
    servObj.data = report_external_query;
    return this.webAPI.PostAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      return Promise.resolve(servObj);
    })
      .catch((x) => {
        throw x.message;
      });
  }

  Update(report_external_query: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_external_query', report_external_query.id);
    servObj.data = report_external_query;
    return this.webAPI.PutAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      return Promise.resolve(servObj);
    })
      .catch((x) => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_external_query', id);
    return this.webAPI.DeleteAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      return Promise.resolve(servObj);
    })
      .catch((x) => {
        throw x.message;
      });
  }

  GetExportPharmacy(id, params = {}): Promise<ReportExternalQuery[]> {
    let servObj = new ServiceObject('report_external_query/export', id);
    return this.webAPI.GetAction(servObj, params).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      this.report_external_query = <ReportExternalQuery[]>servObj.data.report_external_query;
      return Promise.resolve(this.report_external_query);
    }).catch((x) => {
      throw x.message;
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    //! Exportación de Excel con Librería ExcelJs
    //? Creando libro con hoja con propiedades
    let workbook = new Workbook();
    workbook.creator = 'Fabian Cabieles';
    let worksheet = workbook.addWorksheet("Consulta Externa", {
      properties: { tabColor: { argb: '54BCC1' } },
      //? Congela 1ra Fila
      views: [{ state: 'frozen', ySplit: 1 }],
      //? Quitar vista de Cuadricula
      // views: [{ showGridLines: false }],
    });

    //? Personalizando Encabezados
    worksheet.autoFilter = 'A1:N1';
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
      { header: 'Identificación del Paciente', key: 'identification', width: 22, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Paciente', key: 'patient', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Código', key: 'cod', width: 12, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Servicio', key: 'service', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Asistencial', key: 'applicant', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Sede', key: 'campus', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Estado', key: 'status', width: 14, style: { alignment: { vertical: 'middle' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Tipo de Recaudo', key: 'collection', width: 22, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Categoría', key: 'category', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor', key: 'value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Recibo', key: 'receipt', width: 12, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Cobro', key: 'payment_date', width: 18, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Recibe', key: 'receive', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Evolución', key: 'evolution', width: 16, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha Apertura', key: 'opening_date', width: 18, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha Cierre', key: 'closing_date', width: 18, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];

    //? Asignando archivo a cada hoja 
    for (let x1 of json) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    //? Escritura de Libro
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      const format = 'hh-mm-ss a';
      const formattedDate = formatDate(new Date(), format, 'es');
      FileSaver.saveAs(blob, excelFileName + formattedDate + ']' + EXCEL_EXTENSION);
    });
  }
}