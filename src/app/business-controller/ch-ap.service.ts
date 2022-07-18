import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChAp } from '../models/ch-ap';

@Injectable({
  providedIn: 'root'
})
export class ChApService {
  public ch_ap: ChAp[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChAp[]> {
    let servObj = new ServiceObject(params ? 'ch_ap?pagination=false' : 'ch_ap');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ap = <ChAp[]>servObj.data.ch_ap;

        return Promise.resolve(this.ch_ap);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ap: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ap');
    servObj.data = ch_ap;
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

  Update(ch_ap: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ap', ch_ap.id);
    servObj.data = ch_ap;
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
    let servObj = new ServiceObject('ch_ap', id);
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
