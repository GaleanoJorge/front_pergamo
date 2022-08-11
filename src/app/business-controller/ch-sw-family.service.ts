import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwFamily } from '../models/ch-sw-family';


@Injectable({
  providedIn: 'root'
})
export class ChSwFamilyService {
  public ch_sw_family: ChSwFamily[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwFamily[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_family?pagination=false' : 'ch_sw_family');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_family = <ChSwFamily[]>servObj.data.ch_sw_family;

        return Promise.resolve(this.ch_sw_family);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_family: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_family');
    servObj.data = ch_sw_family;
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

  Update(ch_sw_family: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_family', ch_sw_family.id);
    servObj.data = ch_sw_family;
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
    let servObj = new ServiceObject('ch_sw_family', id);
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
