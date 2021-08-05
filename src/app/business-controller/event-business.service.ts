import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class EventBusinessService extends BaseBusinessService {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'event', 'events', 'event');
  }

  GetAuxData(params = {}) {
    let servObj = new ServiceObject('getEventAuxiliaryData');
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

  GetCategoryOrigin(params = {}) {
    let servObj = new ServiceObject('categoryOrigin');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.categories);
      })
      .catch(x => {
        throw x.message;
      });
  }

  CloseEvent(id) {
    let servObj = new ServiceObject('closeEvent', id);
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
}
