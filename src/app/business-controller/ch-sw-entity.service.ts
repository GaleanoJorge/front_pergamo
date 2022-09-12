import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwEntity } from '../models/ch-sw-entity';
@Injectable({
  providedIn: 'root'
})
export class ChSwEntityService {
  public ch_sw_entity: ChSwEntity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwEntity[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_entity?pagination=false' : 'ch_sw_entity');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_entity = <ChSwEntity[]>servObj.data.ch_sw_entity;

        return Promise.resolve(this.ch_sw_entity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_entity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_entity');
    servObj.data = ch_sw_entity;
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

  Update(ch_sw_entity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_entity', ch_sw_entity.id);
    servObj.data = ch_sw_entity;
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
    let servObj = new ServiceObject('ch_sw_entity', id);
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
