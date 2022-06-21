import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAssCough } from '../models/ch-ass-cough';

@Injectable({
  providedIn: 'root'
})
export class ChAssCoughService {
  public ch_ass_cough: ChAssCough[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAssCough[]> {
    let servObj = new ServiceObject(params ? 'ch_ass_cough?pagination=false' : 'ch_ass_cough');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ass_cough = <ChAssCough[]>servObj.data.ch_ass_cough;

        return Promise.resolve(this.ch_ass_cough);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ass_cough: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_cough');
    servObj.data = ch_ass_cough;
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

  Update(ch_ass_cough: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ass_cough', ch_ass_cough.id);
    servObj.data = ch_ass_cough;
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
    let servObj = new ServiceObject('ch_ass_cough', id);
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
