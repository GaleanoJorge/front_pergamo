import { ServiceObject } from '../models/service-object';
import { WebAPIService } from '../services/web-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseLocationCapacity } from '../models/base-location-capacity';

@Injectable({
  providedIn: 'root'
})
export class BaseLocationCapacityService {
  public base_location_capacity: BaseLocationCapacity[] = [];

  constructor(private webAPI: WebAPIService) {
  }

  GetCollection(params = {}): Promise<BaseLocationCapacity[]> {
    let servObj = new ServiceObject(params ? 'base_location_capacity?pagination=false' : 'base_location_capacity');

    return this.webAPI.GetAction(servObj, params)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        this.base_location_capacity = <BaseLocationCapacity[]>servObj.data.base_location_capacity;

        return Promise.resolve(this.base_location_capacity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  async GetByAssistance(assistance_id) {
    let servObj = new ServiceObject(`base_location_capacity/AssistanceByLocation/${assistance_id}`);
    return await this.webAPI.GetAction(servObj)
      .then(x => {
        servObj = <ServiceObject>x;
        if (!servObj.status)
          throw new Error(servObj.message);

        return Promise.resolve(servObj.data.base_location_capacity);
      })
      .catch(x => {
        throw x.message;
      });
  }

  Save(base_location_capacity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('base_location_capacity');
    servObj.data = base_location_capacity;
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

  Update(base_location_capacity: any): Promise<ServiceObject> {
    let servObj = new ServiceObject('base_location_capacity', base_location_capacity.id);
    servObj.data = base_location_capacity;
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
    let servObj = new ServiceObject('base_location_capacity', id);
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
