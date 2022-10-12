import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsSphere } from '../models/ch-ps-sphere';


@Injectable({
  providedIn: 'root'
})
export class ChPsSphereService {
  public ch_ps_sphere: ChPsSphere[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsSphere[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_sphere?pagination=false' : 'ch_ps_sphere');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_sphere = <ChPsSphere[]>servObj.data.ch_ps_sphere;

        return Promise.resolve(this.ch_ps_sphere);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_sphere: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sphere');
    servObj.data = ch_ps_sphere;
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

  Update(ch_ps_sphere: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_sphere', ch_ps_sphere.id);
    servObj.data = ch_ps_sphere;
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
    let servObj = new ServiceObject('ch_ps_sphere', id);
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
