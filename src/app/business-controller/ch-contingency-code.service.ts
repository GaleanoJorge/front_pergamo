import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChContingencyCode } from '../models/ch-contingency-code';

@Injectable({
  providedIn: 'root'
})
export class ChContingencyCodeService {
  public ch_contingency_code: ChContingencyCode[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChContingencyCode[]> {
    let servObj = new ServiceObject(params ? 'ch_contingency_code?pagination=false' : 'ch_contingency_code');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_contingency_code = <ChContingencyCode[]>servObj.data.ch_contingency_code;

        return Promise.resolve(this.ch_contingency_code);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_contingency_code: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_contingency_code');
    servObj.data = ch_contingency_code;
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

  Update(ch_contingency_code: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_contingency_code', ch_contingency_code.id);
    servObj.data = ch_contingency_code;
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
    let servObj = new ServiceObject('ch_contingency_code', id);
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
