import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChSwFamilyDynamics } from '../models/ch-sw-family-dynamics';

@Injectable({
  providedIn: 'root'
})
export class ChSwFamilyDynamicsService {
  public ch_sw_family_dynamics: ChSwFamilyDynamics[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwFamilyDynamics[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_family_dynamics?pagination=false' : 'ch_sw_family_dynamics');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_family_dynamics = <ChSwFamilyDynamics[]>servObj.data.ch_sw_family_dynamics;

        return Promise.resolve(this.ch_sw_family_dynamics);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_family_dynamics: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_family_dynamics');
    servObj.data = ch_sw_family_dynamics;
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

  Update(ch_sw_family_dynamics: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_family_dynamics', ch_sw_family_dynamics.id);
    servObj.data = ch_sw_family_dynamics;
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
    let servObj = new ServiceObject('ch_sw_family_dynamics', id);
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
