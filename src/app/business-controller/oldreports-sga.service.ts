import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';

@Injectable({
  providedIn: 'root',
})
export class OldreportsSgaService {
  constructor(
    private webAPI: WebAPIService) {
  }

  GetFilters(entity, params = {}) {
    let servObj = new ServiceObject('oldsga-reports/' + entity);

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

  GetCursosRealizados() {
    let servObj = new ServiceObject('oldsga-reports/filtersRunCourses');

    return this.webAPI.GetAction(servObj)
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

    let servObj = new ServiceObject('oldsga-reports/' + entity);

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
