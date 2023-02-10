import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ReportPharmacy } from '../models/report-pharmacy';
import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportPharmacyService {
  public report_pharmacy: ReportPharmacy[] = [];

  constructor(private webAPI: WebAPIService) { }

  GetCollection(params = {}): Promise<ReportPharmacy[]> {
    let servObj = new ServiceObject(params ? 'report_pharmacy?pagination=false' : 'report_pharmacy');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.report_pharmacy = <ReportPharmacy[]>servObj.data.report_pharmacy;

        return Promise.resolve(this.report_pharmacy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(report_pharmacy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_pharmacy');
    servObj.data = report_pharmacy;
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

  Update(report_pharmacy: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('report_pharmacy', report_pharmacy.id);
    servObj.data = report_pharmacy;
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
    let servObj = new ServiceObject('report_pharmacy', id);
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

  GetExportPharmacy(id, params = {}): Promise<ReportPharmacy[]> {
    let servObj = new ServiceObject('report_pharmacy/export', id);
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);
        this.report_pharmacy = <ReportPharmacy[]>servObj.data.report_pharmacy;
        return Promise.resolve(this.report_pharmacy);
      })
      .catch(x => {
        throw x.message;
      });
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'report_pharmacy': worksheet}, SheetNames: ['Reporte Farmacia'] };
    
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