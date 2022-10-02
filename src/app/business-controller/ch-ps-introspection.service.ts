import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { ChPsIntrospection } from '../models/ch-ps-introspection';

@Injectable({
  providedIn: 'root'
})
export class ChPsIntrospectionService {
  public ch_ps_introspection: ChPsIntrospection[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChPsIntrospection[]> {
    let servObj = new ServiceObject(params ? 'ch_ps_introspection?pagination=false' : 'ch_ps_introspection');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_ps_introspection = <ChPsIntrospection[]>servObj.data.ch_ps_introspection;

        return Promise.resolve(this.ch_ps_introspection);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_ps_introspection: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_introspection');
    servObj.data = ch_ps_introspection;
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

  Update(ch_ps_introspection: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_ps_introspection', ch_ps_introspection.id);
    servObj.data = ch_ps_introspection;
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
    let servObj = new ServiceObject('ch_ps_introspection', id);
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
