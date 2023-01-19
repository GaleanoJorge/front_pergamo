import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HearingTl } from '../models/hearing-tl';

@Injectable({
  providedIn: 'root'
})
export class HearingTlService {
  public hearing_tl: HearingTl[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<HearingTl[]> {
    let servObj = new ServiceObject(params ? 'hearing_tl?pagination=false' : 'hearing_tl');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.hearing_tl = <HearingTl[]>servObj.data.hearing_tl;

        return Promise.resolve(this.hearing_tl);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(hearing_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('hearing_tl');
    servObj.data = hearing_tl;
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

  Update(hearing_tl: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('hearing_tl', hearing_tl.id);
    servObj.data = hearing_tl;
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
    let servObj = new ServiceObject('hearing_tl', id);
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
