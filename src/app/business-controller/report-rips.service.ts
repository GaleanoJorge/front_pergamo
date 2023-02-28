import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { ReportRips } from '../models/report-rips';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
registerLocaleData(localeES, "es");
@Injectable({
  providedIn: 'root'
})
export class ReportRipsService {
  public report_rips: ReportRips[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportRips[]> {
    let servObj = new ServiceObject(params ? 'report_rips?pagination=false' : 'report_rips');

    return this.webAPI.GetAction(servObj, params).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      this.report_rips = <ReportRips[]>servObj.data.report_rips;
      return Promise.resolve(this.report_rips);
    }).catch(x => {
      throw x.message;
    });
  }

  Save(report_rips: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_rips');
    servObj.data = report_rips;
    return this.webAPI.PostAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  Update(report_rips: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_rips', report_rips.id);
    servObj.data = report_rips;
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
    let servObj = new ServiceObject('report_rips', id);
    return this.webAPI.DeleteAction(servObj).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      return Promise.resolve(servObj);
    }).catch(x => {
      throw x.message;
    });
  }

  GetExportRips(id, params = {}): Promise<ReportRips[]> {
    let servObj = new ServiceObject('report_rips/export', id);
    return this.webAPI.GetAction(servObj, params).then(x => {
      servObj = <ServiceObject>x;
      if (!servObj.status)
        throw new Error(servObj.message);
      this.report_rips = <ReportRips[]>servObj.data;
      return Promise.resolve(this.report_rips);
    }).catch(x => {
      throw x.message;
    });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let workbook = new Workbook();
    workbook.creator = 'Fabian Cabieles';

    let worksheet = workbook.addWorksheet("Rips", {
      properties: { tabColor: { argb: '54BCC1' } },
      views: [{ state: 'frozen', ySplit: 1 }],
      headerFooter: { firstHeader: "PERGAMO", firstFooter: "RIPS" }
    });
    worksheet.autoFilter = 'A1:AA1';
    worksheet.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    worksheet.getRow(1).height = 60;
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
      { header: 'ID', key: 'abp_id', width: 10, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Factura', key: 'billing', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Factura', key: 'billing_date', width: 18, style: { numFmt: 'd/mm/yyyy H:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Fecha de Servicio', key: 'service_date', width: 18, style: { numFmt: 'd/mm/yyyy H:mm', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Identificación de Paciente', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Régimen', key: 'regi', width: 16, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Primer Apellido', key: 'lastname', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Segundo Apellido', key: 'lastname_', width: 17, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Primer Nombre', key: 'name_first', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Segundo Nombre', key: 'name_second', width: 17, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Edad', key: 'age', width: 9, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Unidad de Medida de Edad', key: 'unity_age', width: 16, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Género', key: 'genre', width: 12, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Código del Departamento Residencial', key: 'dep_cod', width: 20, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Código del Municipio Residencial', key: 'mun_cod', width: 20, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Zona Residencial', key: 'zone', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cums-Cups', key: 'cups_cums', width: 15, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Procedimiento', key: 'procedure', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      // { header: 'Diagnóstico', key: 'diagnosis', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Autorización ID', key: 'auth_id', width: 17, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Paquete ID', key: 'pack_id', width: 12, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Cantidad', key: 'quantity', width: 15, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor Unitario', key: 'unitary_values', width: 15, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'COPAGO', key: 'copay_value', width: 15, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Valor Total', key: 'total_values', width: 15, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Entidad Administradora', key: 'company', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
      { header: 'Código', key: 'admin_cod', width: 12, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    ];
    for (let x1 of json['rips']) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    //? Comentarios
    worksheet.getCell('G1').note = '[1 = Contributivo], [2 = Subsidiado]';
    worksheet.getCell('E1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    worksheet.getCell('M1').note = '[1 = Años], [2 = Meses], [3 = Días]';
    worksheet.getCell('N1').note = '[M = Masculino], [F = Femenino]';
    worksheet.getCell('Q1').note = '[U = Urbana], [R = Rural], [UD = Urbana Dispersa], [RD = Rural Dispersa]';

    //! Hoja 1 - Archivo de Usuarios
    // let worksheet = workbook.addWorksheet("US", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    //   headerFooter: { firstHeader: "PERGAMO", firstFooter: "RIPS" }
    // });
    // worksheet.autoFilter = 'A1:N1';
    // worksheet.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet.getRow(1).height = 60;
    // worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet.columns = [
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código de Entidad Administradora', key: 'admin_cod', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Usuario', key: 'user_type', width: 15, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Primer Apellido', key: 'lastname', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Segundo Apellido', key: 'lastname_', width: 17, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Primer Nombre', key: 'name', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Segundo Nombre', key: 'name_', width: 17, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Edad', key: 'age', width: 9, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Unidad de Medida de Edad', key: 'quantity', width: 16, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Sexo', key: 'genre', width: 8, style: { alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Departamento Residencial', key: 'dep_cod', width: 20, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Municipal Residencial', key: 'mun_cod', width: 20, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Zona Residencial', key: 'zone', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h1']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet.addRow(temp)
    // }
    // //? Comentarios
    // worksheet.getCell('A1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // worksheet.getCell('D1').note = '[1 = Contributivo], [2 = Subsidiado], [3 = Vinculado], [4 = Particular], [5 = Otro], [6 = Desplazado Contributivo], [7 = Desplazado Subsidiado], [8 = Desplazado no Asegurado]';
    // worksheet.getCell('J1').note = '[1 = Años], [2 = Meses], [3 = Días]';
    // worksheet.getCell('K1').note = '[M = Masculino], [F = Femenino]';
    // worksheet.getCell('N1').note = '[U = Urbana], [R = Rural]';
    // //! Hoja 2 - Archivo de Consulta
    // let worksheet2 = workbook.addWorksheet("AC", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet2.autoFilter = 'A1:Q1';
    // worksheet2.headerFooter.oddHeader = "&C&B&KCCCCCC&\"Open Sans\"Pergamo&D&T&20";
    // worksheet2.getRow(1).height = 60;
    // worksheet2.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet2.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet2.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet2.columns = [
    //   { header: 'Número de Factura', key: 'billing_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha de Consulta', key: 'query_date', width: 16, style: { numFmt: 'd/mm/yyyy h:mm AM/PM', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número de Autorización', key: 'auth_num', width: 20, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código de Consulta', key: 'query_cod', width: 16, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Finalidad de Consulta', key: 'query_final', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Causa Externa', key: 'external_cause', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Principal', key: 'diag_prin_cod', width: 18, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado N°1', key: 'diag_rela1_cod', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado N°2', key: 'diag_rela2_cod', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado N°3', key: 'diag_rela3_cod', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Diagnóstico', key: 'diag_type', width: 20, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor de Consulta', key: 'query_value', width: 18, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor de Cuota Moderadora', key: 'due_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Neto', key: 'net_value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h2']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet2.addRow(temp)
    // }
    // //? Comentarios
    // worksheet2.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // worksheet2.getCell('H1').note = {
    //   texts: [
    //     {
    //       'font': { 'size': 7, 'color': { 'theme': 1 }, 'name': 'Arial', 'scheme': 'minor' },
    //       'text': '[1 = Atención del parto(Atención del embarazo y del postparto)], [2 = Atención Recién Nacido], [3 = Atención Planificación familiar], [4 = Detección alteraciones de crecimiento y desarrollo en menor de 10 años], [5 = Detección de alteración del desarrollo joven], [6 = Detección de alteraciones del embarazo], [7 = Detección de alteraciones del adulto], [8 = Detección de alteracions de agudeza visual], [9 = Detección de Enfermedad Profesional], [10 = No aplica]'
    //     },
    //   ],
    //   margins: {
    //     insetmode: 'custom',
    //     inset: [0.25, 0.25, 0.25, 0.25]
    //   },
    //   editAs: 'twoCells',
    // };
    // worksheet2.getCell('I1').note = {
    //   texts: [
    //     {
    //       'font': { 'size': 7, 'color': { 'theme': 1 }, 'name': 'Arial', 'scheme': 'minor' },
    //       'text': '[1 = Accidente de trabajo(Atención del embarazo y el Postparto)], [2 = Accidente de tránsito], [3 = Accidente rábico], [4 = Accidente ofídico], [5 = Otro tipo de accidente], [6 = Evento catatrósfico], [7 = Lesión por agresión, 8 = Lesón auto infligida],[9 = Sospecha de maltrato físico], [10 = Sospecha de abuso sexual], [11 = Sospecha de violencia sexual], [12 = Sospecha de maltrato emocional], [13 = Enfermedad general], [14 = Enfermedad profesional], [15 = Otra]'
    //     },
    //   ],
    //   margins: {
    //     insetmode: 'custom',
    //     inset: [0.25, 0.25, 0.25, 0.25]
    //   },
    //   editAs: 'twoCells',
    // };
    // worksheet2.getCell('N1').note = '[1 = Impresión Diagnóstica], [2 = Confirmado nuevo], [3 = Confirmado repetido]';
    // //! Hoja 3 - Archivo de Procedimientos
    // let worksheet3 = workbook.addWorksheet("AP", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet3.autoFilter = 'A1:O1';
    // worksheet3.getRow(1).height = 60;
    // worksheet3.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet3.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet3.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet3.columns = [
    //   { header: 'Número de Factura', key: 'billing_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 26, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha del Procedimiento', key: 'process_date', width: 22, style: { numFmt: 'd/mm/yyyy h:mm AM/PM', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número de Autorización', key: 'auth_num', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Procedimiento', key: 'process_cod', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Ámbito de Realización del Procedimiento', key: 'process_ambit', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Finalidad de Procedimiento', key: 'process_end', width: 22, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Personal que Atiende', key: 'staff', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Principal', key: 'diag_prin_cod', width: 22, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado', key: 'diag_rela_cod', width: 24, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico de Complicación', key: 'diag_compli_cod', width: 26, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Forma de Realización del Acto Quirúrgico', key: 'surgical_form', width: 32, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor del Procedimiento', key: 'process_value', width: 22, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h3']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet3.addRow(temp)
    // }
    // //? Comentarios
    // worksheet3.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // worksheet3.getCell('H1').note = '[1 = Ambulatorio], [2 = Hospitalario], [3 = Urgencias]';
    // worksheet3.getCell('I1').note = {
    //   texts: [
    //     {
    //       'font': { 'size': 7, 'color': { 'theme': 1 }, 'name': 'Arial', 'scheme': 'minor' },
    //       'text': '[1 = Diagnóstico], [2 = Terapeútico], [3 = Protección Específica], [4 = Detección Temprana en Enfermedad General], [5 = Detección Temprana en Enfermedad Profesional], [6 = Promover la Salud Integral en los Niños, Niñas, Adolescentes y Jóvenes], [7 = Promover la Salud Sexual y Reproductiva], [8 = Promover la Salud en la Tercera Edad], [9 = Promover la Convivencia Pacífica con Énfasis en el Ámbito Intrafamiliar], [10 = Desestimular la Exposición al Tabaco, al Alcohol y a las Sustancias Psicoactivas], [11 = Promover las Condiciones Sanitarias del Ambiente Intradomiciliario], [12 = Incrementar el Conocimiento de los Afiliados en los Derechos y Deberes], [13 = Promover la Lactancia Materna], [14 = Promoción de la Salud Enfermedades Crónicas], [15 = Control o Seguimiento de Crónicas], [16 = Promoción de Hábitos Alimentarios], [17 = Detección de Alteraciones en la Gestante]'
    //     },
    //   ],
    //   margins: {
    //     insetmode: 'custom',
    //     inset: [0.25, 0.25, 0.25, 0.25]
    //   },
    //   editAs: 'absolute',
    // };
    // worksheet3.getCell('J1').note = '[1 = Médico Especialista], [2 = Médico General], [3 = Enfermera], [4 = Auxiliar de Enfermera], [5 = Otro]';
    // worksheet3.getCell('N1').note = {
    //   texts: [
    //     {
    //       'font': { 'size': 6, 'color': { 'theme': 1 }, 'name': 'Arial', 'scheme': 'minor' },
    //       'text': '[1 = Unico o Unilateral], [2 = Multiple o Bilateral, misma vía. Diferente Especialidad], [3 = Múltiple o Bilateral, misma vía. Igual Especialidad], [4 = Múltiple o Bilateral, diferente vía. Diferente Especialidad], [5 = Múltiple o Bilateral, diferente vía. Igual Especialidad]'
    //     },
    //   ],
    //   margins: {
    //     insetmode: 'custom',
    //     inset: [0.25, 0.25, 0.25, 0.25]
    //   },
    //   editAs: 'twoCells',
    // };
    // //! Hoja 4 - Archivo de Otros Servicios
    // let worksheet4 = workbook.addWorksheet("AT", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet4.autoFilter = 'A1:K1';
    // worksheet4.getRow(1).height = 60;
    // worksheet4.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet4.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet4.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet4.columns = [
    //   { header: 'Número de Factura', key: 'billing_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 26, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número de Autorización', key: 'auth_num', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Servicio', key: 'service_type', width: 16, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código de Servicio', key: 'service_cod', width: 16, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Nombre del Servicio', key: 'service_name', width: 30, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Cantidad', key: 'quantity', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Unitario del Material e Insumo', key: 'unitary_value', width: 20, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Total', key: 'total_value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h4']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet4.addRow(temp)
    // }
    // //? Comentarios
    // worksheet4.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // worksheet4.getCell('F1').note = '[1 = Materiales e Insumos], [2 = Traslados], [3 = Estancias], [4 = Honorarios], [5 = Derechos de Sala]';
    // //! Hoja 5 - Archivo de Medicamentos
    // let worksheet5 = workbook.addWorksheet("AM", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet5.autoFilter = 'A1:N1';
    // worksheet5.getRow(1).height = 60;
    // worksheet5.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet5.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet5.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet5.columns = [
    //   { header: 'Número de Factura', key: 'billing_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 26, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número de Autorización', key: 'auth_num', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Medicamento', key: 'medicine_cod', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Medicamento', key: 'medicine_type', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Forma Farmaceútica', key: 'pharm_form', width: 22, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Nombre Génerico del Medicamento', key: 'medicine_name', width: 28, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Concentración', key: 'concentration', width: 24, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Unidad de Medida', key: 'extent_unit', width: 18, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Unidades', key: 'units', width: 16, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Unitario', key: 'unitary_value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Total', key: 'total_value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h5']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet5.addRow(temp)
    // }
    // //? Comentarios
    // worksheet5.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // worksheet5.getCell('F1').note = '[Farmacológico y Administrativo]';
    // worksheet5.getCell('G1').note = '[1 = POS], [2 = No POS]';
    // //! Hoja 6 - Archivo de Hospitalización
    // let worksheet6 = workbook.addWorksheet("AH", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet6.autoFilter = 'A1:S1';
    // worksheet6.getRow(1).height = 60;
    // worksheet6.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet6.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet6.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet6.columns = [
    //   { header: 'Número de Factura', key: 'billing_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 26, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación de Usuario', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Vía de Ingreso a la Institución', key: 'route', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha de Ingreso', key: 'date_entry', width: 18, style: { numFmt: 'd/mm/yyyy', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Hora de Ingreso', key: 'hour_entry', width: 18, style: { numFmt: 'h:mm AM/PM', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Autorización', key: 'auth', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Causa Externa', key: 'extern_cause', width: 16, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Diagnóstico Principal de Ingreso', key: 'diag_entry', width: 20, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Diagnóstico Principal de Egreso', key: 'diag_discharge', width: 20, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado N°1', key: 'diag_rela1_cod', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado N°2', key: 'diag_rela2_cod', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Diagnóstico Relacionado N°3', key: 'diag_rela3_cod', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Diagnóstico de Complicación', key: 'complication_diag', width: 26, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Estado de Salida', key: 'exit_status', width: 16, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Diagnóstico de Salida', key: 'exit_diag', width: 28, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha de Egreso', key: 'discharge_date', width: 20, style: { numFmt: 'd/mm/yyyy', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Hora de Egreso', key: 'discharge_hour', width: 20, style: { numFmt: 'h:mm AM/PM', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h6']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet6.addRow(temp)
    // }
    // //? Comentarios
    // worksheet6.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // worksheet6.getCell('E1').note = '[1 = Urgencias], [2 = Consulta Externa o Programada], [3 = Remitido], 4 = [Nacido en la Institución]';
    // worksheet6.getCell('I1').note = {
    //   texts: [
    //     {
    //       'font': { 'size': 7, 'color': { 'theme': 1 }, 'name': 'Arial', 'scheme': 'minor' },
    //       'text': '[1 = Accidente de trabajo(Atención del embarazo y el Postparto)], [2 = Accidente de tránsito], [3 = Accidente rábico], [4 = Accidente ofídico], [5 = Otro tipo de accidente], [6 = Evento catatrósfico], [7 = Lesión por agresión, 8 = Lesón auto infligida],[9 = Sospecha de maltrato físico], [10 = Sospecha de abuso sexual], [11 = Sospecha de violencia sexual], [12 = Sospecha de maltrato emocional], [13 = Enfermedad general], [14 = Enfermedad profesional], [15 = Otra]'
    //     },
    //   ],
    //   margins: {
    //     insetmode: 'custom',
    //     inset: [0.25, 0.25, 0.25, 0.25]
    //   },
    //   editAs: 'twoCells',
    // };
    // worksheet6.getCell('P1').note = '[1 = Vivo], [2 = Muerto]';
    // //! Hoja 7 - Archivo de Transacciones
    // let worksheet7 = workbook.addWorksheet("AF", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet7.autoFilter = 'A1:Q1';
    // worksheet7.getRow(1).height = 60;
    // worksheet7.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet7.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet7.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet7.columns = [
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Razón Social o Nombre', key: 'name', width: 20, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Tipo de Identificación', key: 'it', width: 22, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Identificación', key: 'identification', width: 22, style: { numFmt: '#', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número de Factura', key: 'billing_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha de Expedición Factura', key: 'billing_date', width: 18, style: { numFmt: 'd/mm/yyyy', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha Inicial', key: 'initial_date', width: 18, style: { numFmt: 'd/mm/yyyy', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha Final', key: 'final_date', width: 18, style: { numFmt: 'd/mm/yyyy', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código de Entidad Administradora', key: 'entity_cod', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Nombre de Entidad', key: 'entity_name', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número del Contrato', key: 'contract_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Plan de Beneficios', key: 'benefits_plan', width: 18, style: { alignment: { vertical: 'middle', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Número de Poliza', key: 'policy_num', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Copago', key: 'copay_value', width: 14, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Comisión', key: 'commission_value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Descuentos', key: 'discount_value', width: 19, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Valor Neto', key: 'net_value', width: 16, style: { numFmt: '"$"#,##0.00;[Red]\-"$"#,##0.00', alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h7']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet7.addRow(temp)
    // }
    // worksheet7.getCell('C1').note = '[CC], [CE], [PA], [RC], [TI], [AS], [MS]';
    // //! Hoja 8 - Archivo de Control
    // let worksheet8 = workbook.addWorksheet("CT", {
    //   properties: { tabColor: { argb: '54BCC1' } },
    //   views: [{ state: 'frozen', ySplit: 1 }],
    // });
    // worksheet8.autoFilter = 'A1:D1';
    // worksheet8.getRow(1).height = 60;
    // worksheet8.getRow(1).font = { name: 'Open Sans', color: { argb: '6C757D' }, size: 11, bold: true };
    // worksheet8.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    // worksheet8.getRow(1).fill = {
    //   type: 'gradient',
    //   gradient: 'angle',
    //   degree: 90,
    //   stops: [
    //     { position: 0, color: { argb: 'FFFFFF' } },
    //     { position: 0.5, color: { argb: '54BCC1' } },
    //     { position: 1, color: { argb: '54BCC1' } },
    //   ]
    // };
    // worksheet8.columns = [
    //   { header: 'Código del Prestador de Servicios', key: 'service_cod', width: 24, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Fecha de Remisión', key: 'remission_date', width: 18, style: { numFmt: 'd/mm/yyyy', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Código del Archivo', key: 'archive_cod', width: 18, style: { alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    //   { header: 'Total de Registros', key: 'registry_total', width: 16, style: { numFmt: '0', alignment: { vertical: 'middle', horizontal: 'center' }, font: { name: 'Open Sans', color: { argb: '6C757D' }, size: 10 } } },
    // ];
    // for (let x1 of json['h8']) {
    //   let x2 = Object.keys(x1);
    //   let temp = []
    //   for (let y of x2) {
    //     temp.push(x1[y])
    //   }
    //   worksheet8.addRow(temp)
    // }

    //? Escritura de Libro
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      let today = formatDate(new Date(), 'dd-MM-yyyy hh-mm-ss', 'es');
      const format = 'H-mm-ss a';
      const formattedDate = formatDate(new Date(), format, 'es');
      FileSaver.saveAs(blob, excelFileName + formattedDate + ']' + EXCEL_EXTENSION);
    });
  }
}