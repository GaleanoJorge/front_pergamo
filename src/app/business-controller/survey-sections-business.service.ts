import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {SurveySections} from '../models/survey-sections';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class SurveySectionsBusinessService extends BaseBusinessService<SurveySections> {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'surveySections', 'surveySections', 'surveySection');
  }

  ChangeOrder(id, direction) {
    let servObj = new ServiceObject(`surveySections/${id}/move/${direction}`);
    return this.webAPI.PutAction(servObj)
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
