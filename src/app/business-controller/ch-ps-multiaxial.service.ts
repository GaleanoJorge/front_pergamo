import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsMultiaxial } from '../models/ch-ps-multiaxial';


@Injectable({
  providedIn: 'root'
})
export class ChPsMultiaxialService {
  public ch_ps_multiaxial: ChPsMultiaxial[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsMultiaxial[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_multiaxial?pagination=false' : 'ch_ps_multiaxial');
    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_multiaxial = <ChPsMultiaxial[]>servObj.data.ch_ps_multiaxial;

        return Promise.resolve(this.ch_ps_multiaxial);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_multiaxial: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_multiaxial');
    servObj.data = ch_ps_multiaxial;
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

  Update(ch_ps_multiaxial: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_multiaxial', ch_ps_multiaxial.id);
    servObj.data = ch_ps_multiaxial;
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
    let servObj = new ServiceObject('ch_ps_multiaxial', id);
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
