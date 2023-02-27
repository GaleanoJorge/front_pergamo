import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import { ReportCensus } from '../models/report-census';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { formatDate } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ReportCensusService {
  public report_census: ReportCensus[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportCensus[]> {
    let servObj = new ServiceObject(params ? 'report_census?pagination=false' : 'report_census');

    return this.webAPI.GetAction(servObj, params).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      this.report_census = <ReportCensus[]>servObj.data.report_census;
      return Promise.resolve(this.report_census);
    }).catch((x) => {
      throw x.message;
    });
  }

  Save(report_census: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_census');
    servObj.data = report_census;
    return this.webAPI.PostAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch((x) => {
      throw x.message;
    });
  }

  Update(report_census: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_census', report_census.id);
    servObj.data = report_census;
    return this.webAPI.PutAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch((x) => {
      throw x.message;
    });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_census', id);
    return this.webAPI.DeleteAction(servObj).then((x) => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch((x) => {
      throw x.message;
    });
  }

  exportCensusGeneral(): any {
    let servObj = new ServiceObject('report_censusPDFGeneral');
    return this.webAPI.GetAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  //? Trae todo el response()->json
  exportCensusPdf(id, params = {}): any {
    let servObj = new ServiceObject('report_censusPDF/export', id);
    return this.webAPI.GetAction(servObj, params).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  //?Trae la consulta directamente
  exportCensusExcel(id, params = {}): Promise<ReportCensus[]> {
    let servObj = new ServiceObject('report_censusEXCEL/export', id);
    return this.webAPI.GetAction(servObj, params).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      this.report_census = <ReportCensus[]>servObj.data.report_census;
      return Promise.resolve(this.report_census);
    }).catch((x) => {
      throw x.message;
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    //! Exportación de Excel con ExcelJs
    //? Creando libro y hojas con propiedades
    let workbook = new Workbook();
    workbook.creator = 'Fabian Cabieles';
    let worksheet = workbook.addWorksheet("Censo Hospitalario", {
      properties: { tabColor: { argb: '54BCC1' } },
      //? Congela 1ra Fila
      views: [{ state: 'frozen', ySplit: 1 }],
      //? Quitar vista de Cuadricula
      // views: [{ showGridLines: false }],
    });

    //? Personalizando Encabezados
    worksheet.autoFilter = 'A1:M1';
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
      { header: 'Prio', key: 'id', width: 7, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Pabellón', key: 'pavilion', width: 12, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cama', key: 'bed', width: 10, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Documento e Ingreso', key: 'identification', width: 22, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Paciente', key: 'patient', width: 34, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Edad', key: 'age', width: 12, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cod.', key: 'diag_cod', width: 12, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Diagnóstico', key: 'diag', width: 36, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Ingreso', key: 'entry_date', width: 22, style: { numFmt: 'd/mm/yyyy h:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Estancia: Días', key: 'entry_day', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'ARS-EPS', key: 'company', width: 25, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Contrato', key: 'contract', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Especialidad Tratante', key: 'specialy', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
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