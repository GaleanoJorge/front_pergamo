import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { data } from 'jquery';
import * as XLSX from 'xlsx';
import { ReportRips } from '../models/report-rips';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportRipsService {
  public report_rips: ReportRips[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportRips[]> {
    let servObj = new ServiceObject(params ? 'report_rips?pagination=false' : 'report_rips');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.report_rips = <ReportRips[]>servObj.data.report_rips;

        return Promise.resolve(this.report_rips);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(report_rips: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_rips');
    servObj.data = report_rips;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Update(report_rips: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_rips', report_rips.id);
    servObj.data = report_rips;
    return this.webAPI.PutAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Delete(id): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_rips', id);
    return this.webAPI.DeleteAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetExportRips(id, params = {}): Promise<ReportRips[]> {
    let servObj = new ServiceObject('report_rips/export', id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_rips = <ReportRips[]>servObj.data.report_rips;
        return Promise.resolve(this.report_rips);
      })
      .catch(x => {
        throw x.message;
      });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    // const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[1]);
    // console.log('worksheet2', worksheet2);
    // const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[2]);
    // console.log('worksheet3', worksheet3);
    // const worksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[3]);
    // console.log('worksheet4', worksheet4);
    // const worksheet5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[4]);
    // console.log('worksheet5', worksheet5);
    // const worksheet6: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[5]);
    // console.log('worksheet6', worksheet6);
    // const worksheet7: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[6]);
    // console.log('worksheet7', worksheet7);
    // const worksheet8: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[7]);
    // console.log('worksheet8', worksheet8);

    // const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'US');
    // XLSX.utils.book_append_sheet(workbook, worksheet2, 'AC');
    // XLSX.utils.book_append_sheet(workbook, worksheet3, 'AP');
    // XLSX.utils.book_append_sheet(workbook, worksheet4, 'AT');
    // XLSX.utils.book_append_sheet(workbook, worksheet5, 'AM');
    // XLSX.utils.book_append_sheet(workbook, worksheet6, 'AH');
    // XLSX.utils.book_append_sheet(workbook, worksheet7, 'AF');
    // XLSX.utils.book_append_sheet(workbook, worksheet8, 'CT');
    
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet}, SheetNames: ['US','AC','AP','AT','AM','AH','AF','CT'] };
    
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exportado_el_' + "[" +new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear() + "]" + EXCEL_EXTENSION);
  }
}