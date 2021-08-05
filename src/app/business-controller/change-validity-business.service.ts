import {ServiceObject} from '../models/service-object';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeValidityBusinessService {

  constructor(private webAPI: WebAPIService) {
  }

  GetAuxiliaryData(params = {}) {
    let servObj = new ServiceObject('getConceptAuxiliaryData');

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

  GetConcepts(params = {}) {
    let servObj = new ServiceObject('copyValidity');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.concepts);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(data, new_validity_id = {}) {
    let servObj = new ServiceObject('storeNewValidityConcepts?new_validity_id=' + new_validity_id);
    servObj.data = {data};
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

  ConciliarTiquetes(data, validity_id) {

    let servObj = new ServiceObject('chargeDataTickets?validity_id=' + validity_id);
    servObj.data = data;
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

  ExportarTiquetes(validity_id) {
    let servObj = new ServiceObject('exportExcelReportTickets?validity_id=' + validity_id);
    return this.webAPI.GetAction(servObj)
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
