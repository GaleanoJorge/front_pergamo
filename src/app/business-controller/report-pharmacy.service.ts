import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { ReportPharmacy } from '../models/report-pharmacy';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { formatDate } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ReportPharmacyService {
  public report_pharmacy: ReportPharmacy[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportPharmacy[]> {
    let servObj = new ServiceObject(params ? 'report_pharmacy?pagination=false' : 'report_pharmacy');

    return this.webAPI.GetAction(servObj, params)
      .then((x) => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_pharmacy = <ReportPharmacy[]>servObj.data.report_pharmacy;
        return Promise.resolve(this.report_pharmacy);
      })
      .catch((x) => {
        throw x.message;
      });
  }

  Save(report_pharmacy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_pharmacy');
    servObj.data = report_pharmacy;
    return this.webAPI.PostAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      return Promise.resolve(servObj);
    })
      .catch((x) => {
        throw x.message;
      });
  }

  Update(report_pharmacy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_pharmacy', report_pharmacy.id);
    servObj.data = report_pharmacy;
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
    let servObj = new ServiceObject('report_pharmacy', id);
    return this.webAPI.DeleteAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      return Promise.resolve(servObj);
    })
      .catch((x) => {
        throw x.message;
      });
  }

  // Export Paso 2
  GetExportPharmacy(id, params = {}): Promise<ReportPharmacy[]> {
    let servObj = new ServiceObject('report_pharmacy/export', id);
    return this.webAPI.GetAction(servObj, params).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status) throw new Error(servObj.message);
      this.report_pharmacy = <ReportPharmacy[]>servObj.data.report_pharmacy;
      return Promise.resolve(this.report_pharmacy);
    }).catch((x) => {
      throw x.message;
    });
  }

  // Export Paso 3
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    //! Exportación de Excel con Librería ExcelJs
    //? Creando libro con hoja con propiedades
    let workbook = new Workbook();
    workbook.creator = 'Fabian Cabieles';
    let worksheet = workbook.addWorksheet("Stock Farmacia", {
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
      { header: 'ID', key: 'id', width: 5, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Solicitud', key: 'date', width: 20, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Farmacia', key: 'pharmacy', width: 28, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Solicitante', key: 'applicant', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Comercial ID', key: 'com_id', width: 14, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Génerico ID', key: 'gen_id', width: 14, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Medicamento Genérico', key: 'gen_medicine', width: 54, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Medicamento e Insumo Comercial', key: 'com_supp_medicine', width: 54, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cantidad', key: 'amount', width: 16, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Usuario', key: 'user', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Programa', key: 'program', width: 30, style: { alignment: { vertical: 'middle' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'EPS', key: 'company', width: 25, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Observación', key: 'obs', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    //? Comentarios normales
    // worksheet.getCell('E1').note = 'ID de Medicamento e Insumo Comercial';
    //? Comentarios formateados
    // worksheet.getCell('B1').note = {
    //   texts: [
    //     {'font': {'size': 10, 'color': {'theme': 0}, 'name': 'Calibri', 'family': 2, 'scheme': 'minor'}, 'text': 'This is '},
    //     {'font': {'italic': true, 'size': 12, 'color': {'theme': 0}, 'name': 'Calibri', 'scheme': 'minor'}, 'text': 'a'},
    //     {'font': {'size': 10, 'color': {'theme': 1}, 'name': 'Calibri', 'family': 2, 'scheme': 'minor'}, 'text': ' '},
    //     {'font': {'size': 10, 'color': {'argb': 'FFFF6600'}, 'name': 'Calibri', 'scheme': 'minor'}, 'text': 'colorful'},
    //     {'font': {'size': 10, 'color': {'theme': 1}, 'name': 'Calibri', 'family': 2, 'scheme': 'minor'}, 'text': ' text '},
    //     {'font': {'size': 10, 'color': {'argb': 'FFCCFFCC'}, 'name': 'Calibri', 'scheme': 'minor'}, 'text': 'with'},
    //     {'font': {'size': 10, 'color': {'theme': 1}, 'name': 'Calibri', 'family': 2, 'scheme': 'minor'}, 'text': ' in-cell '},
    //     {'font': {'bold': true, 'size': 10, 'color': {'theme': 1}, 'name': 'Calibri', 'family': 2, 'scheme': 'minor'}, 'text': 'format'},
    //   ],
    // };

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