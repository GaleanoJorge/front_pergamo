import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsAnger } from '../models/ch-ps-anger';

@Injectable({
  providedIn: 'root'
})
export class ChPsAngerService {
  public ch_ps_anger: ChPsAnger[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsAnger[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_anger?pagination=false' : 'ch_ps_anger');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_anger = <ChPsAnger[]>servObj.data.ch_ps_anger;

        return Promise.resolve(this.ch_ps_anger);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_anger: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_anger');
    servObj.data = ch_ps_anger;
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

  Update(ch_ps_anger: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_anger', ch_ps_anger.id);
    servObj.data = ch_ps_anger;
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
    let servObj = new ServiceObject('ch_ps_anger', id);
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
