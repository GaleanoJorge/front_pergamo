import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { NumberMonthlySessionsTl } from '../models/number-monthly-sessions-tl';

@Injectable({
  providedIn: 'root'
})
export class NumberMonthlySessionsTlService {
  public number_monthly_sessions_tl: NumberMonthlySessionsTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<NumberMonthlySessionsTl[]> {
    let servObj = new ServiceObject(params ? 'number_monthly_sessions_tl?pagination=false' : 'number_monthly_sessions_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.number_monthly_sessions_tl = <NumberMonthlySessionsTl[]>servObj.data.number_monthly_sessions_tl;

        return Promise.resolve(this.number_monthly_sessions_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }
  

  Save(number_monthly_sessions_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('number_monthly_sessions_tl');
    servObj.data = number_monthly_sessions_tl;
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

  Update(number_monthly_sessions_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('number_monthly_sessions_tl', number_monthly_sessions_tl.id);
    servObj.data = number_monthly_sessions_tl;
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
    let servObj = new ServiceObject('number_monthly_sessions_tl', id);
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
}
