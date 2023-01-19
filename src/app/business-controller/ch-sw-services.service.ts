import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChSwServices } from '../models/ch-sw-services';

@Injectable({
  providedIn: 'root'
})
export class ChSwServicesService {
  public ch_sw_services: ChSwServices[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<ChSwServices[]> {
    let servObj = new ServiceObject(params ? 'ch_sw_services?pagination=false' : 'ch_sw_services');

    return this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.ch_sw_services = <ChSwServices[]>servObj.data.ch_sw_services;

        return Promise.resolve(this.ch_sw_services);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(ch_sw_services: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_services');
    servObj.data = ch_sw_services;
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

  Update(ch_sw_services: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('ch_sw_services', ch_sw_services.id);
    servObj.data = ch_sw_services;
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
    let servObj = new ServiceObject('ch_sw_services', id);
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
