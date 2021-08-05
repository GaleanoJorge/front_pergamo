import { Injectable } from '@angular/core';
import { WebAPIService } from '../services/web-api.service';
import { ServiceObject } from '../models/service-object';

@Injectable({
  providedIn: 'root'
})
export class ReportsSgaService {

  constructor(private webAPI: WebAPIService) { }
  GetFilters(entity, params = {}) {
    let servObj = new ServiceObject('report-sga/' + entity);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GetCustomFilters(entity, params = {}) {
    let servObj = new ServiceObject('report-sga/' + entity);

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data);
      })
      .catch(x => {
        throw x.message;
      });
  }

  GenerateReport(entity, params = {}): any {
    // Clean params
    const keys = Object.keys(params);

    const newParams = {};

    keys.map(key => {
      if (params[key]) {
        newParams[key] = params[key];
      }
    });

    let servObj = new ServiceObject('report-excel/' + entity);

    return this.webAPI.GetAction(servObj, newParams)
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

  GenerateReportPDF(entity, params = {}): any {
    // Clean params
    const keys = Object.keys(params);

    const newParams = {};

    keys.map(key => {
      if (params[key]) {
        newParams[key] = params[key];
      }
    });

    let servObj = new ServiceObject('report-pdf/' + entity);

    return this.webAPI.GetAction(servObj, newParams)
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

}
