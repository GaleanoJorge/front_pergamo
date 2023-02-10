import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
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

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.report_gloss = <ReportGloss[]>servObj.data.report_gloss;

        return Promise.resolve(this.report_gloss);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(report_gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_gloss');
    servObj.data = report_gloss;
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

  Update(report_gloss: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_gloss', report_gloss.id);
    servObj.data = report_gloss;
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
    let servObj = new ServiceObject('report_gloss', id);
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

  // Glossas
  GetExportGloss(id, params = {}): Promise<ReportGloss[]> {
    let servObj = new ServiceObject('report_gloss/export', id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_gloss = <ReportGloss[]>servObj.data.report_gloss;
        return Promise.resolve(this.report_gloss);
      })
      .catch(x => {
        throw x.message;
      });
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'report_gloss': worksheet}, SheetNames: ['Glosas'] };
    
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