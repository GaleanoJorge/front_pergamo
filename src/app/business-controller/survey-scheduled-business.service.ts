import {BaseBusinessService} from './base-business.service';
import {WebAPIService} from '../services/web-api.service';
import {Injectable} from '@angular/core';
import {SurveyScheduled} from '../models/survey-scheduled';
import {ServiceObject} from '../models/service-object';

@Injectable({
  providedIn: 'root',
})
export class SurveyScheduledBusinessService extends BaseBusinessService<SurveyScheduled> {
  constructor(
    private webAPI: WebAPIService,
  ) {
    super(webAPI, 'surveyInstance', 'surveyInstance', 'surveyInstance');
  }

  GetOne(id) {
    let servObj = new ServiceObject(this.entity, id);
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
}
