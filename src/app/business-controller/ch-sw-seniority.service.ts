import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwSeniority } from '../models/ch-sw-seniority';

@Injectable({
  providedIn: 'root'
})
export class ChSwSeniorityService {
  public ch_sw_seniority: ChSwSeniority[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwSeniority[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_seniority?pagination=false' : 'ch_sw_seniority');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_seniority = <ChSwSeniority[]>servObj.data.ch_sw_seniority;

        return Promise.resolve(this.ch_sw_seniority);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_seniority: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_seniority');
    servObj.data = ch_sw_seniority;
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

  Update(ch_sw_seniority: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_seniority', ch_sw_seniority.id);
    servObj.data = ch_sw_seniority;
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
    let servObj = new ServiceObject('ch_sw_seniority', id);
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
