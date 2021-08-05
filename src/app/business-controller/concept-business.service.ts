import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class ConceptBusinessService extends BaseBusinessService {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'concept', 'concepts', 'concept');
  }

  GetAuxData(params = {}) {
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
}
