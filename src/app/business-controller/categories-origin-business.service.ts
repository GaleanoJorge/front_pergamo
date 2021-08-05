import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class CategoriesOriginBusinessService {
  constructor(
    private webAPI: WebAPIService,
  ) {
  }

  GetAuxData() {
    let servObj = new ServiceObject('presupuestoAuxiliaryData');
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

  GetByOrigin(params = {}) {
    let servObj = new ServiceObject('getCategoriesByOrigin');
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

  setArray(data) {
    let servObj = new ServiceObject('setCategoriesOriginArray');
    servObj.data = data;
    return this.webAPI.PostAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj);
      })
      .catch(x => {
        throw x;
      });
  }

}

