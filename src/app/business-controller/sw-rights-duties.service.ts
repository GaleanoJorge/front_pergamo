import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { SwRightsDuties } from '../models/sw-rights-duties';

@Injectable({
  providedIn: 'root'
})
export class SwRightsDutiesService {
  public sw_rights_duties: SwRightsDuties[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<SwRightsDuties[]> {
    let servObj = new ServiceObject(params ? 'sw_rights_duties?pagination=false' : 'sw_rights_duties');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.sw_rights_duties = <SwRightsDuties[]>servObj.data.sw_rights_duties;

        return Promise.resolve(this.sw_rights_duties);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(sw_rights_duties: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('sw_rights_duties');
    servObj.data = sw_rights_duties;
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

  Update(sw_rights_duties: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('sw_rights_duties', sw_rights_duties.id);
    servObj.data = sw_rights_duties;
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
    let servObj = new ServiceObject('sw_rights_duties', id);
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
